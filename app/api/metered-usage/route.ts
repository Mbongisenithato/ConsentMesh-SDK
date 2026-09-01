import { NextResponse } from 'next/server';
import Stripe from 'stripe';

function getStripe() {
  const secretKey = process.env.STRIPE_SECRET_KEY || 'sk_test_stub';
  return new Stripe(secretKey, {
    apiVersion: '2026-08-26.dahlia',
  });
}

export async function POST(request: Request) {
  try {
    const { subscriptionItemId, quantity } = await request.json();
    if (!subscriptionItemId || quantity === undefined) {
      return NextResponse.json({ error: 'Missing subscriptionItemId or quantity' }, { status: 400 });
    }

    const usageRecord = await (getStripe().subscriptionItems as any).createUsageRecord(
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

