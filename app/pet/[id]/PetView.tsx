"use client";

import { useState } from "react";
import { DateTime } from "luxon";
import { Pet } from "@/prisma/generated/client";
import SeizureScatterChart from "@/app/components/Charts/SeizureScatterChart";
import SeizureRiskHistogram from "@/app/components/Charts/SeirzuresRiskHistogram";
import { SeizureEvent, FeedingEvent, MedicationEvent, ChangeLine } from "@/prisma/generated/client";

type petWithRelations = {
  seizureEvents: SeizureEvent[]
  feedingEvents: FeedingEvent[]
  medicationEvents: MedicationEvent[]
  changeLines: ChangeLine[]
} & Pet;

type PetViewProps = {
  pet: petWithRelations;
};

export function PetView({ pet }: PetViewProps) {
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
      {/* Pet info */}
      <section className="space-y-2">
        <h1 className="text-3xl font-bold">{pet.name}</h1>
        <p className="text-gray-600">
          Type: <span className="font-medium">{pet.type}</span>
        </p>
        {pet.notes && (
          <p className="border rounded p-3">{pet.notes}</p>
        )}
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
          <SeizureScatterChart startDate={startDate} endDate={endDate} seizureData={pet.seizureEvents} medicationData={pet.medicationEvents} feedingData={pet.feedingEvents} changeLines={pet.changeLines} />
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
