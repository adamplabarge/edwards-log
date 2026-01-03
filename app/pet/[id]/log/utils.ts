import { UnifiedEvent } from "@/app/pet/types/UnifiedEvent.type";
import { DateTime } from "luxon";
import { EVENT_COLORS } from "@/app/pet/constants";

export function getEventColor(event: UnifiedEvent) {
  if (event.eventType === "feeding" && event.type) {
    const feedingKey =
      `feeding:${event.type}` as keyof typeof EVENT_COLORS;
    return EVENT_COLORS[feedingKey] || EVENT_COLORS.feeding;
  }
  return EVENT_COLORS[event.eventType];
}

export function isSameDay(a: Date, b: Date) {
  return DateTime.fromJSDate(a).hasSame(DateTime.fromJSDate(b), "day");
}

export function getEventLabel(event: UnifiedEvent) {
  switch (event.eventType) {
    case "seizure":
      return "Seizure";
    case "feeding":
      return event.type
        ? `Feeding (${event.type})`
        : "Feeding";
    case "medication":
      return (event as any).type === "ASM"
        ? "Medication (Antiseizure)"
        : (event as any).type === "OTHER"
        ? "Medication (Other)"
        : "Medication";
    case "activity":
      return (event as any).type
        ? `Activity (${(event as any).type.replace("_", " ")})`
        : "Activity";
    case "change":
      return event.changeLabel ?? "Change";
    default:
      return event.eventType;
  }
}

export function formatDuration(start: string, end: string) {
  const startDT = DateTime.fromISO(start);
  const endDT = DateTime.fromISO(end);

  const diff = endDT.diff(startDT, ["hours", "minutes"]);
  const hours = Math.floor(diff.hours);
  const minutes = diff.minutes;

  const parts = [];
  if (hours) parts.push(`${hours}h`);
  if (minutes) parts.push(`${Math.round(minutes)}m`);

  return parts.join(" ") || "0m";
}
