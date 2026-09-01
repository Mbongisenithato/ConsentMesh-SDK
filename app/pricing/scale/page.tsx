'use client';

import { useState } from 'react';
import { PRODUCTS } from '@/lib/products';
import Link from 'next/link';

export default function EnterpriseScalePage() {
  const [selectedTier, setSelectedTier] = useState('scale');
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [invoiceResult, setInvoiceResult] = useState<any>(null);

  const tierDetails = PRODUCTS[selectedTier] || PRODUCTS['scale'];

  const handleRequestInvoice = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setInvoiceResult(null);

    try {
      const res = await fetch('/api/enterprise-invoice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          companyName,
          email,
          tierId: selectedTier,
          amount: tierDetails.amount,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setInvoiceResult(data);
      } else {
        alert(data.error || 'Failed to generate B2B invoice.');
      }
    } catch (err) {
      console.error(err);
      alert('Network error connecting to corporate invoicing gateway.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#070b19] text-white px-6 py-12">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight mb-4">
          Sovereign & Enterprise Scale Invoicing
        </h1>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Multi-million consent processing, isolated AWS VPC partitions, and automated Net-30 Net-60 procurement contracts for global enterprises.
        </p>
        <div className="mt-4">
          <Link href="/pricing" className="text-sm text-cyan-400 hover:underline">
            ? Back to Standard Pricing Tiers
          </Link>
        </div>
      </div>

      <div className="max-w-2xl mx-auto bg-[#0e1629] border border-gray-800 rounded-2xl p-8 shadow-2xl">
        {invoiceResult ? (
          <div className="text-center space-y-6 py-6">
            <div className="text-emerald-400 text-5xl">?</div>
            <h2 className="text-2xl font-bold">Enterprise Invoice Dispatched</h2>
            <p className="text-gray-300 text-sm">
              An official Net-30 procurement invoice for <span className="text-white font-semibold">{tierDetails.name}</span> (${tierDetails.amount}/mo) has been generated and emailed to <span className="text-cyan-400">{email}</span>.
            </p>
            <div className="pt-4">
              <a
                href={invoiceResult.hostedInvoiceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-emerald-500 text-black font-bold px-6 py-3 rounded-xl hover:bg-emerald-400 transition"
              >
                View Official Stripe Invoice
              </a>
            </div>
          </div>
        ) : (
          <form onSubmit={handleRequestInvoice} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Select Enterprise Tier</label>
              <select
                value={selectedTier}
                onChange={(e) => setSelectedTier(e.target.value)}
                className="w-full bg-[#070b19] border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500"
              >
                <option value="scale">Scale Tier ($1,499/mo - Up to 5M Consents)</option>
                <option value="sovereign">Sovereign Enterprise ($3,999/mo - Up to 25M Consents)</option>
                <option value="government">Critical Infrastructure & Gov ($10,000+/mo - Unlimited)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Corporate Entity Name</label>
              <input
                type="text"
                required
                placeholder="Acme Global Technologies Inc."
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full bg-[#070b19] border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Procurement / Billing Email</label>
              <input
                type="email"
                required
                placeholder="procurement@acme.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#070b19] border border-gray-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div className="bg-[#070b19] p-4 rounded-xl border border-gray-800 text-sm text-gray-400 space-y-2">
              <div className="flex justify-between font-semibold text-white">
                <span>Selected Package:</span>
                <span>{tierDetails.name}</span>
              </div>
              <div className="flex justify-between">
                <span>Monthly Investment:</span>
                <span className="text-emerald-400">${tierDetails.amount} USD / month</span>
              </div>
              <div className="flex justify-between">
                <span>Billing Terms:</span>
                <span>Net-30 Automated Stripe Invoice</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-cyan-500 text-black font-bold py-4 rounded-xl hover:bg-cyan-400 transition disabled:opacity-50 cursor-pointer"
            >
              {loading ? 'Processing Corporate Intake...' : 'Generate Net-30 Enterprise Invoice'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
