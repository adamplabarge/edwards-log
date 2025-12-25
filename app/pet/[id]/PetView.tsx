import { Pet } from "@/prisma/generated/client";

type PetViewProps = {
  pet: Pet;
};

export function PetView({ pet }: PetViewProps) {
  return (
    <main className="max-w-2xl mx-auto p-6 space-y-4">
      <h1 className="text-2xl font-bold">
        {pet.name}
      </h1>

      <p className="text-gray-600">
        Type: <span className="font-medium">{pet.type}</span>
      </p>

      {pet.notes && (
        <p className="border rounded p-3">
          {pet.notes}
        </p>
      )}

      {/* Charts will go here */}
      <section className="mt-6">
        <h2 className="font-semibold mb-2">Activity</h2>
        <div className="h-40 border rounded flex items-center justify-center text-gray-400">
          Charts coming soon
        </div>
      </section>
    </main>
  );
}
