"use client";

import { useState } from "react";

const TIERS = [
  { id: "starter", name: "Starter", price: 39, description: "Core consent SDK features for individual projects." },
  { id: "growth", name: "Growth", price: 199, description: "Advanced telemetry and multi-domain management." },
  { id: "enterprise", name: "Enterprise", price: 499, description: "Custom limits, priority routing, and dedicated support." },
];

export default function PricingPage() {
  const [loadingTier, setLoadingTier] = useState<string | null>(null);

  const handleUpgrade = async (tierId: string) => {
    setLoadingTier(tierId);
    try {
      const res = await fetch("/api/v1/billing/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: "user_123", customerEmail: "user@example.com", tier: tierId }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert(data.error || "Failed to create checkout session");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setLoadingTier(null);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-12 bg-gray-50">
      <div className="max-w-5xl w-full text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-4">Choose Your Plan</h1>
        <p className="text-lg text-gray-600">Select the tier aligned with your application's scaling requirements.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl w-full">
        {TIERS.map((tier) => (
          <div key={tier.id} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200 flex flex-col justify-between text-left">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-2 capitalize">{tier.name}</h2>
              <p className="text-gray-500 text-sm mb-6">{tier.description}</p>
              <p className="text-4xl font-extrabold text-gray-900 mb-6">${tier.price} <span className="text-sm font-normal text-gray-500">/mo</span></p>
            </div>
            <button
              onClick={() => handleUpgrade(tier.id)}
              disabled={loadingTier !== null}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 px-4 rounded-xl transition-colors shadow-sm disabled:opacity-50"
            >
              {loadingTier === tier.id ? "Redirecting..." : `Upgrade to ${tier.name}`}
            </button>
          </div>
        ))}
      </div>
    </main>
  );
}
