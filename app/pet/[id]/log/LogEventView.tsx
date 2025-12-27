"use client";

import { useState } from "react";
import { PetWithRelations } from "../../types/PetWithRelations.type";
import EventModal from "./EventModal";
import EventList from "./EventList";
import Link from "next/link";

type LogEventViewProps = {
  pet: PetWithRelations;
};

export default function LogEventView({ pet }: LogEventViewProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<any | null>(null);

  return (
    <main className="max-w-2xl mx-auto p-6 space-y-6">
      <nav className="text-gray-500 text-sm">
        <Link href="/dashboard" className="hover:underline">
          Dashboard
        </Link>{" "}
        / <span className="text-gray-700 font-medium">Log</span>
      </nav>

      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Events for {pet.name}</h1>

        <button
          onClick={() => {
            setEditingEvent(null);
            setModalOpen(true);
          }}
          className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-800"
        >
          Create Event
        </button>
      </div>

      {/* Event list */}
      <EventList
        pet={pet}
        onEdit={(event) => {
          setEditingEvent(event);
          setModalOpen(true);
        }}
      />

      {/* Modal */}
      {modalOpen && (
        <EventModal
          petId={pet.id}
          event={editingEvent}
          onClose={() => setModalOpen(false)}
        />
      )}
    </main>
  );
}
