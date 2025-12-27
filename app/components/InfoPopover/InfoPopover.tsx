"use client";

import { useState, Fragment } from "react";
import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";

type InfoPopoverProps = {
  content: string;
};

export function InfoPopover({ content }: InfoPopoverProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative inline-block">
      {/* Circle with question mark */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors focus:outline-none"
      >
        <QuestionMarkCircleIcon className="w-4 h-4 text-gray-700 dark:text-gray-200" />
      </button>

      {/* Popover */}
      {open && (
        <div
          className="absolute z-10 w-64 p-3 text-sm text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-800 rounded-lg shadow-lg mt-2 -translate-x-1/2 left-1/2 border border-gray-200 dark:border-gray-700"
        >
          {content}
        </div>
      )}
    </div>
  );
}
