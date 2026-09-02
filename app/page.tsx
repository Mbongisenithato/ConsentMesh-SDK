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

  const tiers = [
    {
      name: "Starter",
      price: "$39",
      desc: "Essential consent synchronization and privacy orchestration for growing apps.",
      features: ["10,000 monthly active consents", "Up to 3 active domains", "Standard telemetry & audit logs", "Free 1-year audit log retention"],
    },
    {
      name: "Professional",
      price: "$199",
      desc: "Advanced multi-domain governance and automated compliance pipelines for scale.",
      features: ["100,000 monthly active consents", "Unlimited active domains", "Real-time DynamoDB telemetry", "White-glove data migration included"],
    },
    {
      name: "Enterprise",
      price: "$499",
      desc: "Maximum security, dedicated infrastructure, custom SLA, and white-glove onboarding.",
      features: ["Unlimited consents & high throughput", "Dedicated AWS infrastructure partition", "Custom zero-trust security audits", "Verified Privacy trust badge"],
    },
    {
      name: "Scale Tier",
      price: "$1,499",
      desc: "High-volume governance engine designed for rapidly expanding digital ecosystems.",
      features: ["1,000,000+ monthly active consents", "Multi-region AWS DynamoDB replication", "Advanced custom telemetry pipelines", "Priority 24/7 engineering support"],
    },
    {
      name: "Sovereign Enterprise",
      price: "$3,999",
      desc: "Isolated data residency and sovereign compliance suites for strict regional regulations.",
      features: ["100% data residency compliance", "Custom cryptographic auditing keys", "Dedicated VPC peering options", "Dedicated compliance officer SLA"],
    },
    {
      name: "Critical Infrastructure & Gov",
      price: "$10,000",
      desc: "Military-grade data protection, air-gapped support configurations, and sovereign oversight.",
      features: ["Air-gapped deployment readiness", "Full national cyber resilience game integration", "Custom threat modeling & adversarial testing", "Executive governance portal access"],
    },
  ];

  return (
    <main className="min-h-screen bg-slate-950 text-white p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-4">ConsentMesh Pro Pricing</h1>
        <p className="text-center text-slate-400 mb-12">Select your compliance and governance tier.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tiers.map((t) => (
            <div key={t.name} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
              <div>
                <h2 className="text-2xl font-semibold mb-2">{t.name}</h2>
                <p className="text-slate-400 text-sm mb-6">{t.desc}</p>
                <div className="text-3xl font-bold mb-6">{t.price}<span className="text-sm font-normal text-slate-400">/month</span></div>
                <ul className="space-y-3 text-sm text-slate-300 mb-8">
                  {t.features.map((f, i) => (
                    <li key={i}>✓ {f}</li>
                  ))}
                </ul>
              </div>
              <button
                onClick={() => handleUpgrade(t.name)}
                disabled={loadingTier === t.name}
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-medium py-3 rounded-xl transition cursor-pointer"
              >
                {loadingTier === t.name ? "Initializing..." : `Upgrade to ${t.name}`}
              </button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
