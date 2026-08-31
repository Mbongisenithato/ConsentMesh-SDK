export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-8">
      <div className="max-w-7xl mx-auto">
        <header className="flex justify-between items-center mb-8 border-b border-slate-800 pb-4">
          <div>
            <h1 className="text-2xl font-bold">ConsentMesh Pro Dashboard</h1>
            <p className="text-sm text-slate-400">Autonomous cryptographic compliance and real-time telemetry</p>
          </div>
          <a href="/" className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-sm font-medium rounded-lg transition">
            ? Back to Home
          </a>
        </header>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <h3 className="text-sm font-medium text-slate-400">Active Consents</h3>
            <p className="text-3xl font-bold mt-2">12,480</p>
            <span className="text-xs text-emerald-400 mt-1 inline-block">+14% this month</span>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <h3 className="text-sm font-medium text-slate-400">Protected Domains</h3>
            <p className="text-3xl font-bold mt-2">3</p>
            <span className="text-xs text-slate-400 mt-1 inline-block">All systems operational</span>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <h3 className="text-sm font-medium text-slate-400">Telemetry Latency</h3>
            <p className="text-3xl font-bold mt-2">24ms</p>
            <span className="text-xs text-emerald-400 mt-1 inline-block">DynamoDB edge synced</span>
          </div>
        </div>
      </div>
    </div>
  );
}
