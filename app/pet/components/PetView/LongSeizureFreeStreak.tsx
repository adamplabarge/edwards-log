import { memo } from "react";
import { useGetLongestSeizureFreeStreak } from "@/app/pet/hooks/useGetLongestSeizureFreeStreak";
import { SeizureEvent } from "@/prisma/generated/client";

type Props = {
  seizureData: SeizureEvent[];
  startDate?: string;
  endDate?: string;
};

function LongestSeizureFreeStreakBase({
  seizureData,
  startDate,
  endDate,
}: Props) {
  if (!startDate || !endDate) return null;

  const { days: longest } = useGetLongestSeizureFreeStreak(
    seizureData,
    startDate,
    endDate
  );

  return (
    <div className="">
      <div className="flex items-center gap-2">
        <h3 className="mb-1 text-lg font-semibold">
          Longest seizure-free period
        </h3>
      </div>

      <div className="mt-2 text-3xl font-bold">
        {longest} days
      </div>

      <div className="text-xs text-gray-500 mt-1">
        Between {startDate} and {endDate}
      </div>
    </div>
  );
}

export const LongestSeizureFreeStreak = memo(LongestSeizureFreeStreakBase);