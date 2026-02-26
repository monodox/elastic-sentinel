"use client";

import { useState } from "react";

type ToggleProps = {
  label: string;
  description: string;
  defaultValue?: boolean;
};

function Toggle({ label, description, defaultValue = false }: ToggleProps) {
  const [enabled, setEnabled] = useState(defaultValue);

  return (
    <div className="flex items-start justify-between gap-4 rounded-lg border border-slate-800 bg-slate-900/40 p-4">
      <span>
        <span className="block text-sm font-medium text-slate-100">{label}</span>
        <span className="mt-1 block text-xs text-slate-400">{description}</span>
      </span>
      <button
        type="button"
        aria-pressed={enabled}
        className={`mt-1 inline-flex h-6 w-11 items-center rounded-full p-1 transition ${
          enabled ? "bg-cyan-400" : "bg-slate-700"
        }`}
        onClick={() => setEnabled((state) => !state)}
      >
        <span
          className={`h-4 w-4 rounded-full bg-slate-950 transition ${
            enabled ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </button>
    </div>
  );
}

export default function SettingsPage() {
  return (
    <section className="max-w-3xl space-y-4">
      <h2 className="text-lg font-medium text-slate-100">SOC Settings</h2>
      <p className="text-sm text-slate-300">
        Control investigation behavior, alert routing, and analyst notification
        defaults.
      </p>

      <Toggle
        label="Auto-create incidents"
        description="Automatically open an incident when confidence is above 80%."
        defaultValue
      />
      <Toggle
        label="Geo anomaly checks"
        description="Run impossible travel and geo-behavior checks for auth alerts."
        defaultValue
      />
      <Toggle
        label="Slack notifications"
        description="Notify the SOC Slack channel when critical incidents are created."
      />
    </section>
  );
}
