import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2025-02-28.acacia',
});

export async function POST(request: Request) {
  try {
    const { subscriptionItemId, quantity } = await request.json();
    if (!subscriptionItemId || quantity === undefined) {
      return NextResponse.json({ error: 'Missing subscriptionItemId or quantity' }, { status: 400 });
    }

    const usageRecord = await stripe.subscriptionItems.createUsageRecord(
      subscriptionItemId,
      {
        quantity,
        timestamp: Math.floor(Date.now() / 1000),
        action: 'increment',
      }
    );

    return NextResponse.json({ success: true, usageRecord });
  } catch (error: any) {
    console.error('Metered billing error:', error.message);
    return NextResponse.json({ error: 'Internal Server Error reporting usage' }, { status: 500 });
  }
}
