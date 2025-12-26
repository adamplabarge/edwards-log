import { UnifiedEvent } from "@/app/pet/types/UnifiedEvent.type";

export const EVENT_COLORS: Record<
  | UnifiedEvent["eventType"]
  | "feeding:kibble"
  | "feeding:fresh"
  | "feeding:treat",
  string
> = {
  seizure: "#ff6666",
  medication: "rgba(204, 102, 255, 0.5)",
  change: "rgba(255, 99, 132, 0.7)",
  feeding: "rgba(102, 204, 255, 0.4)",

  "feeding:kibble": "rgba(102, 204, 255, 0.4)",
  "feeding:fresh": "rgba(0, 204, 102, 0.5)",
  "feeding:treat": "rgba(255, 204, 102, 0.5)",
};