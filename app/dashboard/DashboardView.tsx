import { Pet } from "@/prisma/generated/client";
import Link from "next/link";

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
  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Your Pets</h1>

      {pets.length === 0 ? (
        <p className="text-gray-500">You don’t have any pets yet.</p>
      ) : (
        <ul className="space-y-2 mb-6">
          {pets.map((pet) => (
            <li key={pet.id} className="border rounded p-3">
              <Link
                href={`/pet/${pet.id}`}
                className="block hover:underline"
              >
                <h2 className="font-semibold">
                  {pet.name} ({pet.type})
                </h2>
                {pet.notes && (
                  <p className="text-sm text-gray-600">
                    {pet.notes}
                  </p>
                )}
              </Link>
            </li>
          ))}
        </ul>
      )}

      {/* Create pet */}
      <form
        action={onCreatePet}
        className="space-y-3 border-t pt-4"
      >
        <h2 className="font-semibold">Add a New Pet</h2>

        <input
          name="name"
          placeholder="Pet name"
          required
          className="w-full border rounded p-2"
        />

        <input
          name="type"
          placeholder="Pet type"
          required
          className="w-full border rounded p-2"
        />

        <textarea
          name="notes"
          placeholder="Notes (optional)"
          className="w-full border rounded p-2"
        />

        <button
          type="submit"
          className="bg-black text-white px-4 py-2 rounded"
        >
          Add Pet
        </button>
      </form>
    </main>
  );
}
