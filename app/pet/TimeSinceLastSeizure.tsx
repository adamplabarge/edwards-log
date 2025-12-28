"use client";

import { memo } from "react";
import { DateTime } from "luxon";

type SeizureLike = {
  date: string | Date;
};

type Props = {
  seizures: SeizureLike[];
};

function TimeSinceLastSeizureBase({ seizures }: Props) {
  if (!seizures.length) {
    return (
      <section className="mt-2 rounded-lg border p-4 bg-green-50 dark:bg-green-900/20">
        <p className="text-sm text-green-700 dark:text-green-300">
          🎉 No seizures recorded yet
        </p>
      </section>
    );
  }

  const lastSeizure = seizures.reduce((latest, s) =>
    new Date(s.date) > new Date(latest.date) ? s : latest
  );

  const lastDt =
    typeof lastSeizure.date === "string"
      ? DateTime.fromISO(lastSeizure.date)
      : DateTime.fromJSDate(lastSeizure.date);

  const diff = DateTime.now().diff(lastDt, ["days", "hours"]);
  const days = Math.floor(diff.days);
  const hours = Math.floor(diff.hours % 24);

  return (
    <section className="mb-10">
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-md font-medium">
          Time since last seizure:
        </span>

        <span className="text-md font-semibold">
          {days} day{days !== 1 ? "s" : ""},{" "}
          {hours} hour{hours !== 1 ? "s" : ""}
        </span>
      </div>

      <div className="mt-1 text-md">
        <span>Last seizure:</span> {lastDt.toLocaleString(DateTime.DATETIME_MED)}
      </div>
    </section>
  );
}

/**
 * Memoized export
 */
export const TimeSinceLastSeizure = memo(TimeSinceLastSeizureBase);
