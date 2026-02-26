const stats = [
  { label: "Open incidents", value: "18", delta: "+4 today" },
  { label: "Correlated alerts", value: "241", delta: "+12%" },
  { label: "Avg triage time", value: "8m", delta: "-34%" },
  { label: "Automation success", value: "97.8%", delta: "+1.1%" },
];

const activeThreats = [
  "Impossible travel pattern for john.doe",
  "Privilege escalation chain on workstation-042",
  "Suspicious auth bursts from 203.0.113.45",
];

export default function DashboardPage() {
  return (
    <section className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => (
          <article
            key={item.label}
            className="rounded-xl border border-slate-800 bg-slate-900/60 p-4"
          >
            <p className="text-xs uppercase tracking-wide text-slate-400">
              {item.label}
            </p>
            <p className="mt-2 text-2xl font-semibold text-slate-100">{item.value}</p>
            <p className="mt-1 text-xs text-cyan-300">{item.delta}</p>
          </article>
        ))}
      </div>

      <article className="rounded-xl border border-slate-800 bg-slate-900/50 p-5">
        <h2 className="text-lg font-medium text-slate-100">Priority Queue</h2>
        <ul className="mt-4 space-y-3">
          {activeThreats.map((threat) => (
            <li
              key={threat}
              className="rounded-lg border border-slate-800 bg-slate-950/50 px-4 py-3 text-sm text-slate-200"
            >
              {threat}
            </li>
          ))}
        </ul>
      </article>
    </section>
  );
}
