"use client";

import { SeizureClustersCard } from "@/app/pet/components/PetView/SeizureClusterCard";
import { SeizureFrequencySection } from "@/app/pet/components/PetView/SeizureFrequencySection";
import { TimeSinceLastSeizure } from "@/app/pet/components/PetView/TimeSinceLastSeizure";
import type { PetWithRelations } from "@/app/pet/types/PetWithRelations.type";
import { DateTime } from "luxon";
import Link from "next/link";
import { useState } from "react";
import { SeizureFreeSection } from "./SeizureFreeSection";
import { SeizureRiskSection } from "./SeizureRiskSection";
import { SeizureTimelineSection } from "./SeizureTimelineSection";
import { SeizureTimeOfDaySection } from "./SeizureTimeOfDaySection";
import { ShareLinkSection } from "./ShareLinkSection";

type Props = {
  pet: PetWithRelations;
  hideShare?: boolean;
  shareLink?: string | null;
};

export function PetView({
  pet,
  hideShare = true,
  shareLink = null,
}: Props) {

  const [startDate, setStartDate] = useState(
    DateTime.now().minus({ months: 3 }).toISODate()
  );
  const [endDate, setEndDate] = useState(DateTime.now().toISODate());

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

  return (
    <main className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Breadcrumb */}
      {!hideShare && (
        <nav className="text-gray-500 text-sm">
          <Link href="/dashboard" className="hover:underline">
            Dashboard
          </Link>{" "}
          / <span className="text-gray-700 font-medium">Charts</span>
        </nav>
      )}

      {/* Pet info */}
      <section className="space-y-2">
        <h1 className="text-3xl font-bold">{pet.name}</h1>
      </section>

      <SeizureClustersCard seizures={pet.seizureEvents} />
      <TimeSinceLastSeizure seizures={pet.seizureEvents} />

      {/* Date filters */}
      <section className="flex flex-wrap gap-4 items-center border-b py-4 border-t">
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

      <SeizureFreeSection 
        pet={pet}
        startDate={startDate}
        endDate={endDate}
      />

      <SeizureTimelineSection
        pet={pet}
        startDate={startDate}
        endDate={endDate}
      />
      
      <SeizureTimeOfDaySection
        pet={pet}
        startDate={startDate}
        endDate={endDate}
      />

      <SeizureFrequencySection
        pet={pet}
        startDate={startDate}
        endDate={endDate}
      />
      
      <SeizureRiskSection
        pet={pet}
        startDate={startDate}
        endDate={endDate}
      />

      {/* Share Link Button */}
      {!hideShare && (
        <ShareLinkSection
          shareLink={shareLink}
          petId={pet.id}
        />
      )}
    </main>
  );
}
