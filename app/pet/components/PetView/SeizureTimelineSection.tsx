import { memo } from "react";
import { SeizureScatterChart } from "@/app/pet/components/Charts/SeizureScatterChart";
import { PetWithRelations } from "@/app/pet/types/PetWithRelations.type";

type Props = {
  pet: PetWithRelations;
  startDate?: string;
  endDate?: string;
};

const SeizureTimelineSectionBase = ({ pet, startDate, endDate }: Props) => {
  return (
    <section className="space-y-12">
      <h3 className="mb-2 text-lg font-semibold">Seizure Timeline Chart</h3>

      <div className="w-full overflow-x-auto mb-12">
        <SeizureScatterChart
          startDate={startDate}
          endDate={endDate}
          seizureData={pet.seizureEvents}
          medicationData={pet.medicationEvents}
          feedingData={pet.feedingEvents}
          changeLines={pet.changeLines}
          activityData={pet.activityEvents}
        />
      </div>
    </section>
  );
};

export const SeizureTimelineSection = memo(SeizureTimelineSectionBase);
