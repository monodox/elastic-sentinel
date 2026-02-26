export type AlertSeverity = "low" | "medium" | "high" | "critical";

export type AlertInput = {
  alert_id: string;
  timestamp: string;
  severity: AlertSeverity;
  type: string;
  description: string;
  user?: string;
  source_ip?: string;
  host?: string;
};

export type InvestigationResult = {
  incident_id: string;
  summary: string;
  confidence: number;
  correlated_entities: string[];
  evidence: string[];
  recommended_actions: string[];
  received_alert: AlertInput;
};
