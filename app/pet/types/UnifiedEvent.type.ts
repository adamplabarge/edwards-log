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

  feedingType?: string;
  changeLabel?: string;
};
