import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { DynamoDBDocumentClient, UpdateCommand, GetCommand } from '@aws-sdk/lib-dynamodb';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2024-06-20' });
const docClient = DynamoDBDocumentClient.from(new DynamoDBClient({ region: process.env.AWS_REGION }));

const PRICE_TO_TIER_MAP: Record<string, 'starter' | 'growth' | 'enterprise'> = {
  [process.env.STRIPE_STARTER_PRICE_ID!]: 'starter',
  [process.env.STRIPE_GROWTH_PRICE_ID!]: 'growth',
  [process.env.STRIPE_ENTERPRISE_PRICE_ID!]: 'enterprise',
};

export async function POST(req: Request) {
  const payload = await req.text();
  const signature = req.headers.get('stripe-signature')!;
  
  let event;
  try {
    event = stripe.webhooks.constructEvent(payload, signature, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err: any) {
    return NextResponse.json({ error: \Webhook Error: \\ }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const userId = session.client_reference_id;
    
    const subscription = await stripe.subscriptions.retrieve(session.subscription as string);
    const priceId = subscription.items.data[0].price.id;
    const purchasedTier = PRICE_TO_TIER_MAP[priceId] || 'starter';

    if (userId) {
      await docClient.send(new UpdateCommand({
        TableName: process.env.DYNAMODB_USERS_TABLE,
        Key: { userId },
        UpdateExpression: 'set tier = :t, stripeSubscriptionId = :s, billingCycle = :bc',
        ExpressionAttributeValues: {
          ':t': purchasedTier,
          ':s': session.subscription,
          ':bc': subscription.items.data[0].price.recurring?.interval === 'year' ? 'annual' : 'monthly',
        }
      }));
    }
  }

  if (event.type === 'customer.subscription.deleted') {
    const subscription = event.data.object as Stripe.Subscription;
    const customerId = subscription.customer as string;

    // Find user by stripeSubscriptionId and revert to free tier
    await docClient.send(new UpdateCommand({
      TableName: process.env.DYNAMODB_USERS_TABLE,
      Key: { stripeSubscriptionId: subscription.id }, // Note: Adjust key lookup if using GSI for stripeSubscriptionId
      UpdateExpression: 'set tier = :t, billingCycle = :bc, stripeSubscriptionId = :s',
      ExpressionAttributeValues: {
        ':t': 'free',
        ':bc': 'none',
        ':s': null,
      }
    }));
  }

  return NextResponse.json({ received: true });
}
