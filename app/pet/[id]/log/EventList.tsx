import { PetWithRelations } from "@/app/pet/types/PetWithRelations.type";
import { UnifiedEvent } from "@/app/pet/types/UnifiedEvent.type";
import { DateTime } from "luxon";
import { useState } from "react";
import EventFilters from "./EventFilters";
import { getEventColor, isSameDay } from "./utils";
import { EVENT_COLORS } from "@/app/pet/constants";

type Props = {
  pet: PetWithRelations;
  onEdit: (event: UnifiedEvent) => void;
};

export default function EventList({ pet, onEdit }: Props) {
  const [activeFilters, setActiveFilters] = useState<
    Set<UnifiedEvent["eventType"]>
  >(() => new Set());

  function toggleFilter(filter: UnifiedEvent["eventType"]) {
    setActiveFilters((prev) => {
      const next = new Set(prev);
      next.has(filter) ? next.delete(filter) : next.add(filter);
      return next;
    });
  }

  function clearFilters() {
    setActiveFilters(new Set());
  }

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

  const availableFilters = Array.from(new Set(events.map((e) => e.eventType)));

  const filteredEvents =
    activeFilters.size === 0
      ? events
      : events.filter((e) => activeFilters.has(e.eventType));

  return (
    <>
      {(events.length === 0 && (
        <p className="text-sm text-gray-500">No events logged yet.</p>
      )) || (
        <div className="space-y-4">
          {(filteredEvents.length === 0 && (
            <p className="text-sm text-gray-500">
              No events match the filters.
            </p>
          )) || (
            <div>
              <EventFilters
                availableFilters={availableFilters}
                activeFilters={activeFilters}
                onToggle={toggleFilter}
                onClear={clearFilters}
                colors={EVENT_COLORS}
              />

              <ul className="space-y-2">
                {filteredEvents.map((event, index) => {
                  const prev = filteredEvents[index - 1];
                  const isNewDay =
                    !prev ||
                    !isSameDay(new Date(event.date), new Date(prev.date));

                  return (
                    <li key={`${event.eventType}-${event.id}`}>
                      {/* Day header */}
                      {isNewDay && (
                        <div className="mt-6 mb-2 text-xs font-medium text-gray-500 uppercase tracking-wide">
                          {DateTime.fromJSDate(
                            new Date(event.date)
                          ).toLocaleString(DateTime.DATE_FULL)}
                        </div>
                      )}

                      {/* Event item */}
                      <div
                        className="border-l-4 rounded p-3 flex gap-4"
                        style={{ borderColor: getEventColor(event) }}
                      >
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center gap-2 text-sm">
                            <span className="font-medium capitalize">
                              {event.eventType}
                              {event.eventType === "feeding" &&
                              event.feedingType
                                ? ` (${event.feedingType})`
                                : ""}
                            </span>
                            <span className="text-gray-400">·</span>
                            <span className="text-gray-500">
                              {DateTime.fromJSDate(
                                new Date(event.date)
                              ).toLocaleString(DateTime.DATETIME_MED)}
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
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
      )}
    </>
  );
}
