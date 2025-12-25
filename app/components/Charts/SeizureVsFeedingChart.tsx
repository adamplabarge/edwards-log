import { Scatter } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  Tooltip,
  type ChartOptions,
} from "chart.js";
import { DateTime } from "luxon";
import { SeizureEvent, FeedingEvent } from "@/prisma/generated/client";
import { hoursSinceLastEvent } from "./utils/hoursSinceLastEvent";
import { isWithinRange } from "./utils/isWithInRange";
import { usePrefersDark } from "@/app/hooks/usePrefersDark";

ChartJS.register(LinearScale, PointElement, Tooltip);

type Props = {
  startDate?: string;
  endDate?: string;
  seizureData?: SeizureEvent[];
  feedingData?: FeedingEvent[];
};

export default function SeizureVsFeedingChart({ startDate, endDate, seizureData = [], feedingData = [] }: Props) {
  const prefersDark = usePrefersDark();
  const textColor = prefersDark ? "#e0e0e0" : "#111";
  const gridColor = prefersDark
    ? "rgba(255,255,255,0.15)"
    : "rgba(0,0,0,0.15)";

  const points = seizureData
    .filter(s => isWithinRange(s.date.toISOString(), startDate, endDate))
    .map(s => {
      const hoursSinceFood = hoursSinceLastEvent(
        s.date.toISOString(),
        feedingData.map(f => ({ ...f, date: f.date.toISOString() }))
      );

      if (hoursSinceFood === null) return null;

      return {
        x: hoursSinceFood,
        y: DateTime.fromISO(s.date.toISOString()).toMillis(),
        notes: s.notes ?? null,
      };
    })
    .filter(Boolean) as any[];

  const data = {
    datasets: [
      {
        label: "Seizures",
        data: points,
        pointRadius: 6,
        backgroundColor: "#ff6666",
      },
    ],
  };

  const options: ChartOptions<"scatter"> = {
    scales: {
      x: {
        title: {
          display: true,
          text: "Hours Since Last Feeding",
          color: textColor,
        },
        grid: { color: gridColor },
        ticks: { color: textColor },
      },
      y: {
        display: false,
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: ctx => {
            const raw = ctx.raw as any;
            return [
              `Hours since food: ${ctx.parsed.x !== null && ctx.parsed.x !== undefined ? ctx.parsed.x.toFixed(2) : "N/A"}`,
              new Date(raw.y).toLocaleString(),
              raw.notes ?? "",
            ];
          },
        },
      },
      legend: {
        labels: { color: textColor },
      },
    },
  };

  return (
    <Scatter
      data={data}
      options={options}
      style={{ width: "100%", height: "400px" }}
    />
  );
}
