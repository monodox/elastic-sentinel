"use client";

import { useMemo, useState } from "react";
import type { AlertInput, InvestigationResult } from "@/lib/types";

const demoAlert: AlertInput = {
  alert_id: "alert_001",
  timestamp: "2024-01-15T14:23:00Z",
  severity: "high",
  type: "authentication_anomaly",
  description: "Unusual login spike detected",
  user: "john.doe",
  source_ip: "203.0.113.45",
  host: "workstation-042",
};

export default function HomePage() {
  const [input, setInput] = useState(JSON.stringify(demoAlert, null, 2));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<InvestigationResult | null>(null);

  const prettyResult = useMemo(
    () => (result ? JSON.stringify(result, null, 2) : ""),
    [result],
  );

  async function runInvestigation() {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const parsed = JSON.parse(input);
      const response = await fetch("/api/investigate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed),
      });
      const data = await response.json();
      if (!response.ok || !data.ok) {
        throw new Error(data.error ?? "Investigation failed");
      }
      setResult(data.result as InvestigationResult);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Unable to parse or submit alert";
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-5xl flex-col gap-6 p-6 md:p-10">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">ElasticSentinel</h1>
        <p className="text-sm text-slate-300">
          Submit an alert payload to run a SOC investigation simulation.
        </p>
      </header>

      <section className="grid gap-6 md:grid-cols-2">
        <div className="space-y-3">
          <h2 className="text-lg font-medium">Alert Payload</h2>
          <textarea
            className="h-96 w-full rounded-lg border border-slate-700 bg-slate-900 p-4 font-mono text-sm text-slate-100 outline-none ring-0 focus:border-sky-500"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            spellCheck={false}
          />
          <button
            className="rounded-md bg-sky-500 px-4 py-2 text-sm font-medium text-slate-950 transition hover:bg-sky-400 disabled:cursor-not-allowed disabled:opacity-60"
            onClick={runInvestigation}
            disabled={loading}
            type="button"
          >
            {loading ? "Investigating..." : "Investigate"}
          </button>
          {error ? <p className="text-sm text-rose-400">{error}</p> : null}
        </div>

        <div className="space-y-3">
          <h2 className="text-lg font-medium">Result</h2>
          <pre className="h-96 overflow-auto rounded-lg border border-slate-700 bg-black/40 p-4 text-xs text-slate-200">
            {prettyResult || "No investigation has been run yet."}
          </pre>
        </div>
      </section>
    </main>
  );
}
