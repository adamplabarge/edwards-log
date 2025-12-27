"use client";

import { useState } from "react";
import { Scatter } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  Tooltip,
  TimeScale,
  type ChartOptions,
} from "chart.js";
import annotationPlugin from "chartjs-plugin-annotation";
import "chartjs-adapter-luxon";
import { DateTime } from "luxon";
import {
  SeizureEvent,
  MedicationEvent,
  FeedingEvent,
  ChangeLine,
  ActivityEvent,
} from "@/prisma/generated/client";
import { usePrefersDark } from "@/app/hooks/usePrefersDark";
import { EVENT_COLORS } from "@/app/pet/constants";

ChartJS.register(
  LinearScale,
  PointElement,
  Tooltip,
  TimeScale,
  annotationPlugin
);

type Props = {
  startDate?: string;
  endDate?: string;
  seizureData: SeizureEvent[];
  medicationData: MedicationEvent[];
  feedingData: FeedingEvent[];
  changeLines: ChangeLine[];
  activityData?: ActivityEvent[];
};

export default function SeizureScatterChart({
  startDate,
  endDate,
  seizureData,
  medicationData,
  feedingData,
  changeLines,
  activityData,
}: Props) {
  const prefersDark = usePrefersDark();

  const xMin = startDate
    ? DateTime.fromISO(startDate).startOf("day").toJSDate()
    : undefined;

  const xMax = endDate
    ? DateTime.fromISO(endDate).endOf("day").toJSDate()
    : undefined;

  // Convert seizure entries into Chart.js points
  const points = seizureData.map((s) => {
    const dt = DateTime.fromISO(s.date.toISOString());

    // Convert to fractional hours for Y axis
    const hourFraction = dt.hour + dt.minute / 60;

    return {
      x: dt.toJSDate(),
      y: hourFraction,
      notes: s.notes ?? null,
    };
  });

  // Convert medication entries into Chart.js points
  const medicationPoints = medicationData.map((m) => {
    const dt = DateTime.fromISO(m.date.toISOString());

    // Convert to fractional hours for Y axis
    const hourFraction = dt.hour + dt.minute / 60;

    return {
      x: dt.toJSDate(),
      y: hourFraction,
      type: m.type,
    };
  });

  // Convert feeding entries into Chart.js points
  const feedingPoints = feedingData.map((f) => {
    const dt = DateTime.fromISO(f.date.toISOString());

    // Convert to fractional hours for Y axis
    const hourFraction = dt.hour + dt.minute / 60;

    return {
      x: dt.toJSDate(),
      y: hourFraction,
      type: f.type,
      notes: f.notes ?? null,
    };
  });

  const activityPoints = activityData
    ? activityData.map((a) => {
        const dt = DateTime.fromISO(a.date.toISOString());

        // Convert to fractional hours for Y axis
        const hourFraction = dt.hour + dt.minute / 60;

        return {
          x: dt.toJSDate(),
          y: hourFraction,
          notes: a.notes ?? null,
          type: a.type,
        };
      })
    : [];

  const textColor = prefersDark ? "#e0e0e0" : "#111";
  const gridColor = prefersDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.15)";

  // Group medication points by type
  const medicationPointsByType: Record<string, typeof medicationPoints> = {
    ASM: medicationPoints.filter((m) => (m as any).type === "ASM"),
    OTHER: medicationPoints.filter((m) => (m as any).type === "OTHER"),
  };

  // Group feeding points by type
  const feedingPointsByType: Record<string, typeof feedingPoints> = {
    kibble: feedingPoints.filter((p) => p.type === "kibble"),
    fresh: feedingPoints.filter((p) => p.type === "fresh"),
    treat: feedingPoints.filter((p) => p.type === "treat"),
    wet: feedingPoints.filter((p) => p.type === "wet"),
    raw: feedingPoints.filter((p) => p.type === "raw"),
    mixed: feedingPoints.filter((p) => p.type === "mixed"),
    other: feedingPoints.filter((p) => p.type === "other"),
  };

  // Group activity points by type
  const activityPointsByType: Record<string, typeof activityPoints> = {
    walk: activityPoints.filter((a) => (a as any).type === "walk"),
    playtime: activityPoints.filter((a) => (a as any).type === "playtime"),
    park: activityPoints.filter((a) => (a as any).type === "park"),
    training: activityPoints.filter((a) => (a as any).type === "training"),
    grooming: activityPoints.filter((a) => (a as any).type === "grooming"),
    vet_visit: activityPoints.filter((a) => (a as any).type === "vet_visit"),
    other: activityPoints.filter((a) => (a as any).type === "other"),
  };

  // Build datasets dynamically
  const data = {
    datasets: [
      // Seizures
      {
        label: "Seizures",
        data: points,
        pointRadius: 6,
        borderWidth: 0,
        backgroundColor: EVENT_COLORS.seizure,
        pointBorderColor: EVENT_COLORS.seizure,
      },
      // Medications
      ...Object.entries(medicationPointsByType).map(([type, points]) => ({
        label: type === "ASM" ? "Antiseizure Medications" : "Other Medications",
        data: points,
        pointRadius: 4,
        backgroundColor:
          EVENT_COLORS[`medication:${type}` as keyof typeof EVENT_COLORS],
        pointBorderColor:
          EVENT_COLORS[`medication:${type}` as keyof typeof EVENT_COLORS],
      })),
      // Feedings
      ...Object.entries(feedingPointsByType).map(([type, points]) => ({
        label: `${type.charAt(0).toUpperCase() + type.slice(1)} Feedings`,
        data: points,
        pointRadius: 4,
        backgroundColor:
          EVENT_COLORS[`feeding:${type}` as keyof typeof EVENT_COLORS],
        pointBorderColor:
          EVENT_COLORS[`feeding:${type}` as keyof typeof EVENT_COLORS],
      })),
      // Activities
      ...Object.entries(activityPointsByType).map(([type, points]) => ({
        label: `${
          type.charAt(0).toUpperCase() + type.replace("_", " ").slice(1)
        }`,
        data: points,
        pointRadius: 4,
        backgroundColor:
          EVENT_COLORS[`activity:${type}` as keyof typeof EVENT_COLORS],
        pointBorderColor:
          EVENT_COLORS[`activity:${type}` as keyof typeof EVENT_COLORS],
      })),
    ],
  };

  const annotationObjects = changeLines.reduce((acc, ev, i) => {
    const date = DateTime.fromISO(ev.date.toISOString()).toJSDate();

    acc[`line${i}`] = {
      type: "line",
      xMin: date,
      xMax: date,
      borderColor: EVENT_COLORS.change,
      borderWidth: 2,
      borderDash: [4, 4],

      label: {
        display: false, // IMPORTANT: Hide static text
      },

      // Annotation hover handlers
      enter({ chart }: { chart: any }) {
        const xScale = chart.scales.x;

        chart.$annotationHover = {
          label: ev.label,
          date,
          xPixel: xScale.getPixelForValue(date),
        };

        chart.update();
      },

      leave({ chart }: { chart: any }) {
        chart.$annotationHover = null;
        chart.update();
      },
    };

    return acc;
  }, {} as Record<string, any>);

  const options: ChartOptions<"scatter"> = {
    maintainAspectRatio: false,
    scales: {
      x: {
        type: "time",
        min: xMin ? xMin.getTime() : undefined,
        max: xMax ? xMax.getTime() : undefined,
        time: { unit: "day" },
        ticks: {
          color: textColor,
        },
        grid: {
          color: gridColor,
        },
        title: {
          display: true,
          text: "Date",
          color: textColor,
        },
      },
      y: {
        min: 0,
        max: 24,
        ticks: {
          color: textColor,
        },
        grid: {
          color: gridColor,
        },
        title: {
          display: true,
          text: "Time of Day (Hours)",
          color: textColor,
        },
      },
    },
    plugins: {
      tooltip: {
        enabled: false,
        external: function (context) {
          const { chart, tooltip } = context;

          let tooltipEl = document.getElementById("chartjs-custom-tooltip");
          if (!tooltipEl) {
            tooltipEl = document.createElement("div");
            tooltipEl.id = "chartjs-custom-tooltip";
            tooltipEl.style.position = "absolute";
            tooltipEl.style.pointerEvents = "none";
            tooltipEl.style.background = "rgba(0,0,0,0.8)";
            tooltipEl.style.color = "white";
            tooltipEl.style.padding = "8px 10px";
            tooltipEl.style.borderRadius = "6px";
            tooltipEl.style.maxWidth = "220px";
            tooltipEl.style.whiteSpace = "normal";
            tooltipEl.style.fontSize = "14px";
            tooltipEl.style.lineHeight = "1.4";
            document.body.appendChild(tooltipEl);
          }

          const activePoint = (context.chart as any)._active?.[0];

          // -------------------------------
          // ✨ 1) ANNOTATION TOOLTIP LOGIC
          // -------------------------------
          if ((chart as any).$annotationHover && !activePoint) {
            const { label, date, xPixel } = (chart as any).$annotationHover;

            tooltipEl.style.opacity = "1";
            tooltipEl.innerHTML = `<b>${label}</b><br>${date.toLocaleString()}`;

            const canvasRect = chart.canvas.getBoundingClientRect();
            tooltipEl.style.left = canvasRect.left + xPixel + "px";
            tooltipEl.style.top = canvasRect.top + 20 + "px";

            return;
          }

          // --------------------------------
          // ✨ 2) NORMAL POINT TOOLTIP LOGIC
          // --------------------------------

          if (tooltip.opacity === 0) {
            tooltipEl.style.opacity = "0";
            return;
          }

          // Use the existing point tooltip code you already had:
          const datasetIndex = tooltip.dataPoints[0].datasetIndex;
          const index = tooltip.dataPoints[0].dataIndex;

          const rawPoint = chart.data.datasets[datasetIndex].data[index] as any;

          tooltipEl.style.opacity = "1";
          tooltipEl.innerHTML =
            `<b>${chart.data.datasets[datasetIndex].label}</b>` +
            `<br/>${rawPoint.x.toLocaleString()}` +
            (rawPoint.notes ? `<br/>${rawPoint.notes}` : "");

          const canvasRect = chart.canvas.getBoundingClientRect();
          tooltipEl.style.left = canvasRect.left + tooltip.caretX + "px";
          tooltipEl.style.top = canvasRect.top + tooltip.caretY + "px";
        },
      },
      legend: {
        display: false
      },
      annotation: {
        annotations: annotationObjects,
      },
    },
  };

  const [visibleDatasets, setVisibleDatasets] = useState<boolean[]>(() =>
    new Array(data.datasets.length).fill(true)
  );

  const legendItems = data.datasets
    .map((ds, index) => ({
      index,
      label: ds.label,
      group: (() => {
        if (ds.label === "Seizures") return "Seizures";
        if (ds.label.includes("Medication")) return "Medications";
        if (ds.label.includes("Feedings")) return "Feedings";
        return "Activities";
      })(),
      color:
        typeof ds.backgroundColor === "string"
          ? ds.backgroundColor
          : Array.isArray(ds.backgroundColor)
          ? ds.backgroundColor[0]
          : "#999",
      pointRadius: typeof ds.pointRadius === "number" ? ds.pointRadius : 4,
      visible: visibleDatasets[index],
      hasData: Array.isArray(ds.data) && ds.data.length > 0,
    }))
    // ✅ THIS is the key line
    .filter((item) => item.hasData);

  const filteredData = {
    ...data,
    datasets: data.datasets.map((ds, index) => ({
      ...ds,
      hidden: !visibleDatasets[index],
    })),
  };

  return (
    <div>
      <div style={{ width: "100%" }}>
        <Scatter
          data={filteredData as any}
          options={options}
          style={{ width: "100%", height: "500px" }}
        />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          marginTop: "12px",
          fontSize: "14px",
          color: textColor,
        }}
      >
        {/* Grouped legend items */}
        {["Seizures", "Medications", "Feedings", "Activities"].map((group) => {
          const groupItems = legendItems.filter((item) => item.group === group);

          if (!groupItems.length) return null;

          return (
            <div
              key={group}
              style={{ display: "flex", alignItems: "center", gap: "12px" }}
            >
              {groupItems.map((item) => (
                <div
                  key={item.label}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    cursor: "pointer",
                    opacity: item.visible ? 1 : 0.5,
                  }}
                  onClick={() =>
                    setVisibleDatasets((prev) =>
                      prev.map((v, i) => (i === item.index ? !v : v))
                    )
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setVisibleDatasets((prev) =>
                        prev.map((v, i) => (i === item.index ? !v : v))
                      );
                    }
                  }}
                  tabIndex={0}
                >
                  <span
                    style={{
                      width: "10px",
                      height: "10px",
                      borderRadius: "50%",
                      backgroundColor: item.color,
                      display: "inline-block",
                    }}
                  />
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}
