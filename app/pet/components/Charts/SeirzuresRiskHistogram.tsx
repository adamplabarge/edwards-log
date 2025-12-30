import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  type ChartOptions,
} from "chart.js";
import { SeizureEvent, MedicationEvent, FeedingEvent } from "@/prisma/generated/client";
import { binSeizuresByHoursSince } from "./utils/binSeirzuresByHoursSince";
import { isWithinRange } from "./utils/isWithInRange";
import { usePrefersDark } from "@/app/hooks/usePrefersDark";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

type Props = {
  startDate?: string;
  endDate?: string;
  mode: "medication" | "feeding";
  seizureData: SeizureEvent[];
  medicationData: MedicationEvent[];
  feedingData: FeedingEvent[];
};

export default function SeizureRiskHistogram({
  startDate,
  endDate,
  mode,
  seizureData,
  medicationData,
  feedingData
}: Props) {
  const prefersDark = usePrefersDark();
  const textColor = prefersDark ? "#e0e0e0" : "#111";
  const gridColor = prefersDark
    ? "rgba(255,255,255,0.15)"
    : "rgba(0,0,0,0.15)";

  const filteredSeizures = seizureData.filter(s =>
    isWithinRange(s.date.toISOString(), startDate, endDate)
  );

  const referenceEvents =
    mode === "medication" ? medicationData : feedingData;

  const bins = binSeizuresByHoursSince(
    filteredSeizures.map(s => ({ ...s, date: s.date.toISOString() })),
    referenceEvents.map(r => ({ ...r, date: r.date.toISOString() })),
    1,
    12
  );

  const data = {
    labels: bins.map(b => b.label),
    datasets: [
      {
        label:
          mode === "medication"
            ? "Seizures vs Hours Since Medication"
            : "Seizures vs Hours Since Feeding",
        data: bins.map(b => b.count),
        backgroundColor:
          mode === "medication"
            ? "rgba(204,102,255,0.7)"
            : "rgba(102,204,255,0.7)",
      },
    ],
  };

  const options: ChartOptions<"bar"> = {
    scales: {
      x: {
        title: {
          display: true,
          text:
            mode === "medication"
              ? "Hours Since Last Medication"
              : "Hours Since Last Feeding",
          color: textColor
        },
        ticks: { color: textColor },
        grid: { color: gridColor },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Number of Seizures",
          color: textColor,
        },
        ticks: { color: textColor, precision: 0 },
        grid: { color: gridColor },
      },
    },
    plugins: {
      legend: {
        labels: { color: textColor },
      },
      tooltip: {
        callbacks: {
          label: ctx => `Seizures: ${ctx.parsed.y}`,
        },
      },
    },
  };

  return (
    <Bar
      data={data}
      options={options}
      style={{ width: "100%", height: "400px" }}
    />
  );
}
