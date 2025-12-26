"use client";

import { UnifiedEvent } from "@/app/pet/types/UnifiedEvent.type";

type EventFilter = UnifiedEvent["eventType"];

type Props = {
  availableFilters: EventFilter[];
  activeFilters: Set<EventFilter>;
  onToggle: (filter: EventFilter) => void;
  onClear?: () => void;
  colors: Record<EventFilter, string>;
};

export default function EventFilters({
  availableFilters,
  activeFilters,
  onToggle,
  onClear,
  colors,
}: Props) {
  if (availableFilters.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2 mb-4">
      {availableFilters.map((filter) => {
        const isActive = activeFilters.has(filter);

        return (
          <button
            key={filter}
            onClick={() => onToggle(filter)}
            className={`px-3 py-1 rounded-full text-sm border transition
              ${isActive
                ? "text-white"
                : "bg-transparent text-gray-700 dark:text-gray-300"}
            `}
            style={{
              backgroundColor: isActive ? colors[filter] : "transparent",
              borderColor: colors[filter],
            }}
          >
            {filter}
          </button>
        );
      })}

      {activeFilters.size > 0 && onClear && (
        <button
          onClick={onClear}
          className="ml-2 text-sm text-gray-500 hover:underline"
        >
          Clear
        </button>
      )}
    </div>
  );
}
