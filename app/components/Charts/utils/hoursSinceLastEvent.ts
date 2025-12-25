import { DateTime } from "luxon";

type DatedEvent = { date: string };

export function hoursSinceLastEvent(
  eventTimeISO: string,
  events: DatedEvent[]
): number | null {
  const eventTime = DateTime.fromISO(eventTimeISO);

  const priorEvents = events
    .map(e => DateTime.fromISO(e.date))
    .filter(dt => dt <= eventTime)
    .sort((a, b) => b.toMillis() - a.toMillis());

  if (priorEvents.length === 0) return null;

  return eventTime.diff(priorEvents[0], "hours").hours;
}
