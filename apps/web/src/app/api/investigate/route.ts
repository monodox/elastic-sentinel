import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { parseAlertInput } from "@/lib/validate";
import type { InvestigationResult } from "@/lib/types";

function buildMockResult(): Omit<InvestigationResult, "received_alert"> {
  return {
    incident_id: `inc_${Date.now()}`,
    summary:
      "Potential coordinated activity detected across authentication and endpoint telemetry.",
    confidence: 0.82,
    correlated_entities: ["user", "source_ip", "host"],
    evidence: [
      "Recent authentication anomaly observed for provided principal.",
      "Supporting endpoint events exist in the same investigation window.",
      "Pattern similarity matched historical incident signatures.",
    ],
    recommended_actions: [
      "Temporarily challenge authentication for the user account.",
      "Isolate impacted endpoint if additional malicious behavior is confirmed.",
      "Escalate to SOC analyst for manual review.",
    ],
  };
}

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const alert = parseAlertInput(payload);
    const result: InvestigationResult = {
      ...buildMockResult(),
      received_alert: alert,
    };

    return NextResponse.json({ ok: true, result });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { ok: false, error: "Invalid alert payload", details: error.flatten() },
        { status: 400 },
      );
    }

    return NextResponse.json(
      { ok: false, error: "Failed to run investigation" },
      { status: 500 },
    );
  }
}
