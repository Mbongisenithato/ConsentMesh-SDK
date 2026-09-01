import { NextResponse } from "next/server";
import Stripe from "stripe";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, UpdateCommand } from "@aws-sdk/lib-dynamodb";

function getStripe() {
  const secretKey = process.env.STRIPE_SECRET_KEY || 'sk_test_stub';
  return new Stripe(secretKey, {
    apiVersion: '2026-08-26.dahlia',
  });
}

const client = new DynamoDBClient({
  region: process.env.AWS_REGION || "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});
const docClient = DynamoDBDocumentClient.from(client);

const WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(request: Request) {
  try {
    const body = await request.text();
    const signature = request.headers.get("stripe-signature");

    if (!signature) {
      return NextResponse.json({ error: "Missing stripe-signature header" }, { status: 400 });
    }

    let event: getStripe().Event;
    try {
      event = getStripe().webhooks.constructEvent(body, signature, WEBHOOK_SECRET);
    } catch (err: any) {
      console.error(`Webhook signature verification failed: ${err.message}`);
      return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as getStripe().Checkout.Session;
      const userId = session.metadata?.userId || "test_user_id";
      const tier = session.metadata?.tier || "starter";
      const subscriptionId = session.subscription as string;

      // Update DynamoDB user profile with subscription tier
      await docClient.send(
        new UpdateCommand({
          TableName: "ConsentMeshUsers",
          Key: { userId },
          UpdateExpression: "SET subscriptionTier = :tier, stripeSubscriptionId = :subId, billingCycle = :cycle, updatedAt = :updated",
          ExpressionAttributeValues: {
            ":tier": tier,
            ":subId": subscriptionId || "",
            ":cycle": "monthly",
            ":updated": new Date().toISOString(),
          },
        })
      );

      console.log(`Successfully updated user ${userId} to tier: ${tier}`);
    }

    return NextResponse.json({ received: true });
  } catch (err: any) {
    console.error("Webhook error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}


