import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2026-08-26.dahlia",
});

const TIER_PRICES: Record<string, { amount: number; name: string }> = {
  Starter: { amount: 3900, name: "Starter Tier" },
  Professional: { amount: 19900, name: "Professional Tier" },
  Enterprise: { amount: 49900, name: "Enterprise Tier" },
  "Scale Tier": { amount: 149900, name: "Scale Tier" },
  "Sovereign Enterprise": { amount: 399900, name: "Sovereign Enterprise Tier" },
  "Critical Infrastructure & Gov": { amount: 1000000, name: "Critical Infrastructure & Gov Tier" },
};

export async function POST(req: Request) {
  try {
    const { tier } = await req.json();
    const tierInfo = TIER_PRICES[tier] || TIER_PRICES["Enterprise"];

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `ConsentMesh Pro - ${tierInfo.name}`,
            },
            unit_amount: tierInfo.amount,
            recurring: {
              interval: "month",
            },
          },
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: `${req.headers.get("origin")}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get("origin")}/?canceled=true`,
      metadata: {
        tier: tier || "Enterprise",
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error("Checkout Initialization Error:", error);
    return NextResponse.json({ error: error.message || "Failed to initialize checkout session." }, { status: 500 });
  }
}
