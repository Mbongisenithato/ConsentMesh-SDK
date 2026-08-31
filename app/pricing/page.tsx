export default function PricingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-16 px-4">
      <div className="max-w-7xl mx-auto text-center mb-16">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl mb-4">
          Transparent pricing for autonomous compliance
        </h1>
        <p className="text-lg text-slate-400 max-w-2xl mx-auto">
          Deploy enterprise-grade cryptographic privacy and consent workflows with predictable scale-based billing.
        </p>
      </div>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">Starter</h3>
            <p className="text-sm text-slate-400 mb-6">Essential consent synchronization and privacy orchestration for growing apps.</p>
            <div className="text-3xl font-bold mb-6">$39<span className="text-sm font-normal text-slate-400">/month</span></div>
            <ul className="space-y-3 text-sm text-slate-300 mb-8">
              <li>? 10,000 monthly active consents</li>
              <li>? Up to 3 active domains</li>
              <li>? Standard telemetry & audit logs</li>
              <li>? Community support channel</li>
            </ul>
          </div>
          <a href="/dashboard" className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-center font-medium rounded-xl transition">
            Upgrade to Starter
          </a>
        </div>
        <div className="bg-slate-900 border border-emerald-500/50 rounded-2xl p-8 flex flex-col justify-between relative shadow-xl shadow-emerald-950/20">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-500 text-slate-950 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            Most Popular
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">Growth</h3>
            <p className="text-sm text-slate-400 mb-6">Advanced multi-domain governance and automated compliance pipelines for scale.</p>
            <div className="text-3xl font-bold mb-6">$199<span className="text-sm font-normal text-slate-400">/month</span></div>
            <ul className="space-y-3 text-sm text-slate-300 mb-8">
              <li>? 100,000 monthly active consents</li>
              <li>? Unlimited active domains</li>
              <li>? Real-time DynamoDB telemetry</li>
              <li>? Priority webhook routing</li>
            </ul>
          </div>
          <a href="/dashboard" className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-center font-semibold rounded-xl transition">
            Upgrade to Growth
          </a>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 flex flex-col justify-between">
          <div>
            <h3 className="text-lg font-semibold text-white mb-2">Enterprise</h3>
            <p className="text-sm text-slate-400 mb-6">Maximum security, dedicated infrastructure, custom SLA, and white-glove onboarding.</p>
            <div className="text-3xl font-bold mb-6">$499<span className="text-sm font-normal text-slate-400">/month + custom</span></div>
            <ul className="space-y-3 text-sm text-slate-300 mb-8">
              <li>? Unlimited consents & high throughput</li>
              <li>? Dedicated AWS infrastructure partition</li>
              <li>? Custom zero-trust security audits</li>
              <li>? 24/7 dedicated support manager</li>
            </ul>
          </div>
          <a href="/dashboard" className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-center font-medium rounded-xl transition">
            Upgrade to Enterprise
          </a>
        </div>
      </div>
    </div>
  );
}
