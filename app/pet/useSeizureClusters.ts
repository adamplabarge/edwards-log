import { useMemo } from "react";
import { DateTime } from "luxon";

type SeizureLike = {
  date: string;
};

export type SeizureCluster = {
  start: string;
  end: string;
  count: number;
  seizures: SeizureLike[];
};

type Options = {
  windowHours?: number;
  minCount?: number;
  recentDays?: number; // 👈 new
};

export function useSeizureClusters(
  seizures: SeizureLike[],
  {
    windowHours = 24,
    minCount = 2,
    recentDays = 4,
  }: Options = {}
): SeizureCluster[] {
  return useMemo(() => {
    if (seizures.length < minCount) return [];

    const now = DateTime.now();
    const recentCutoff = now.minus({ days: recentDays });

    const sorted = [...seizures].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    const clusters: SeizureCluster[] = [];

    for (let i = 0; i < sorted.length; i++) {
      const start = DateTime.fromISO(sorted[i].date);
      const windowEnd = start.plus({ hours: windowHours });

      const inWindow = sorted.filter((s) => {
        const d = DateTime.fromISO(s.date);
        return d >= start && d <= windowEnd;
      });

      if (inWindow.length >= minCount) {
        clusters.push({
          start: start.toISO()!,
          end: windowEnd.toISO()!,
          count: inWindow.length,
          seizures: inWindow,
        });
      }
    }

    // Deduplicate overlapping clusters
    const deduped = clusters.filter((c, i, arr) => {
      if (i === 0) return true;
      const prev = arr[i - 1];
      return DateTime.fromISO(c.start) >
        DateTime.fromISO(prev.end);
    });

    // 🔥 Filter to recent clusters only
    return deduped.filter((c) =>
      DateTime.fromISO(c.end) >= recentCutoff
    );
  }, [seizures, windowHours, minCount, recentDays]);
}
