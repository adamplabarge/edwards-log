import { UnifiedEvent } from "@/app/pet/types/UnifiedEvent.type";
import { DateTime } from "luxon";
import { EVENT_COLORS } from "@/app/pet/constants";

export function getEventColor(event: UnifiedEvent) {
  if (event.eventType === "feeding" && event.feedingType) {
    const feedingKey =
      `feeding:${event.feedingType}` as keyof typeof EVENT_COLORS;
    return EVENT_COLORS[feedingKey] || EVENT_COLORS.feeding;
  }
  return EVENT_COLORS[event.eventType];
}

export function isSameDay(a: Date, b: Date) {
  return DateTime.fromJSDate(a).hasSame(DateTime.fromJSDate(b), "day");
}