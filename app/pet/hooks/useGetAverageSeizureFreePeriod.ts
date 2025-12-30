import { useGetSeizureFreeGaps } from "@/app/pet/hooks/useGetSeizureFreeGaps";

export function useGetAverageSeizureFreePeriod(
  seizures: { date: Date }[],
  startDate: string,
  endDate: string
) {
  const gaps = useGetSeizureFreeGaps(seizures, startDate, endDate);

  if (gaps.length === 0) return 0;

  const total = gaps.reduce((sum, g) => sum + g.days, 0);
  return Math.round(total / gaps.length);
}
