"use client";

import React, { memo } from "react";
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
    <section className="rounded-lg bg-gray-800/50 p-4 rounded-lg border border-gray-700">
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-sm font-medium text-gray-300">
          Time since last seizure:
        </span>

        <span className="text-sm font-semibold">
          {days} day{days !== 1 ? "s" : ""},{" "}
          {hours} hour{hours !== 1 ? "s" : ""}
        </span>
      </div>

      <div className="mt-1 text-sm">
        <span className="text-gray-300">Last seizure:</span> {lastDt.toLocaleString(DateTime.DATETIME_MED)}
      </div>
    </section>
  );
}

/**
 * Memoized export
 */
export const TimeSinceLastSeizure = memo(TimeSinceLastSeizureBase);
