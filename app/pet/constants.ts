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
  // ─── Main event types ──────────────────────────────
  seizure: "#ef4444",        // red-500
  medication: "#3b82f6",     // blue-500
  feeding: "#8b5cf6",        // violet-500
  activity: "#f59e0b",       // amber-500
  change: "#14b8a6",         // teal-500

  // ─── Feeding types (violet / purple scale) ─────────
  "feeding:kibble": "rgba(109, 40, 217, 0.7)",   // violet-700
  "feeding:fresh": "rgba(139, 92, 246, 0.7)",    // violet-500
  "feeding:treat": "rgba(167, 139, 250, 0.7)",   // violet-400
  "feeding:wet": "rgba(124, 58, 237, 0.6)",      // violet-600
  "feeding:raw": "rgba(196, 181, 253, 0.6)",     // violet-300
  "feeding:mixed": "rgba(221, 214, 254, 0.6)",   // violet-200
  "feeding:other": "rgba(237, 233, 254, 0.5)",   // violet-100

  // ─── Medication types (blue scale) ─────────────────
  "medication:ASM": "rgba(37, 99, 235, 0.7)",    // blue-600
  "medication:OTHER": "rgba(96, 165, 250, 0.7)", // blue-400

  // ─── Activity types (amber / yellow scale) ─────────
  "activity:walk": "rgba(245, 158, 11, 0.85)",    // amber-500
  "activity:playtime": "rgba(251, 191, 36, 0.8)", // amber-400
  "activity:park": "rgba(250, 204, 21, 0.8)",     // amber-300
  "activity:training": "rgba(253, 230, 138, 0.75)", // amber-200
  "activity:grooming": "rgba(254, 243, 199, 0.7)",  // amber-100
  "activity:vet_visit": "rgba(255, 251, 235, 0.6)", // amber-50
  "activity:other": "rgba(255, 253, 230, 0.6)",     // amber-50+
};



