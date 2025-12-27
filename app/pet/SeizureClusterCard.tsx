"use client";

import { memo } from "react";
import { DateTime } from "luxon";
import { useSeizureClusters } from "@/app/pet/hooks/useSeizureClusters";
import { SeizureEvent } from "@/prisma/generated/client";

type Props = {
  seizures: SeizureEvent[];
};

export function SeizureClustersCardBase({ seizures }: Props) {
  const seizureConvertTime = seizures.map((seizure) => ({
    ...seizure,
    date: seizure.date.toISOString(),
  }));
  const clusters = useSeizureClusters(seizureConvertTime, {
    windowHours: 24,
    minCount: 2,
    recentDays: 4,
  });

  return (
    <>
      {clusters.length === 0 ? null : (
        <section className="rounded-lg border p-4 bg-red-50 dark:bg-red-900/20">
          <h3 className="font-semibold text-red-700 dark:text-red-300">
            ⚠️ Seizure Clusters Detected
          </h3>

          <ul className="mt-2 space-y-2 text-sm">
            {clusters.map((c, i) => (
              <li key={i} className="flex flex-col">
                <span className="font-medium">
                  {c.count} seizures within 24 hours
                </span>
                <span className="text-gray-600 dark:text-gray-400">
                  {DateTime.fromISO(c.start).toLocaleString(
                    DateTime.DATETIME_MED
                  )}{" "}
                  →{" "}
                  {DateTime.fromISO(c.end).toLocaleString(
                    DateTime.DATETIME_MED
                  )}
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  );
}

export const SeizureClustersCard = memo(SeizureClustersCardBase);