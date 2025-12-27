"use client";

import { useState, memo } from "react";
import { SeizureRollingFrequencyChart } from "../components/Charts/SeizureRollingFrequencyChart";
import { InfoPopover } from "@/app/components/InfoPopover/InfoPopover";

type Props = {
  seizureData: { id: string; petId: string; date: Date; notes: string | null; createdAt: Date; }[];
  startDate?: string;
  endDate?: string;
};

function SeizureRollingFrequencySectionBase({ seizureData, startDate, endDate }: Props) {
  const [windowDays, setWindowDays] = useState(7);
  const options = [7, 14, 21];

  return (
    <div className="space-y-2">
      <div className="flex flex-col items-start mb-4">
        <h3 className="text-lg font-semibold">Seizure Rolling Frequency</h3>
        <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-300">
          <span>How to read this chart</span>
          <InfoPopover content={`This chart shows your pet’s seizure activity over time. The horizontal axis is the date range you’ve selected, and the vertical axis shows how many seizures occurred in the preceding ${windowDays} days, helping highlight periods of higher activity.`} />
        </div>
      </div>

      {/* Window selector */}
      <div className="flex gap-2 text-xs">
        {options.map((days) => (
          <button
            key={days}
            onClick={() => setWindowDays(days)}
            className={`px-2 py-1 rounded ${
              windowDays === days
                ? "bg-blue-600 text-white hover:bg-blue-800"
                : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-700"
            }`}
          >
            {days} days
          </button>
        ))}
      </div>

      {/* Chart */}
      <div className="w-full overflow-x-auto">
        <SeizureRollingFrequencyChart
          seizureData={seizureData}
          windowDays={windowDays}
          startDate={startDate}
          endDate={endDate}
        />
      </div>
    </div>
  );
}

export const SeizureRollingFrequencySection = memo(SeizureRollingFrequencySectionBase);