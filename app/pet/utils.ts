import { DateTime } from "luxon";

export function shiftDateRange(
  startDate: string,
  endDate: string,
  daysBack: number
): { startDate: string; endDate: string } {
  const fallback = DateTime.now().toISODate()!;

  const start = DateTime.fromISO(startDate)
    .minus({ days: daysBack })
    .toISODate() ?? fallback;

  const end = DateTime.fromISO(endDate)
    .minus({ days: daysBack })
    .toISODate() ?? fallback;

  return {
    startDate: start,
    endDate: end,
  };
}


export function formatDateRange(startDate: string, endDate: string) {
  const start = DateTime.fromISO(startDate);
  const end = DateTime.fromISO(endDate);

  return `${start.toFormat("MMM d")} – ${end.toFormat("MMM d")}`;
}

export function getDateRangeLengthInDays(
  startDate: string,
  endDate: string
): number {
  const start = DateTime.fromISO(startDate).startOf("day");
  const end = DateTime.fromISO(endDate).endOf("day");

  return Math.max(1, Math.ceil(end.diff(start, "days").days));
}
