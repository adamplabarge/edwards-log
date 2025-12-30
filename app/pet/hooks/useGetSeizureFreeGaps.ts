import { DateTime } from "luxon";

type SeizureFreeGap = {
  days: number;
  start: DateTime;
  end: DateTime;
};

export function useGetSeizureFreeGaps(
  seizures: { date: Date }[],
  startDate: string,
  endDate: string
): SeizureFreeGap[] {
  const start = DateTime.fromISO(startDate).startOf("day");
  const end = DateTime.fromISO(endDate).endOf("day");

  const inWindow = seizures
    .map((s) => DateTime.fromJSDate(s.date))
    .filter((d) => d >= start && d <= end)
    .sort((a, b) => a.toMillis() - b.toMillis());

  const gaps: SeizureFreeGap[] = [];

  if (inWindow.length === 0) {
    gaps.push({
      days: Math.floor(end.diff(start, "days").days),
      start,
      end,
    });
    return gaps;
  }

  // Start → first seizure
  gaps.push({
    days: Math.floor(inWindow[0].startOf("day").diff(start, "days").days),
    start,
    end: inWindow[0],
  });

  // Between seizures
  for (let i = 0; i < inWindow.length - 1; i++) {
    const gapStart = inWindow[i].endOf("day");
    const gapEnd = inWindow[i + 1].startOf("day");

    gaps.push({
      days: Math.floor(gapEnd.diff(gapStart, "days").days),
      start: gapStart,
      end: gapEnd,
    });
  }

  // Last seizure → end
  gaps.push({
    days: Math.floor(
      end.diff(inWindow[inWindow.length - 1].endOf("day"), "days").days
    ),
    start: inWindow[inWindow.length - 1],
    end,
  });

  return gaps.filter((g) => g.days >= 0);
}
