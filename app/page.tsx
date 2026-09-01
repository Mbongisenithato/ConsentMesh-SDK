"use client";

import { useState } from "react";

export default function Home() {
  const [loadingTier, setLoadingTier] = useState<string | null>(null);

  const handleUpgrade = async (tierName: string) => {
    try {
      setLoadingTier(tierName);
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tier: tierName }),
      });
      
      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert(data.error || "Failed to initialize checkout");
        setLoadingTier(null);
      }
    } catch (err) {
      console.error("Checkout error:", err);
      alert("An unexpected error occurred during checkout initialization.");
      setLoadingTier(null);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-4">ConsentMesh Pro Pricing</h1>
        <p className="text-center text-slate-400 mb-12">Select your compliance and governance tier.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Starter Tier */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-semibold mb-2">Starter</h2>
              <p className="text-slate-400 text-sm mb-6">Essential consent synchronization and privacy orchestration for growing apps.</p>
              <div className="text-3xl font-bold mb-6">$39<span className="text-sm font-normal text-slate-400">/month</span></div>
              <ul className="space-y-3 text-sm text-slate-300 mb-8">
                <li>✓ 10,000 monthly active consents</li>
                <li>✓ Up to 3 active domains</li>
                <li>✓ Standard telemetry & audit logs</li>
                <li>✓ Free 1-year audit log retention</li>
              </ul>
            </div>
            <button
              onClick={() => handleUpgrade("Starter")}
              disabled={loadingTier === "Starter"}
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-medium py-3 rounded-xl transition cursor-pointer"
            >
              {loadingTier === "Starter" ? "Initializing..." : "Upgrade to Starter"}
            </button>
          </div>

          {/* Professional Tier */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-semibold mb-2">Professional</h2>
              <p className="text-slate-400 text-sm mb-6">Advanced multi-domain governance and automated compliance pipelines for scale.</p>
              <div className="text-3xl font-bold mb-6">$199<span className="text-sm font-normal text-slate-400">/month</span></div>
              <ul className="space-y-3 text-sm text-slate-300 mb-8">
                <li>✓ 100,000 monthly active consents</li>
                <li>✓ Unlimited active domains</li>
                <li>✓ Real-time DynamoDB telemetry</li>
                <li>✓ White-glove data migration included</li>
              </ul>
            </div>
            <button
              onClick={() => handleUpgrade("Professional")}
              disabled={loadingTier === "Professional"}
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-medium py-3 rounded-xl transition cursor-pointer"
            >
              {loadingTier === "Professional" ? "Initializing..." : "Upgrade to Professional"}
            </button>
          </div>

          {/* Enterprise Tier */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
            <div>
              <h2 className="text-2xl font-semibold mb-2">Enterprise</h2>
              <p className="text-slate-400 text-sm mb-6">Maximum security, dedicated infrastructure, custom SLA, and white-glove onboarding.</p>
              <div className="text-3xl font-bold mb-6">$499<span className="text-sm font-normal text-slate-400">/month + custom</span></div>
              <ul className="space-y-3 text-sm text-slate-300 mb-8">
                <li>✓ Unlimited consents & high throughput</li>
                <li>✓ Dedicated AWS infrastructure partition</li>
                <li>✓ Custom zero-trust security audits</li>
                <li>✓ Verified Privacy trust badge</li>
              </ul>
            </div>
            <button
              onClick={() => handleUpgrade("Enterprise")}
              disabled={loadingTier === "Enterprise"}
              className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-medium py-3 rounded-xl transition cursor-pointer"
            >
              {loadingTier === "Enterprise" ? "Initializing..." : "Upgrade to Enterprise"}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
