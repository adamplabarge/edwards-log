"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Pet } from "@/prisma/generated/client";

type LogEventViewProps = {
  pet: Pet;
};

export default function LogEventView({ pet }: LogEventViewProps) {
  const router = useRouter();
  const [notes, setNotes] = useState("");
  const [feedingType, setFeedingType] = useState("");
  const [changeLabel, setChangeLabel] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(eventType: string, extra: Record<string, any> = {}) {
    setLoading(true);

    const res = await fetch(`/api/pet/${pet.id}/events`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        eventType,
        notes,
        ...extra,
      }),
    });

    if (!res.ok) {
      alert("Failed to log event");
    }

    setNotes("");
    setLoading(false);
    router.refresh(); // update charts
  }

  return (
    <main className="max-w-xl mx-auto p-6 space-y-6">
      {/* Breadcrumb */}
      <nav className="text-gray-500 text-sm">
        <Link href="/dashboard" className="hover:underline">
          Dashboard
        </Link>{" "}
        / <span className="text-gray-700 font-medium">{pet.name}</span>
      </nav>
      <h1 className="text-2xl font-bold">Log Event for {pet.name}</h1>
      <section className="space-y-6">
        {/* Notes */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Notes (optional)
          </label>
          <textarea
            placeholder="Anything notable…"
            className="w-full border rounded p-3 text-sm bg-white dark:bg-gray-900 text-black dark:text-white focus:outline-none focus:ring"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
          />
        </div>

        {/* Seizure */}
        <button
          className="w-full rounded p-3 font-semibold
               bg-red-600 text-white
               hover:bg-red-700
               disabled:bg-red-300 disabled:cursor-not-allowed"
          disabled={loading}
          onClick={() => submit("seizure")}
        >
          Log Seizure
        </button>

        {/* Feeding */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Feeding type
          </label>

          <select
            value={feedingType}
            onChange={(e) => setFeedingType(e.target.value)}
            className="w-full border rounded p-3 text-sm bg-white dark:bg-gray-900 text-black dark:text-white focus:outline-none focus:ring"
          >
            <option value="">Select feeding type</option>
            <option value="kibble">Kibble</option>
            <option value="fresh">Fresh</option>
            <option value="treat">Treat</option>
          </select>

          <button
            className="w-full rounded p-3 font-semibold
         bg-green-600 text-black
         hover:bg-green-700
         disabled:bg-green-300 disabled:cursor-not-allowed"
            disabled={!feedingType || loading}
            onClick={() => submit("feeding", { type: feedingType })}
          >
            Log Feeding
          </button>
        </div>

        {/* Medication */}
        <button
          className="w-full rounded p-3 font-semibold
               bg-blue-600 text-white
               hover:bg-blue-700
               disabled:bg-blue-300 disabled:cursor-not-allowed"
          disabled={loading}
          onClick={() => submit("medication")}
        >
          Log Medication
        </button>

        {/* Change */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Change description
          </label>
          <input
            placeholder="e.g. dosage increased"
            className="w-full border rounded p-3 text-sm bg-white dark:bg-gray-900 text-black dark:text-white focus:outline-none focus:ring"
            value={changeLabel}
            onChange={(e) => setChangeLabel(e.target.value)}
          />
          <button
            className="w-full rounded p-3 font-semibold
                 bg-yellow-500 text-black
                 hover:bg-yellow-600
                 disabled:bg-yellow-300 disabled:cursor-not-allowed"
            disabled={!changeLabel || loading}
            onClick={() => submit("change", { label: changeLabel })}
          >
            Log Change
          </button>
        </div>
      </section>
    </main>
  );
}
