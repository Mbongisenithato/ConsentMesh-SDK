import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-08-26.dahlia",
});

export async function POST(req: Request) {
  try {
    const { priceId, tier, userId } = await req.json();

    if (!priceId) {
      return NextResponse.json({ error: "Missing priceId for checkout initialization" }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: ${req.headers.get("origin")}/dashboard?session_id={CHECKOUT_SESSION_ID},
      cancel_url: ${req.headers.get("origin")}/?canceled=true,
      client_reference_id: userId || "guest-enterprise",
      metadata: {
        tier: tier || "Enterprise",
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error("Stripe Checkout Initialization Error:", error);
    return NextResponse.json({ error: error.message || "Internal Server Error during checkout initialization" }, { status: 500 });
  }
}
