import { hoursSinceLastEvent } from "./hoursSinceLastEvent";

type BinResult = {
  label: string;
  count: number;
};

export function binSeizuresByHoursSince(
  seizures: { date: string }[],
  referenceEvents: { date: string }[],
  binSizeHours = 1,
  maxHours = 12
): BinResult[] {
  const bins = Array.from({ length: maxHours }, (_, i) => ({
    label: `${i}–${i + binSizeHours}h`,
    count: 0,
  }));

  seizures.forEach(s => {
    const h = hoursSinceLastEvent(s.date, referenceEvents);
    if (h === null) return;

    const idx = Math.floor(h / binSizeHours);
    if (idx >= 0 && idx < bins.length) {
      bins[idx].count++;
    }
  });

  return bins;
}
