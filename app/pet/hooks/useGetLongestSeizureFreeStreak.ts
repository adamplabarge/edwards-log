import { DateTime } from "luxon";
import { useGetSeizureFreeGaps } from "@/app/pet/hooks/useGetSeizureFreeGaps";

export function useGetLongestSeizureFreeStreak(
  seizures: { date: Date }[],
  startDate: string,
  endDate: string
) {
  const gaps = useGetSeizureFreeGaps(seizures, startDate, endDate);

  if (gaps.length === 0) {
    const start = DateTime.fromISO(startDate).startOf("day");
    const end = DateTime.fromISO(endDate).endOf("day");

    return {
      days: Math.floor(end.diff(start, "days").days),
      start: start.toJSDate(),
      end: end.toJSDate(),
    };
  }

  const best = gaps.reduce((max, g) =>
    g.days > max.days ? g : max
  );

  return {
    days: best.days,
    start: best.start.toJSDate(),
    end: best.end.toJSDate(),
  };
}
