import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, UpdateCommand } from "@aws-sdk/lib-dynamodb";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-02-28.acacia" as any,
});

const client = new DynamoDBClient({ region: process.env.AWS_REGION || "us-east-1" });
const docClient = DynamoDBDocumentClient.from(client);
const tableName = process.env.DYNAMODB_USER_TABLE || "ConsentMeshUsers";

export async function POST(request: Request) {
  const body = await request.text();
  const headerList = await headers();
  const signature = headerList.get("stripe-signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    return NextResponse.json(
      { error: `Webhook Error: ${err.message}` },
      { status: 400 }
    );
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const userId = session.metadata?.userId || session.customer_email;

    if (userId) {
      try {
        await docClient.send(
          new UpdateCommand({
            TableName: tableName,
            Key: { userId },
            UpdateExpression:
              "SET subscriptionTier = :tier, updatedAt = :updatedAt",
            ExpressionAttributeValues: {
              ":tier": "starter",
              ":updatedAt": new Date().toISOString(),
            },
          })
        );
      } catch (dbError) {
        console.error("Failed to update DynamoDB record:", dbError);
        return NextResponse.json(
          { error: "Database update error" },
          { status: 500 }
        );
      }
    }
  }

  return NextResponse.json({ received: true });
}
