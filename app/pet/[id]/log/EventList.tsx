import { PetWithRelations } from "@/app/pet/types/PetWithRelations.type";
import { UnifiedEvent } from "@/app/pet/types/UnifiedEvent.type";
import { DateTime } from "luxon";

type Props = {
  pet: PetWithRelations;
  onEdit: (event: UnifiedEvent) => void;
};

const EVENT_COLORS: Record<
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

function getEventColor(event: UnifiedEvent) {
  if (event.eventType === "feeding" && event.feedingType) {
    const feedingKey =
      `feeding:${event.feedingType}` as keyof typeof EVENT_COLORS;
    return EVENT_COLORS[feedingKey] || EVENT_COLORS.feeding;
  }
  return EVENT_COLORS[event.eventType];
}

export default function EventList({ pet, onEdit }: Props) {
  
  const events: UnifiedEvent[] = [
    ...pet.seizureEvents.map((e) => ({
      id: e.id,
      eventType: "seizure" as const,
      date: e.date.toISOString(),
      notes: e.notes ?? undefined,
    })),

    ...pet.feedingEvents.map((e) => ({
      id: e.id,
      eventType: "feeding" as const,
      date: e.date.toISOString(),
      notes: e.notes ?? undefined,
      feedingType: e.type,
    })),

    ...pet.medicationEvents.map((e) => ({
      id: e.id,
      eventType: "medication" as const,
      date: e.date.toISOString(),
      notes: e.notes ?? undefined,
    })),

    ...pet.changeLines.map((e) => ({
      id: e.id,
      eventType: "change" as const,
      date: e.date.toISOString(),
      changeLabel: e.label,
    })),
  ]
    // newest first
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  if (events.length === 0) {
    return <p className="text-sm text-gray-500">No events logged yet.</p>;
  }

  return (
    <ul className="space-y-2">
      {events.map((event) => (
        <li
          key={`${event.eventType}-${event.id}`}
          className="border-l-4 rounded p-3 flex gap-4"
          style={{ borderColor: getEventColor(event) }}
        >
          
          <div className="flex-1 space-y-1">
            <div className="flex items-center gap-2 text-sm">
              <span className="font-medium capitalize">
                {event.eventType}
                {event.eventType === "feeding" && event.feedingType
                  ? ` (${event.feedingType})`
                  : ""}
              </span>
              <span className="text-gray-400">·</span>
              <span className="text-gray-500">
                {DateTime.fromJSDate(new Date(event.date)).toLocaleString(
                  DateTime.DATETIME_MED
                )}
              </span>
            </div>

            {event.changeLabel && (
              <div className="text-sm">{event.changeLabel}</div>
            )}

            {event.notes && (
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {event.notes}
              </div>
            )}
          </div>
          <button
            onClick={() => onEdit(event)}
            className="text-blue-600 hover:underline text-sm shrink-0"
          >
            Edit
          </button>
        </li>
      ))}
    </ul>
  );
}
