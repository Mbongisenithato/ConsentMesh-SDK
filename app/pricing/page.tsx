"use client";

import { useState } from "react";

export default function PricingPage() {
  const [loading, setLoading] = useState(false);

  const handleUpgrade = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/v1/billing/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: "user_123", customerEmail: "user@example.com" }),
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
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-50">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-md border border-gray-100 text-center">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-4">Choose Your Plan</h1>
        <p className="text-gray-600 mb-6">Unlock full access to ConsentMesh Pro features.</p>
        <div className="border border-indigo-100 rounded-lg p-6 bg-indigo-50/50 mb-6">
          <h2 className="text-xl font-semibold text-indigo-900 mb-2">Starter Tier</h2>
          <p className="text-2xl font-bold text-indigo-600 mb-4">$15 <span className="text-sm font-normal text-gray-500">/mo</span></p>
          <button
            onClick={handleUpgrade}
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors shadow-sm disabled:opacity-50"
          >
            {loading ? "Redirecting..." : "Upgrade to Starter"}
          </button>
        </div>
      </div>
    </main>
  );
}
