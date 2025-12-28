import { memo } from "react";
import { useGetMeanSeizureFreePeriod } from "@/app/hooks/useGetMeanSeizureFreePeriod";

type Props = {
  seizureData: { date: Date }[];
  startDate?: string;
  endDate?: string;
};

function MeanSeizureFreePeriodBase({
  seizureData,
  startDate,
  endDate,
}: Props) {
  if (!startDate || !endDate) return null;

  const mean = useGetMeanSeizureFreePeriod(
    seizureData,
    startDate,
    endDate
  );

  return (
    <div>
      <h3 className="mb-1 text-lg font-semibold">
        Mean seizure-free period
      </h3>

      <div className="mt-2 text-3xl font-bold">
        {mean} days
      </div>

      <div className="text-xs text-gray-500 mt-1">
        Between {startDate} and {endDate}
      </div>
    </div>
  );
}

export const MeanSeizureFreePeriod = memo(MeanSeizureFreePeriodBase);
