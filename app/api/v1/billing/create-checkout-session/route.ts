import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-02-28.acacia" as any,
});

const TIER_PRICES: Record<string, { name: string; amount: number }> = {
  starter: { name: "ConsentMesh Pro Starter Tier", amount: 3900 },
  growth: { name: "ConsentMesh Pro Growth Tier", amount: 19900 },
  enterprise: { name: "ConsentMesh Pro Enterprise Tier", amount: 49900 },
};

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const { userId = "test_user_id", customerEmail = "test@example.com", tier = "starter" } = body;

    const selectedTier = TIER_PRICES[tier] || TIER_PRICES.starter;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: selectedTier.name,
            },
            unit_amount: selectedTier.amount,
            recurring: {
              interval: "month",
            },
          },
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/dashboard?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/pricing?canceled=true`,
      metadata: {
        userId,
        tier,
      },
      customer_email: customerEmail,
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error("Error creating checkout session:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
