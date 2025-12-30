import { DateTime } from "luxon";

export function isWithinRange(
  iso: string,
  startDate?: string,
  endDate?: string
) {
  const dt = DateTime.fromISO(iso);

  if (startDate && dt < DateTime.fromISO(startDate).startOf("day")) {
    return false;
  }

  if (endDate && dt > DateTime.fromISO(endDate).endOf("day")) {
    return false;
  }

  return true;
}
