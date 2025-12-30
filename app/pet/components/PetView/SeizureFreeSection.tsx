import { memo } from "react";
import { LongestSeizureFreeStreak } from "@/app/pet/components/PetView/LongSeizureFreeStreak";
import { AverageSeizureFreePeriod } from "@/app/pet/components/PetView/AverageSeizureFreePeriod";
import { MeanSeizureFreePeriod } from "@/app/pet/components/PetView/MeanSeizureFreePeriod";
import { PetWithRelations } from "@/app/pet/types/PetWithRelations.type";

type Props = {
  pet: PetWithRelations;
  startDate?: string;
  endDate?: string;
};

export const SeizureFreeSectionBase = ({ pet, startDate, endDate }: Props) => {
  return (
    <section>
      <div className="flex flex-col md:flex-row md:gap-4 align-items-stretch justify-between mb-8">
        <LongestSeizureFreeStreak
          seizureData={pet.seizureEvents}
          startDate={startDate}
          endDate={endDate}
        />
        <AverageSeizureFreePeriod
          seizureData={pet.seizureEvents}
          startDate={startDate}
          endDate={endDate}
        />
        <MeanSeizureFreePeriod
          seizureData={pet.seizureEvents}
          startDate={startDate}
          endDate={endDate}
        />
      </div>
    </section>
  );
};

export const SeizureFreeSection = memo(SeizureFreeSectionBase);
