export type UnifiedEventType =
  | "seizure"
  | "feeding"
  | "medication"
  | "change";

export type UnifiedEvent = {
  id: string;
  eventType: UnifiedEventType;
  date: Date;
  notes?: string;

  // Optional fields by type
  feedingType?: string;
  changeLabel?: string;
};
