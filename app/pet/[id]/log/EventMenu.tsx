import { useState, useRef, useEffect } from "react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { Button } from "@/app/components/Button/Button";
import Link from "next/link"; // if needed for future navigation

export function EventMenu({ onEdit }: { onEdit: () => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close menu if click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={ref}>
      {/* Menu trigger */}
      <Button
        variant="tertiary"
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
      >
        <EllipsisVerticalIcon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
      </Button>

      {/* Dropdown menu */}
      {open && (
        <div className="absolute right-0 mt-1 w-32 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded shadow-lg z-50">
          <Button
            variant="tertiary"
            asChild
            className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
            onClick={() => setOpen(false)}
          >
            <button onClick={onEdit}>Edit</button>
          </Button>

          {/* Future delete button */}
          {/* <Button
            variant="tertiary"
            asChild
            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <button onClick={handleDelete}>Delete</button>
          </Button> */}
        </div>
      )}
    </div>
  );
}
