import { memo } from "react";
import { SeizureRollingFrequency } from "@/app/pet/components/PetView/SeizureRollingFrequency";
import { PetWithRelations } from "@/app/pet/types/PetWithRelations.type";

type Props = {
  pet: PetWithRelations;
  startDate: string;
  endDate: string;
};

const SeizureFrequencySectionBase = ({ pet, startDate, endDate }: Props) => {

  return (
          <section className="space-y-12">

        <SeizureRollingFrequency
          seizureData={pet.seizureEvents}
          startDate={startDate}
          endDate={endDate}
        />
      </section>
  )
};

export const SeizureFrequencySection = memo(SeizureFrequencySectionBase);