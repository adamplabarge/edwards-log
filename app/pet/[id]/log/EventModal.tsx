"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { EventType } from "@/app/pet/types/EventType.type";
import EventForm from "./EventForm";
import { DateTime } from "luxon";
import { ArrowPathIcon } from "@heroicons/react/24/outline";

type Props = {
  petId: string;
  event?: any | null;
  onClose: () => void;
};

export default function EventModal({ petId, event, onClose }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [eventType, setEventType] = useState<EventType>(
    event?.eventType ?? "seizure"
  );
  const [notes, setNotes] = useState(event?.notes ?? "");
  const [date, setDate] = useState<string>(
    event?.date
      ? DateTime.fromISO(event.date, { zone: "utc" })
          .toLocal()
          .toFormat("yyyy-MM-dd'T'HH:mm")
      : DateTime.now().toLocal().toFormat("yyyy-MM-dd'T'HH:mm")
  );
  const [endDate, setEndDate] = useState<string>(
    event?.endDate
      ? DateTime.fromISO(event.endDate, { zone: "utc" })
          .toLocal()
          .toFormat("yyyy-MM-dd'T'HH:mm")
      : DateTime.now().toLocal().toFormat("yyyy-MM-dd'T'HH:mm")
  );
  const [dynamicFields, setDynamicFields] = useState<any>(() => {
    const copy = { ...event };
    delete copy.notes;
    delete copy.eventType;
    delete copy.date;
    delete copy.endDate;
    delete copy.id;
    return copy;
  });

  async function save() {
    setLoading(true);

    const utcDate = DateTime.fromFormat(date, "yyyy-MM-dd'T'HH:mm", {
      zone: "local",
    })
      .toUTC()
      .toISO();

    if (utcDate !== null && !DateTime.fromISO(utcDate).isValid) {
      alert("Invalid date");
      setLoading(false);
      return;
    }

    const res = await fetch(`/api/pet/${petId}/events`, {
      method: event ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: event?.id,
        eventType,
        date: utcDate,
        ...(eventType === "activity" && {
          endDate: DateTime.fromFormat(endDate, "yyyy-MM-dd'T'HH:mm", {
            zone: "local",
          })
            .toUTC()
            .toISO(),
        }),
        notes,
        ...dynamicFields,
      }),
    });

    if (!res.ok) {
      alert("Failed to save event");
      setLoading(false);
      return;
    }

    router.refresh();
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-900 rounded w-full max-w-md p-6 space-y-4">
        <h2 className="text-lg font-semibold">
          {event ? "Edit Event" : "Create Event"}
        </h2>

        {/* Event type */}
        {!event && (
          <select
            value={eventType}
            onChange={(e) => setEventType(e.target.value as EventType)}
            className="w-full border rounded p-2 bg-white text-black dark:bg-gray-900 dark:text-white dark:[color-scheme:dark]"
          >
            <option value="seizure">Seizure</option>
            <option value="feeding">Feeding</option>
            <option value="medication">Medication</option>
            <option value="activity">Activity</option>
            <option value="change">Change</option>
          </select>
        )}

        {/* Dynamic form */}
        <EventForm
          eventType={eventType}
          value={dynamicFields}
          onChange={setDynamicFields}
        />

        {/* Date */}
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Event date & time
          </label>
          <input
            type="datetime-local"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full border rounded p-2 bg-white text-black dark:bg-gray-900 dark:text-white dark:[color-scheme:dark]"
          />
        </div>

        {eventType === "activity" && (
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              End date & time
            </label>
            <input
              type="datetime-local"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full border rounded p-2 bg-white text-black dark:bg-gray-900 dark:text-white dark:[color-scheme:dark]"
            />
          </div>
        )}

        {/* Notes */}
        <textarea
          placeholder="Notes (optional)"
          className="w-full border rounded p-2"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />

        {/* Actions */}
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-3 py-1 border rounded">
            Cancel
          </button>
          <button
            onClick={save}
            disabled={loading}
            className="px-3 py-1 rounded bg-blue-600 text-white"
          >
            {loading ? (
              <>
                <ArrowPathIcon className="h-4 w-4 animate-spin" />
                Saving…
              </>
            ) : (
              "Save"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
