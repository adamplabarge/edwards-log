import { memo } from "react";
import { SeizureTimeOfDayPieChart } from "@/app/pet/components/Charts/SeizureTimeOfDayPieChart";
import { PetWithRelations } from "@/app/pet/types/PetWithRelations.type";
import {
  formatDateRange,
  getDateRangeLengthInDays,
  shiftDateRange,
} from "@/app/pet/components/utils";

type Props = {
  pet: PetWithRelations;
  startDate: string;
  endDate: string;
};

const SeizureTimeOfDaySectionBase = ({ pet, startDate, endDate }: Props) => {
  const rangeLength = getDateRangeLengthInDays(startDate, endDate);
  const previous = shiftDateRange(startDate, endDate, rangeLength);
  const previousPrevious = shiftDateRange(startDate, endDate, rangeLength * 2);

  return (
    <section className="space-y-12">
      <h3 className="mb-2 text-lg font-semibold">Seizure Time-of-Day Trend</h3>

      <div className="flex flex-col md:flex-row md:gap-4 justify-between mb-18">
        {/* Current */}
        <div>
          <h4 className="mb-1 text-sm font-medium text-gray-600">
            {formatDateRange(startDate, endDate)}
          </h4>
          <div className="opacity-100">
            <SeizureTimeOfDayPieChart
              seizureData={pet.seizureEvents}
              startDate={startDate}
              endDate={endDate}
            />
          </div>
        </div>

        {/* Previous */}
        <div>
          <h4 className="mb-1 text-sm font-medium text-gray-600">
            {formatDateRange(previous.startDate, previous.endDate)}
          </h4>
          <div className="opacity-80">
            <SeizureTimeOfDayPieChart
              seizureData={pet.seizureEvents}
              startDate={previous.startDate}
              endDate={previous.endDate}
            />
          </div>
        </div>

        {/* Previous previous */}
        <div>
          <h4 className="mb-1 text-sm font-medium text-gray-600">
            {formatDateRange(
              previousPrevious.startDate,
              previousPrevious.endDate
            )}
          </h4>
          <div className="opacity-65">
            <SeizureTimeOfDayPieChart
              seizureData={pet.seizureEvents}
              startDate={previousPrevious.startDate}
              endDate={previousPrevious.endDate}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export const SeizureTimeOfDaySection = memo(SeizureTimeOfDaySectionBase);
