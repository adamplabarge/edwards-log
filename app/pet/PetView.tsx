"use client";

import { useState } from "react";
import { DateTime } from "luxon";
import SeizureScatterChart from "@/app/components/Charts/SeizureScatterChart";
import SeizureRiskHistogram from "@/app/components/Charts/SeirzuresRiskHistogram";
import Link from "next/link";
import { ClipboardIcon } from "@heroicons/react/24/outline";
import type { PetWithRelations } from "./types/PetWithRelations.type";

type PetViewProps = {
  pet: PetWithRelations;
  hideShare?: boolean;
  shareLink?: string | null;
};

export function PetView({ pet, hideShare = true, shareLink = null }: PetViewProps) {
  const [shareUrl, setShareUrl] = useState<string | null>(shareLink);

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

      {/* Share Link Button */}
      {!hideShare && (
        <section>
          {shareUrl ? (
            <>
              Share Link:
              <div className="mt-2 flex items-center gap-2">
                <button
                  onClick={() =>
                    navigator.clipboard.writeText(
                      window.location.origin + `/pet/share/${shareUrl}`
                    )
                  }
                  className="p-2 rounded border hover:bg-gray-100 transition"
                  title="Copy link"
                  aria-label="Copy share link"
                >
                  <ClipboardIcon className="h-5 w-5 text-gray-600" />
                </button>

                <input
                  type="text"
                  readOnly
                  value={window.location.origin + `/pet/share/${shareUrl}`}
                  className="flex-1 border rounded px-2 py-1 text-sm"
                />
              </div>
            </>
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
    </main>
  );
}
