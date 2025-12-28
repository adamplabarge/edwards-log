import { useGetSeizureFreeGaps } from "@/app/hooks/useGetSeizureFreeGaps";

export function useGetMeanSeizureFreePeriod(
  seizures: { date: Date }[],
  startDate: string,
  endDate: string
) {
  const gaps = useGetSeizureFreeGaps(seizures, startDate, endDate)
    .map((g) => g.days)
    .sort((a, b) => a - b);

  if (gaps.length === 0) return 0;

  const mid = Math.floor(gaps.length / 2);

  return gaps.length % 2 === 0
    ? Math.round((gaps[mid - 1] + gaps[mid]) / 2)
    : gaps[mid];
}
