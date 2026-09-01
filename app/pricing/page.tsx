'use client';

import { useState } from 'react';
import { PRODUCTS } from '@/lib/products';
import Link from 'next/link';

export default function PricingPage() {
  const [loadingTier, setLoadingTier] = useState<string | null>(null);

  const handleCheckout = async (priceId: string, tierId: string) => {
    try {
      setLoadingTier(tierId);
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priceId }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert(data.error || 'Failed to initialize checkout session.');
      }
    } catch (err) {
      console.error(err);
      alert('Network error connecting to payment gateway.');
    } finally {
      setLoadingTier(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#070b19] text-white px-6 py-12">
      <div className="max-w-6xl mx-auto text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
          Transparent pricing for autonomous compliance
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Deploy enterprise-grade cryptographic privacy and consent workflows with predictable scale-based billing.
        </p>
        <div className="mt-6">
          <Link href="/dashboard" className="text-sm text-cyan-400 hover:underline">
            ? Back to Dashboard
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {Object.values(PRODUCTS).map((tier) => {
          const isPopular = tier.id === 'growth';
          return (
            <div
              key={tier.id}
              className={`relative bg-[#0e1629] rounded-2xl p-8 border ${
                isPopular ? 'border-emerald-500 shadow-xl shadow-emerald-500/10' : 'border-gray-800'
              } flex flex-col justify-between`}
            >
              {isPopular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-500 text-black text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                  Most Popular
                </div>
              )}
              <div>
                <h3 className="text-xl font-bold mb-2">{tier.name}</h3>
                <p className="text-gray-400 text-sm mb-6">
                  {tier.id === 'starter' && 'Essential consent synchronization and privacy orchestration for growing apps.'}
                  {tier.id === 'growth' && 'Advanced multi-domain governance and automated compliance pipelines for scale.'}
                  {tier.id === 'enterprise' && 'Maximum security, dedicated infrastructure, custom SLA, and white-glove onboarding.'}
                </p>
                <div className="mb-6">
                  <span className="text-4xl font-extrabold">${tier.amount}</span>
                  <span className="text-gray-400 text-sm">/month{tier.id === 'enterprise' ? ' + custom' : ''}</span>
                </div>
                <ul className="space-y-3 text-sm text-gray-300 mb-8 text-left">
                  {tier.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-center gap-2">
                      <span className="text-cyan-400">?</span> {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <button
                onClick={() => handleCheckout(tier.priceId, tier.id)}
                disabled={loadingTier === tier.id}
                className={`w-full py-3 rounded-xl font-semibold transition cursor-pointer ${
                  isPopular
                    ? 'bg-emerald-500 text-black hover:bg-emerald-400'
                    : 'bg-gray-800 text-white hover:bg-gray-700'
                } disabled:opacity-50`}
              >
                {loadingTier === tier.id ? 'Initializing...' : `Upgrade to ${tier.name}`}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
