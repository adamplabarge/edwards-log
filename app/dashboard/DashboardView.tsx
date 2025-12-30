"use client";

import { useState } from "react";
import { Pet } from "@/prisma/generated/client";
import Link from "next/link";
import CreatePetModal from "@/app/dashboard/CreatePetModal";
import { Button } from "@/app/components/Button/Button";

type DashboardViewProps = {
  pets: Pet[];
  userId: string;
  onCreatePet: (formData: FormData) => void;
};

export function DashboardView({
  pets,
  userId,
  onCreatePet,
}: DashboardViewProps) {
  const [showModal, setShowModal] = useState(false);

  return (
    <main className="max-w-2xl mx-auto p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Your Pets</h1>

        <Button
          variant="secondary"
          onClick={() => setShowModal(true)}
        >
          Create Pet
        </Button>
      </div>

      {pets.length === 0 ? (
        <p className="text-gray-500 mb-6">You don’t have any pets yet.</p>
      ) : (
        <ul className="space-y-2 mb-6">
          {pets.map((pet) => (
            <li
              key={pet.id}
              className="border rounded p-3 flex items-center justify-between gap-4"
            >
              <span>
                <h2 className="font-semibold">
                  {pet.name} ({pet.type})
                </h2>
                {pet.notes && (
                  <p className="text-sm text-gray-600">{pet.notes}</p>
                )}
              </span>

              <span className="flex gap-2">
                <Button asChild>
                  <Link href={`/pet/${pet.id}`}>
                    Charts
                  </Link>
                </Button>

                <Button asChild>
                  <Link href={`/pet/${pet.id}/log`}>
                    Log Event
                  </Link>
                </Button>
              </span>
            </li>
          ))}
        </ul>
      )}

      {showModal && (
        <CreatePetModal
          onClose={() => setShowModal(false)}
          onCreate={onCreatePet}
        />
      )}
    </main>
  );
}
