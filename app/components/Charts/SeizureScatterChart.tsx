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
import { SeizureEvent, MedicationEvent, FeedingEvent, ChangeLine } from "@/prisma/generated/client";
import { usePrefersDark } from "@/app/hooks/usePrefersDark";

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
};

export default function SeizureScatterChart({ startDate, endDate, seizureData, medicationData, feedingData, changeLines }: Props) {

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

  const kibblePoints = feedingPoints.filter((p) => p.type === "kibble");
  const freshPoints = feedingPoints.filter((p) => p.type === "fresh");
  const treatPoints = feedingPoints.filter((p) => p.type === "treat");

  const textColor = prefersDark ? "#e0e0e0" : "#111";
  const gridColor = prefersDark ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.15)";

  const data = {
    datasets: [
      {
        label: "Seizures",
        data: points,
        pointRadius: 6,
        borderWidth: 0,
        backgroundColor: "#ff6666",
        pointBorderColor: "#ff6666",
      },
      {
        label: "Kibble Feedings",
        data: kibblePoints,
        pointRadius: 4,
        backgroundColor: "rgba(102, 204, 255, 0.4)",
        pointBorderColor: "rgba(102, 204, 255, 0.4)",
      },
      {
        label: "Fresh Feedings",
        data: freshPoints,
        pointRadius: 4,
        backgroundColor: "rgba(0, 204, 102, 0.5)",
        pointBorderColor: "rgba(0, 204, 102, 0.5)",
      },
      {
        label: "Treat Feedings",
        data: treatPoints,
        pointRadius: 4,
        backgroundColor: "rgba(255, 204, 102, 0.5)",
        pointBorderColor: "rgba(255, 204, 102, 0.5)",
      },
      {
        label: "Medications",
        data: medicationPoints,
        pointRadius: 4,
        backgroundColor: "rgba(204, 102, 255, 0.5)",
        pointBorderColor: "rgba(204, 102, 255, 0.5)",
      },
    ],
  };

  const annotationObjects = changeLines.reduce((acc, ev, i) => {
    const date = DateTime.fromISO(ev.date.toISOString()).toJSDate();

    acc[`line${i}`] = {
      type: "line",
      xMin: date,
      xMax: date,
      borderColor: "rgba(255, 99, 132, 0.7)",
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
        labels: {
          color: textColor,
        },
      },
      annotation: {
        annotations: annotationObjects,
      },
    },
  };

  const [visibleDatasets, setVisibleDatasets] = useState<boolean[]>(
    () => new Array(data.datasets.length).fill(true)
  );

  const legendItems = data.datasets.map((ds, index) => ({
    index,
    label: ds.label,
    color:
      typeof ds.backgroundColor === "string"
        ? ds.backgroundColor
        : Array.isArray(ds.backgroundColor)
        ? ds.backgroundColor[0]
        : "#999",
    pointRadius: typeof ds.pointRadius === "number" ? ds.pointRadius : 4,
    visible: visibleDatasets[index],
  }));

  const filteredData = {
    ...data,
    datasets: data.datasets.map((ds, index) => ({
      ...ds,
      hidden: !visibleDatasets[index],
    })),
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "16px",
          marginTop: "12px",
          justifyContent: "center",
          fontSize: "14px",
          color: textColor,
        }}
      >
        {legendItems.map((item) => (
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
      <div style={{ width: "100%" }}>
        <Scatter
          data={filteredData}
          options={options}
          style={{ width: "100%", height: "500px" }}
        />
      </div>
    </div>
  );
}
