import { DateTime } from "luxon";

type Seizure = { date: Date };

export function useGetLongestSeizureFreeStreak(
  seizures: Seizure[],
  startDate: string,
  endDate: string
) {
  const start = DateTime.fromISO(startDate).startOf("day");
  const end = DateTime.fromISO(endDate).endOf("day");

  const inWindow = seizures
    .map((s) => DateTime.fromJSDate(s.date))
    .filter((d) => d >= start && d <= end)
    .sort((a, b) => a.toMillis() - b.toMillis());

  // No seizures → whole window
  if (inWindow.length === 0) {
    return {
      days: Math.floor(end.diff(start, "days").days),
      start: start.toJSDate(),
      end: end.toJSDate(),
    };
  }

  let best = {
    days: 0,
    start: start,
    end: start,
  };

  // Start → first seizure
  const firstGapDays = Math.floor(
    inWindow[0].startOf("day").diff(start, "days").days
  );
  if (firstGapDays > best.days) {
    best = {
      days: firstGapDays,
      start,
      end: inWindow[0],
    };
  }

  // Between seizures
  for (let i = 0; i < inWindow.length - 1; i++) {
    const gapStart = inWindow[i].endOf("day");
    const gapEnd = inWindow[i + 1].startOf("day");

    const days = Math.floor(gapEnd.diff(gapStart, "days").days);

    if (days > best.days) {
      best = { days, start: gapStart, end: gapEnd };
    }
  }

  // Last seizure → end
  const lastGapDays = Math.floor(
    end.diff(inWindow[inWindow.length - 1].endOf("day"), "days").days
  );
  if (lastGapDays > best.days) {
    best = {
      days: lastGapDays,
      start: inWindow[inWindow.length - 1],
      end,
    };
  }

  return {
    days: best.days,
    start: best.start.toJSDate(),
    end: best.end.toJSDate(),
  };
}
