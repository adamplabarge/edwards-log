"use client";

import { useState, useEffect } from "react";
import { DateTime } from "luxon";
import { Pet } from "@/prisma/generated/client";
import SeizureScatterChart from "@/app/components/Charts/SeizureScatterChart";
import SeizureRiskHistogram from "@/app/components/Charts/SeirzuresRiskHistogram";
import {
  SeizureEvent,
  FeedingEvent,
  MedicationEvent,
  ChangeLine,
} from "@/prisma/generated/client";
import Link from 'next/link';

type petWithRelations = {
  seizureEvents: SeizureEvent[];
  feedingEvents: FeedingEvent[];
  medicationEvents: MedicationEvent[];
  changeLines: ChangeLine[];
} & Pet;

type PetViewProps = {
  pet: petWithRelations;
  hideShare?: boolean;
};

export function PetView({ pet, hideShare }: PetViewProps) {
  const [shareUrl, setShareUrl] = useState<string | null>(null);

  const [startDate, setStartDate] = useState(
    DateTime.now().minus({ months: 3 }).toISODate()
  );
  const [endDate, setEndDate] = useState(DateTime.now().toISODate());

  useEffect(() => {
    async function fetchShareLink() {
      const res = await fetch(`/api/pet/${pet.id}/share`);
      if (res.ok) {
        const data = await res.json();
        setShareUrl(data.shareUrl);
      }
    }
    if (!hideShare) fetchShareLink();
  }, [pet.id]);

  const resetDates = () => {
    setStartDate("");
    setEndDate("");
  };

  const last3Months = () => {
    setStartDate(DateTime.now().minus({ months: 3 }).toISODate());
    setEndDate(DateTime.now().toISODate());
  };

  const last30Days = () => {
    setStartDate(DateTime.now().minus({ months: 1 }).toISODate());
    setEndDate(DateTime.now().toISODate());
  };

  const createShareLink = async () => {
    const res = await fetch(`/api/pet/${pet.id}/share`, { method: "POST" });
    const data = await res.json();
    if (res.ok) setShareUrl(data.shareUrl);
    else alert(data.error);
  };

  return (
    <main className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Breadcrumb */}
      {!hideShare && (
        <nav className="text-gray-500 text-sm">
          <Link href="/dashboard" className="hover:underline">
            Dashboard
          </Link>{" "}
          / <span className="text-gray-700 font-medium">{pet.name}</span>
        </nav>
      )}

      {/* Pet info */}
      <section className="space-y-2">
        <h1 className="text-3xl font-bold">{pet.name}</h1>
      </section>

      {/* Share Link Button */}
      {!hideShare && (
        <section>
          {shareUrl ? (
            <div className="mt-2">
              <input
                type="text"
                readOnly
                value={window.location.origin + shareUrl}
                className="border p-1 w-full"
              />
              <button
                onClick={() =>
                  navigator.clipboard.writeText(
                    window.location.origin + shareUrl
                  )
                }
                className="mt-1 px-3 py-1 border rounded"
              >
                Copy Link
              </button>
            </div>
          ) : (
            <button
              className="px-3 py-1 border rounded"
              onClick={createShareLink}
            >
              Generate Share Link
            </button>
          )}
        </section>
      )}

      {/* Date filters */}
      <section className="flex flex-wrap gap-4 items-center">
        <label>
          Start:{" "}
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </label>
        <label>
          End:{" "}
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </label>

        <button
          disabled={!startDate && !endDate}
          className="px-3 py-1 border rounded"
          onClick={resetDates}
        >
          Show whole timeline
        </button>
        <button className="px-3 py-1 border rounded" onClick={last3Months}>
          Last 3 months
        </button>
        <button className="px-3 py-1 border rounded" onClick={last30Days}>
          Last 30 days
        </button>
      </section>

      {/* Charts */}
      <section className="space-y-12">
        <div className="w-full overflow-x-auto">
          <SeizureScatterChart
            startDate={startDate}
            endDate={endDate}
            seizureData={pet.seizureEvents}
            medicationData={pet.medicationEvents}
            feedingData={pet.feedingEvents}
            changeLines={pet.changeLines}
          />
        </div>

        <div className="flex flex-wrap justify-between gap-4">
          <div className="flex-[calc(50%-1rem)]">
            <SeizureRiskHistogram
              startDate={startDate}
              endDate={endDate}
              mode="feeding"
              seizureData={pet.seizureEvents}
              medicationData={pet.medicationEvents}
              feedingData={pet.feedingEvents}
            />
          </div>
          <div className="flex-[calc(50%-1rem)]">
            <SeizureRiskHistogram
              startDate={startDate}
              endDate={endDate}
              mode="medication"
              seizureData={pet.seizureEvents}
              medicationData={pet.medicationEvents}
              feedingData={pet.feedingEvents}
            />
          </div>
        </div>
      </section>
    </main>
  );
}
