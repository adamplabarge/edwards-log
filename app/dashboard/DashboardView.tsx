"use client";

import { useState } from "react";
import { Pet } from "@/prisma/generated/client";
import Link from "next/link";
import CreatePetModal from "@/app/dashboard/CreatePetModal";

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
        <button
          className="bg-blue-600 hover:bg-blue-800 text-white px-4 py-2 rounded"
          onClick={() => setShowModal(true)}
        >
          Create Pet
        </button>
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
                <Link
                  href={`/pet/${pet.id}`}
                  className="text-sm px-3 py-1 rounded bg-blue-600 hover:bg-blue-800 whitespace-nowrap"
                >
                  Charts
                </Link>
                <Link
                  href={`/pet/${pet.id}/log`}
                  className="text-sm px-3 py-1 rounded bg-blue-600 hover:bg-blue-800 whitespace-nowrap"
                >
                  Log Event
                </Link>
              </span>
            </li>
          ))}
        </ul>
      )}

      {/* Create Pet Modal */}
      {showModal && (
        <CreatePetModal
          onClose={() => setShowModal(false)}
          onCreate={onCreatePet}
        />
      )}
    </main>
  );
}
