import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { db } from "@/lib/dynamodb";
import { PutCommand } from "@aws-sdk/lib-dynamodb";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-08-26.dahlia",
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: Request) {
  const body = await req.text();
  const signature = (await headers()).get("stripe-signature")!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err: any) {
    return NextResponse.json({ error: Webhook Error:  }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    const customerId = session.customer as string;
    const subscriptionId = session.subscription as string;
    const clientReferenceId = session.client_reference_id;
    const customerEmail = session.customer_email || session.customer_details?.email;

    try {
      await db.send(
        new PutCommand({
          TableName: process.env.DYNAMODB_TABLE_NAME || "ConsentMeshSubscriptions",
          Item: {
            userId: clientReferenceId || customerId,
            customerId: customerId,
            subscriptionId: subscriptionId,
            email: customerEmail,
            status: "active",
            tier: session.metadata?.tier || "Starter",
            updatedAt: new Date().toISOString(),
          },
        })
      );
    } catch (dbError) {
      console.error("Failed to write subscription to DynamoDB:", dbError);
      return NextResponse.json({ error: "Database write failed" }, { status: 500 });
    }
  }

  return NextResponse.json({ received: true }, { status: 200 });
}
