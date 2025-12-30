import { memo } from "react";
import SeizureRiskHistogram from "@/app/pet/components/Charts/SeirzuresRiskHistogram";
import { PetWithRelations } from "@/app/pet/types/PetWithRelations.type";

type Props = {
  pet: PetWithRelations;
  startDate: string;
  endDate: string;
};

export const SeizureRiskSectionBase = ({ pet, startDate, endDate }: Props) => {
  return (
          <section className="space-y-4">

        <h3 className="mb-1 text-lg font-semibold">Seizure Risk Histograms</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="min-h-[240px] md:min-h-[250px]">
            <SeizureRiskHistogram
              startDate={startDate}
              endDate={endDate}
              mode="feeding"
              seizureData={pet.seizureEvents}
              medicationData={pet.medicationEvents}
              feedingData={pet.feedingEvents}
            />
          </div>

          <div className="min-h-[240px] md:min-h-[250px]">
            <SeizureRiskHistogram
              startDate={startDate}
              endDate={endDate}
              mode="medication"
              seizureData={pet.seizureEvents}
              medicationData={pet.medicationEvents}
              feedingData={pet.feedingEvents}
            />
          </div>
        </div>
      </section>
  );
}

export const SeizureRiskSection = memo(SeizureRiskSectionBase);