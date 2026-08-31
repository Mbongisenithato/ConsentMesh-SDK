"use client";

import { useState } from "react";

const TIERS = [
  {
    id: "starter",
    name: "Starter",
    price: "$39",
    cadence: "per month",
    description: "Essential consent synchronization and privacy orchestration for growing apps.",
    features: ["10,000 monthly active consents", "Up to 3 active domains", "Standard telemetry & audit logs", "Community support channel"],
    popular: false,
  },
  {
    id: "growth",
    name: "Growth",
    price: "$199",
    cadence: "per month",
    description: "Advanced multi-domain governance and automated compliance pipelines for scale.",
    features: ["100,000 monthly active consents", "Unlimited active domains", "Real-time DynamoDB telemetry", "Priority webhook routing", "Email & chat support"],
    popular: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "$499",
    cadence: "per month + custom",
    description: "Maximum security, dedicated infrastructure, custom SLA, and white-glove onboarding.",
    features: ["Unlimited consents & high throughput", "Dedicated AWS infrastructure partition", "Custom zero-trust security audits", "24/7 dedicated support manager", "Custom data residency options"],
    popular: false,
  },
];

export default function PricingPage() {
  const [loadingTier, setLoadingTier] = useState<string | null>(null);

  const handleUpgrade = async (tierId: string) => {
    setLoadingTier(tierId);
    try {
      const res = await fetch("/api/v1/billing/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: "user_123", customerEmail: "developer@consentmesh.io", tier: tierId }),
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
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-indigo-500 selection:text-white relative overflow-hidden">
      {/* Background ambient lighting effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-gradient-to-tr from-indigo-600/20 via-purple-600/15 to-transparent blur-[120px] pointer-events-none" />

      <header className="w-full max-w-7xl mx-auto px-6 py-8 flex items-center justify-between z-10">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-lg shadow-lg shadow-indigo-500/30">
            C
          </div>
          <span className="font-semibold text-lg tracking-tight text-white">ConsentMesh <span className="text-indigo-400 font-normal">Pro</span></span>
        </div>
        <div className="text-sm text-slate-400 flex items-center gap-6">
          <span className="hidden sm:inline">Secure Global Billing</span>
          <a href="/dashboard" className="text-indigo-400 hover:text-indigo-300 transition-colors font-medium">Dashboard &rarr;</a>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12 w-full z-10 flex-1 flex flex-col items-center">
        <div className="text-center max-w-2xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold tracking-wide uppercase mb-4">
            Stripe Verified Infrastructure
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-6">
            Transparent pricing for <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">autonomous compliance</span>
          </h1>
          <p className="text-slate-400 text-lg leading-relaxed">
            Deploy enterprise-grade cryptographic privacy and consent workflows with predictable scale-based billing.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full max-w-6xl items-stretch">
          {TIERS.map((tier) => (
            <div
              key={tier.id}
              className={`relative rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 bg-slate-900/80 backdrop-blur-xl border ${
                tier.popular
                  ? "border-indigo-500 shadow-2xl shadow-indigo-500/10 ring-2 ring-indigo-500/20 scale-105 lg:-translate-y-2"
                  : "border-slate-800 hover:border-slate-700 shadow-xl shadow-slate-950/50"
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-xs font-semibold px-4 py-1 rounded-full shadow-lg tracking-wide uppercase">
                  Most Popular
                </div>
              )}

              <div>
                <h3 className="text-xl font-bold text-white mb-2">{tier.name}</h3>
                <p className="text-slate-400 text-sm mb-6 min-h-[40px]">{tier.description}</p>
                <div className="flex items-baseline gap-1 mb-8 pb-6 border-b border-slate-800/80">
                  <span className="text-4xl sm:text-5xl font-black text-white tracking-tight">{tier.price}</span>
                  <span className="text-slate-400 text-sm font-medium">{tier.cadence}</span>
                </div>

                <ul className="space-y-3.5 mb-8">
                  {tier.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-slate-300">
                      <svg className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => handleUpgrade(tier.id)}
                disabled={loadingTier !== null}
                className={`w-full py-3.5 px-6 rounded-xl font-semibold text-sm transition-all duration-200 shadow-lg flex items-center justify-center gap-2 ${
                  tier.popular
                    ? "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-indigo-600/30 hover:shadow-indigo-600/50"
                    : "bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 hover:border-slate-600 shadow-slate-900/40"
                } disabled:opacity-50`}
              >
                {loadingTier === tier.id ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Initializing Checkout...
                  </>
                ) : (
                  `Upgrade to ${tier.name}`
                )}
              </button>
            </div>
          ))}
        </div>
      </main>

      <footer className="w-full max-w-7xl mx-auto px-6 py-8 border-t border-slate-900 text-center text-xs text-slate-500 z-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p>&copy; 2026 ConsentMesh Pro. All rights reserved. Secured with Stripe TLS 1.3.</p>
        <div className="flex gap-6 text-slate-400">
          <a href="#" className="hover:text-slate-200 transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-slate-200 transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-slate-200 transition-colors">Security</a>
        </div>
      </footer>
    </div>
  );
}
