import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2025-02-28.acacia',
});

export async function POST(request: Request) {
  try {
    const { customerId } = await request.json();
    if (!customerId) {
      return NextResponse.json({ error: 'Missing customerId parameter' }, { status: 400 });
    }

    const origin = request.headers.get('origin') || 'http://localhost:3000';
    const portalSession = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: `${origin}/dashboard`,
    });

    return NextResponse.json({ url: portalSession.url });
  } catch (error: any) {
    console.error('Portal Error:', error.message);
    return NextResponse.json({ error: 'Internal Server Error during portal initialization' }, { status: 500 });
  }
}
