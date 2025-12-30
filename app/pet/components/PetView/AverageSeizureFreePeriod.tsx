import { memo } from "react";
import { useGetAverageSeizureFreePeriod } from "@/app/pet/hooks/useGetAverageSeizureFreePeriod";
import { SeizureEvent } from "@/prisma/generated/client";

type Props = {
  seizureData: SeizureEvent[];
  startDate?: string;
  endDate?: string;
};

function AverageSeizureFreePeriodBase({
  seizureData,
  startDate,
  endDate,
}: Props) {
  if (!startDate || !endDate) return null;

  const average = useGetAverageSeizureFreePeriod(
    seizureData,
    startDate,
    endDate
  );

  return (
    <div>
      <h3 className="mb-1 text-lg font-semibold">
        Average seizure-free period
      </h3>

      <div className="mt-2 text-3xl font-bold">
        {average} days
      </div>

      <div className="text-xs text-gray-500 mt-1">
        Between {startDate} and {endDate}
      </div>
    </div>
  );
}

export const AverageSeizureFreePeriod = memo(AverageSeizureFreePeriodBase);
