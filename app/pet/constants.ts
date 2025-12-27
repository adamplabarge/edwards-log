import { UnifiedEvent } from "@/app/pet/types/UnifiedEvent.type";

export const EVENT_COLORS: Record<
  | UnifiedEvent["eventType"]
  | "feeding:kibble"
  | "feeding:fresh"
  | "feeding:treat"
  | "feeding:wet"
  | "feeding:raw"
  | "feeding:mixed"
  | "feeding:other"
  | "medication:ASM"
  | "medication:OTHER"
  | "activity:walk"
  | "activity:playtime"
  | "activity:park"
  | "activity:training"
  | "activity:grooming"
  | "activity:vet_visit"
  | "activity:other",
  string
> = {
  // Main event types
  seizure: "#ef4444",       // red-500
  medication: "#3b82f6",    // blue-500
  change: "#d946ef",        // fuchsia-500
  feeding: "#10b981",       // emerald-500
  activity: "#f59e0b",      // amber-500

  // Feeding types (emerald shades)
  "feeding:kibble": "rgba(5, 150, 105, 0.6)",    // emerald-700
  "feeding:fresh": "rgba(16, 185, 129, 0.6)",   // emerald-500
  "feeding:treat": "rgba(52, 211, 153, 0.6)",   // emerald-400
  "feeding:wet": "rgba(5, 150, 105, 0.5)",      // emerald-600
  "feeding:raw": "rgba(34, 197, 94, 0.5)",      // emerald-500
  "feeding:mixed": "rgba(110, 231, 183, 0.5)",  // emerald-300
  "feeding:other": "rgba(134, 239, 172, 0.5)",  // emerald-200

  // Medication types (blue shades)
  "medication:ASM": "rgba(59, 130, 246, 0.7)",  // blue-500
  "medication:OTHER": "rgba(96, 165, 250, 0.7)",// blue-400

  // Activity types (amber/orange shades)
  "activity:walk": "rgba(245, 158, 11, 0.8)",      // amber-500
  "activity:playtime": "rgba(251, 191, 36, 0.8)",  // amber-400
  "activity:park": "rgba(250, 204, 21, 0.7)",      // amber-300
  "activity:training": "rgba(253, 230, 138, 0.7)", // amber-200
  "activity:grooming": "rgba(254, 240, 138, 0.6)", // amber-100
  "activity:vet_visit": "rgba(255, 247, 171, 0.6)",// amber-50
  "activity:other": "rgba(255, 251, 204, 0.5)",    // amber-50 very light
};


