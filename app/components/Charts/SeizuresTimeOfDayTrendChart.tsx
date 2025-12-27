"use client";

import { Scatter } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  Tooltip,
  type ChartOptions,
} from "chart.js";
import { DateTime } from "luxon";
import { SeizureEvent } from "@/prisma/generated/client";
import { usePrefersDark } from "@/app/hooks/usePrefersDark";
import { EVENT_COLORS } from "@/app/pet/constants";

ChartJS.register(LinearScale, PointElement, Tooltip);

type Props = {
  seizureData: SeizureEvent[];
  startDate?: string;
  endDate?: string;
};

export function SeizureTimeOfDayTrendChart({
  seizureData,
  startDate,
  endDate,
}: Props) {
  const prefersDark = usePrefersDark();

  // ----------------------------------------
  // Filter to selected time window
  // ----------------------------------------
  const filteredSeizures = seizureData.filter((s) => {
    const dt = DateTime.fromISO(s.date.toISOString());

    if (startDate && dt < DateTime.fromISO(startDate).startOf("day"))
      return false;
    if (endDate && dt > DateTime.fromISO(endDate).endOf("day"))
      return false;

    return true;
  });

  // ----------------------------------------
  // Convert to time-of-day scatter points
  // ----------------------------------------
  const points = filteredSeizures.map((s) => {
    const dt = DateTime.fromISO(s.date.toISOString());
    const hourFraction = dt.hour + dt.minute / 60;

    return {
      x: hourFraction,
      y: 1,
      notes: s.notes ?? null,
      date: dt.toLocaleString(DateTime.DATETIME_MED),
    };
  });

  const textColor = prefersDark ? "#e0e0e0" : "#111";
  const gridColor = prefersDark
    ? "rgba(255,255,255,0.15)"
    : "rgba(0,0,0,0.15)";

  // ----------------------------------------
  // Chart data
  // ----------------------------------------
  const data = {
    datasets: [
      {
        label: "Seizures",
        data: points,
        pointRadius: 6,
        backgroundColor: EVENT_COLORS.seizure,
        pointBorderColor: EVENT_COLORS.seizure,
      },
    ],
  };

  // ----------------------------------------
  // Chart options
  // ----------------------------------------
  const options: ChartOptions<"scatter"> = {
    maintainAspectRatio: false,
    scales: {
      x: {
        type: "linear",
        min: 0,
        max: 24,
        title: {
          display: true,
          text: "Time of Day",
          color: textColor,
        },
        ticks: {
          color: textColor,
          callback: (value) => {
            const hour = Math.floor(Number(value));
            const minutes = Math.round((Number(value) - hour) * 60);
            return `${hour}:${minutes.toString().padStart(2, "0")}`;
          },
        },
        grid: {
          color: gridColor,
        },
      },
      y: {
        display: false,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
        external(context) {
          const { chart, tooltip } = context;

          let tooltipEl = document.getElementById(
            "time-of-day-tooltip"
          ) as HTMLDivElement | null;

          if (!tooltipEl) {
            tooltipEl = document.createElement("div");
            tooltipEl.id = "time-of-day-tooltip";
            tooltipEl.style.position = "absolute";
            tooltipEl.style.pointerEvents = "none";
            tooltipEl.style.background = "rgba(0,0,0,0.8)";
            tooltipEl.style.color = "white";
            tooltipEl.style.padding = "8px 10px";
            tooltipEl.style.borderRadius = "6px";
            tooltipEl.style.fontSize = "14px";
            tooltipEl.style.lineHeight = "1.4";
            tooltipEl.style.maxWidth = "220px";
            document.body.appendChild(tooltipEl);
          }

          if (tooltip.opacity === 0) {
            tooltipEl.style.opacity = "0";
            return;
          }

          const dp = tooltip.dataPoints[0];
          const raw = dp.raw as any;

          tooltipEl.innerHTML =
            `<b>Seizure</b><br/>` +
            `${raw.date}` +
            (raw.notes ? `<br/>${raw.notes}` : "");

          const rect = chart.canvas.getBoundingClientRect();
          tooltipEl.style.left = rect.left + tooltip.caretX + "px";
          tooltipEl.style.top = rect.top + tooltip.caretY + "px";
          tooltipEl.style.opacity = "1";
        },
      },
    },
  };

  // ----------------------------------------
  // Render
  // ----------------------------------------
  if (!points.length) {
    return (
      <div className="text-sm text-gray-500">
        No seizure data in the selected time range.
      </div>
    );
  }

  return (
    <div style={{ width: "100%", height: "100px" }}>
      <Scatter data={data as any} options={options} />
    </div>
  );
}
