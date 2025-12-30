"use client";

import { useMemo } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  TimeScale,
  Tooltip,
  Legend,
  type ChartOptions,
} from "chart.js";
import "chartjs-adapter-luxon";
import { DateTime } from "luxon";
import { SeizureEvent } from "@/prisma/generated/client";
import { usePrefersDark } from "@/app/hooks/usePrefersDark";

ChartJS.register(
  LinearScale,
  PointElement,
  LineElement,
  TimeScale,
  Tooltip,
  Legend
);

type Props = {
  seizureData: SeizureEvent[];
  windowDays?: number; // Rolling window in days
  startDate?: string;
  endDate?: string;
};

export function SeizureRollingFrequencyChart({
  seizureData,
  windowDays = 7,
  startDate,
  endDate,
}: Props) {
  const prefersDark = usePrefersDark();

  const data = useMemo(() => {
    if (!seizureData.length) return { labels: [], datasets: [] };

    // Sort seizures
    const sorted = [...seizureData].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    // Determine chart range
    const start = startDate
      ? DateTime.fromISO(startDate).startOf("day")
      : DateTime.fromISO(sorted[0].date.toISOString()).startOf("day");

    const end = endDate
      ? DateTime.fromISO(endDate).endOf("day")
      : DateTime.fromISO(sorted[sorted.length - 1].date.toISOString()).endOf(
          "day"
        );

    // Generate each day in range
    const days: DateTime[] = [];
    for (let dt = start; dt <= end; dt = dt.plus({ days: 1 })) {
      days.push(dt);
    }

    // Compute rolling count
    const counts = days.map((day) => {
      const windowStart = day.minus({ days: windowDays });
      const count = sorted.filter((s) => {
        const sDate = DateTime.fromISO(s.date.toISOString());
        return sDate > windowStart && sDate <= day.endOf("day");
      }).length;
      return count;
    });

    return {
      labels: days.map((d) => d.toJSDate()),
      datasets: [
        {
          label: `Seizures in last ${windowDays} days`,
          data: counts,
          borderColor: prefersDark ? "#ff4d4f" : "#e11d48",
          backgroundColor: prefersDark
            ? "rgba(255, 77, 79, 0.3)"
            : "rgba(241, 19, 68, 0.2)",
          tension: 0.2,
        },
      ],
    };
  }, [seizureData, windowDays, startDate, endDate, prefersDark]);

  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: "time",
        time: { unit: "day" },
        title: {
          display: true,
          text: "Date",
          color: prefersDark ? "#e0e0e0" : "#111",
        },
        ticks: { color: prefersDark ? "#e0e0e0" : "#111" },
        grid: {
          color: prefersDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)",
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Seizures",
          color: prefersDark ? "#e0e0e0" : "#111",
        },
        ticks: { color: prefersDark ? "#e0e0e0" : "#111", precision: 0 },
        grid: {
          color: prefersDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)",
        },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          title: (items) =>
            items[0].parsed.x
              ? DateTime.fromJSDate(new Date(items[0].parsed.x)).toFormat("DDD")
              : "",
          label: (ctx) =>
            `${ctx.parsed.y} seizures in the previous ${windowDays} days`,
          afterLabel: () => "Each point includes seizures from earlier days",
        },
      },

      legend: { labels: { color: prefersDark ? "#e0e0e0" : "#111" } },
    },
  };

  return (
    <div style={{ width: "100%", height: "300px" }}>
      <Line data={data as any} options={options} />
    </div>
  );
}
