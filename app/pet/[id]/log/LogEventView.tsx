"use client";

import { useState } from "react";
import { PetWithRelations } from "../../types/PetWithRelations.type";
import EventModal from "./EventModal";
import EventList from "./EventList";
import Link from "next/link";
import { Button } from "@/app/components/Button/Button";

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
        <h1 className="text-2xl font-bold">
          Events for {pet.name}
        </h1>

        <Button
          variant="secondary"
          onClick={() => {
            setEditingEvent(null);
            setModalOpen(true);
          }}
        >
          Create Event
        </Button>
      </div>

      <EventList
        pet={pet}
        onEdit={(event) => {
          setEditingEvent(event);
          setModalOpen(true);
        }}
      />

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
