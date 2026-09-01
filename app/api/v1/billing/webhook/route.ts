import { NextResponse } from 'next/server';
import Stripe from 'stripe';

function getStripe() {
  return new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_stub', {
    apiVersion: '2026-08-26.dahlia',
  });
}

export async function POST(request: Request) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature');
  const WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET || 'whsec_stub';

  if (!signature) {
    return NextResponse.json({ error: "Missing stripe-signature header" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = getStripe().webhooks.constructEvent(body, signature, WEBHOOK_SECRET);
  } catch (err: any) {
    console.error(`Webhook signature verification failed:`, err.message);
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const userId = session.metadata?.userId || "test_user_id";
    const tier = session.metadata?.tier || "starter";
    const subscriptionId = session.subscription as string;
    console.log(`Provisioned subscription ${subscriptionId} for user ${userId} on tier ${tier}`);
  }

  return NextResponse.json({ received: true });
}
