import { z } from "zod";
import type { AlertInput } from "@/lib/types";

const alertSchema = z.object({
  alert_id: z.string().min(1),
  timestamp: z.string().datetime(),
  severity: z.enum(["low", "medium", "high", "critical"]),
  type: z.string().min(1),
  description: z.string().min(1),
  user: z.string().min(1).optional(),
  source_ip: z.string().min(1).optional(),
  host: z.string().min(1).optional(),
});

export function parseAlertInput(payload: unknown): AlertInput {
  return alertSchema.parse(payload);
}
