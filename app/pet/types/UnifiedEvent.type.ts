export type UnifiedEventType =
  | "seizure"
  | "feeding"
  | "medication"
  | "change";

export type UnifiedEvent = {
  id: string;
  eventType: UnifiedEventType;
  date: string; // ISO 8601, UTC (e.g. "2025-12-04T13:00:00Z")
  notes?: string;

  feedingType?: string;
  changeLabel?: string;
};
