import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2026-08-26.dahlia',
});

export async function POST(request: Request) {
  try {
    const { companyName, email, tierId, amount } = await request.json();

    if (!companyName || !email || !tierId || !amount) {
      return NextResponse.json({ error: 'Missing required corporate billing fields' }, { status: 400 });
    }

    // 1. Create or retrieve corporate customer in Stripe
    const customer = await stripe.customers.create({
      name: companyName,
      email: email,
      metadata: { tier: tierId, segment: 'Enterprise_B2B' },
    });

    // 2. Create invoice item for the selected tier subscription period
    const invoiceItem = await stripe.invoiceItems.create({
      customer: customer.id,
      amount: amount * 100, // Amount in cents
      currency: 'usd',
      description: `ConsentMesh Pro Enterprise Subscription - ${tierId.toUpperCase()} Tier (Net-30 Terms)`,
    });

    // 3. Create draft invoice with send_invoice collection method
    const invoice = await stripe.invoices.create({
      customer: customer.id,
      collection_method: 'send_invoice',
      days_until_due: 30,
      auto_advance: true,
      metadata: { tier: tierId },
    });

    // 4. Finalize and send the official B2B invoice via email
    const finalizedInvoice = await stripe.invoices.finalizeInvoice(invoice.id);
    const sentInvoice = await stripe.invoices.sendInvoice(finalizedInvoice.id);

    return NextResponse.json({ 
      success: true, 
      invoiceId: sentInvoice.id, 
      hostedInvoiceUrl: sentInvoice.hosted_invoice_url,
      customer: customer.id 
    });
  } catch (error: any) {
    console.error('Enterprise Invoicing Error:', error.message);
    return NextResponse.json({ error: 'Internal Server Error generating enterprise invoice' }, { status: 500 });
  }
}

