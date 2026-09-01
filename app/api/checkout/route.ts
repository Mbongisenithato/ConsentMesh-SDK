import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2025-02-28.acacia',
});

export async function POST(request: Request) {
  try {
    const { priceId, customerEmail } = await request.json();

    if (!priceId) {
      return NextResponse.json({ error: 'Missing priceId parameter' }, { status: 400 });
    }

    const origin = request.headers.get('origin') || 'http://localhost:3000';

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      mode: 'subscription',
      customer_email: customerEmail,
      success_url: `${origin}/dashboard?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/pricing?canceled=true`,
      metadata: {
        environment: process.env.NODE_ENV || 'production',
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error('Stripe Checkout Error:', error.message);
    return NextResponse.json({ error: 'Internal Server Error during checkout initialization' }, { status: 500 });
  }
}
