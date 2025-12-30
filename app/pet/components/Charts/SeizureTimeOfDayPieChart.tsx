"use client";

import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  type ChartOptions,
} from "chart.js";
import { DateTime } from "luxon";
import { SeizureEvent } from "@/prisma/generated/client";
import { usePrefersDark } from "@/app/hooks/usePrefersDark";

ChartJS.register(ArcElement, Tooltip, Legend);

type Props = {
  seizureData: SeizureEvent[];
  startDate?: string;
  endDate?: string;
};

export function SeizureTimeOfDayPieChart({
  seizureData,
  startDate,
  endDate,
}: Props) {
  const prefersDark = usePrefersDark();

  // ----------------------------------------
  // Filter seizures to selected time window
  // ----------------------------------------
  const filteredSeizures = seizureData.filter((s) => {
    const dt = DateTime.fromISO(s.date.toISOString());

    if (startDate && dt < DateTime.fromISO(startDate).startOf("day"))
      return false;
    if (endDate && dt > DateTime.fromISO(endDate).endOf("day"))
      return false;

    return true;
  });

  if (!filteredSeizures.length) {
    return (
      <div className="text-sm text-gray-500">
        No seizure data in the selected time range.
      </div>
    );
  }

  // ----------------------------------------
  // Count seizures per time-of-day bucket
  // ----------------------------------------
  const counts = { morning: 0, midday: 0, night: 0 };

  filteredSeizures.forEach((s) => {
    const dt = DateTime.fromISO(s.date.toISOString());
    const hour = dt.hour;

    if (hour >= 5 && hour < 11) counts.morning++;
    else if (hour >= 11 && hour < 17) counts.midday++;
    else counts.night++;
  });

  // ----------------------------------------
  // Chart data
  // ----------------------------------------
  const data = {
    labels: ["Morning (5–11)", "Midday (11–17)", "Night (17–5)"],
    datasets: [
      {
        data: [counts.morning, counts.midday, counts.night],
        backgroundColor: ["#facc15", "#3b82f6", "#9333ea"],
        borderColor: prefersDark ? "#1f2937" : "#fff",
        borderWidth: 2,
      },
    ],
  };

  // ----------------------------------------
  // Chart options
  // ----------------------------------------
  const options: ChartOptions<"pie"> = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: prefersDark ? "#e0e0e0" : "#111",
        },
      },
      tooltip: {
        callbacks: {
          label: function (ctx: any) {
            const value = ctx.parsed;
            const total = ctx.chart._metasets[ctx.datasetIndex].total;
            const percent = ((value / total) * 100).toFixed(1);
            return `${ctx.label}: ${value} seizures (${percent}%)`;
          },
        },
      },
    },
  };

  // ----------------------------------------
  // Render
  // ----------------------------------------
  return (
    <div style={{ width: "100%", maxWidth: "280px", margin: "0 auto" }}>
      <Pie data={data} options={options} />
    </div>
  );
}
