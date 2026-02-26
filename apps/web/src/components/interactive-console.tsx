"use client";

import { useMemo, useState } from "react";

type ConsoleEntry = {
  id: number;
  kind: "command" | "info" | "success" | "error";
  text: string;
};

const sampleAlert = {
  alert_id: "alert_001",
  timestamp: "2024-01-15T14:23:00Z",
  severity: "high",
  type: "authentication_anomaly",
  description: "Unusual login spike detected",
  user: "john.doe",
  source_ip: "203.0.113.45",
  host: "workstation-042",
};

function helpText() {
  return [
    "Available commands:",
    "help",
    "clear",
    "status",
    "investigate sample",
  ].join("\n");
}

export function InteractiveConsole() {
  const [command, setCommand] = useState("");
  const [busy, setBusy] = useState(false);
  const [entries, setEntries] = useState<ConsoleEntry[]>([
    { id: 1, kind: "info", text: "ElasticSentinel console ready. Type 'help'." },
  ]);

  const orderedEntries = useMemo(() => entries, [entries]);

  async function runCommand(raw: string) {
    const trimmed = raw.trim();
    if (!trimmed) return;

    setEntries((prev) => [
      ...prev,
      { id: Date.now(), kind: "command", text: `> ${trimmed}` },
    ]);

    if (trimmed === "clear") {
      setEntries([]);
      return;
    }

    if (trimmed === "help") {
      setEntries((prev) => [
        ...prev,
        { id: Date.now() + 1, kind: "info", text: helpText() },
      ]);
      return;
    }

    if (trimmed === "status") {
      setEntries((prev) => [
        ...prev,
        {
          id: Date.now() + 2,
          kind: "success",
          text: "System healthy. API route reachable. Workspace active.",
        },
      ]);
      return;
    }

    if (trimmed === "investigate sample") {
      setBusy(true);
      try {
        const response = await fetch("/api/investigate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(sampleAlert),
        });
        const data = await response.json();

        if (!response.ok || !data.ok) {
          throw new Error(data.error ?? "Investigation failed");
        }

        setEntries((prev) => [
          ...prev,
          {
            id: Date.now() + 3,
            kind: "success",
            text: `Incident ${data.result.incident_id} created with confidence ${Math.round(data.result.confidence * 100)}%.`,
          },
          {
            id: Date.now() + 4,
            kind: "info",
            text: data.result.summary,
          },
        ]);
      } catch (error) {
        setEntries((prev) => [
          ...prev,
          {
            id: Date.now() + 5,
            kind: "error",
            text:
              error instanceof Error ? error.message : "Unknown execution error",
          },
        ]);
      } finally {
        setBusy(false);
      }
      return;
    }

    setEntries((prev) => [
      ...prev,
      {
        id: Date.now() + 6,
        kind: "error",
        text: `Unknown command '${trimmed}'. Type 'help'.`,
      },
    ]);
  }

  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-950/70 p-4 shadow-[0_0_35px_rgba(8,145,178,0.12)]">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-medium text-slate-100">Interactive Console</h2>
        <div className="flex gap-2">
          <button
            type="button"
            className="rounded-md border border-slate-700 px-3 py-1 text-xs text-slate-300 hover:border-cyan-500 hover:text-cyan-200"
            onClick={() => runCommand("help")}
          >
            Help
          </button>
          <button
            type="button"
            className="rounded-md border border-slate-700 px-3 py-1 text-xs text-slate-300 hover:border-cyan-500 hover:text-cyan-200"
            onClick={() => runCommand("investigate sample")}
            disabled={busy}
          >
            Run Sample
          </button>
        </div>
      </div>

      <div className="h-80 overflow-auto rounded-lg border border-slate-800 bg-black/45 p-3 font-mono text-sm">
        {orderedEntries.length === 0 ? (
          <p className="text-slate-500">Console cleared.</p>
        ) : (
          orderedEntries.map((entry) => (
            <p
              key={entry.id}
              className={
                entry.kind === "error"
                  ? "text-rose-300"
                  : entry.kind === "success"
                    ? "text-emerald-300"
                    : entry.kind === "command"
                      ? "text-cyan-300"
                      : "text-slate-200"
              }
            >
              {entry.text}
            </p>
          ))
        )}
      </div>

      <form
        className="mt-4 flex gap-3"
        onSubmit={async (event) => {
          event.preventDefault();
          const current = command;
          setCommand("");
          await runCommand(current);
        }}
      >
        <input
          className="flex-1 rounded-md border border-slate-700 bg-slate-900/80 px-3 py-2 text-sm text-slate-100 outline-none focus:border-cyan-500"
          placeholder="Type a command..."
          value={command}
          onChange={(event) => setCommand(event.target.value)}
          disabled={busy}
        />
        <button
          type="submit"
          className="rounded-md bg-cyan-400 px-4 py-2 text-sm font-medium text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-60"
          disabled={busy}
        >
          {busy ? "Running..." : "Run"}
        </button>
      </form>
    </section>
  );
}
