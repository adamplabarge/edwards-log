import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import LogEventView from "./LogEventView";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function LogEventPage({ params }: Props) {
  const { id: petId } = await params;

  // 🔒 Auth check
  const user = await getCurrentUser();
  if (!user) {
    redirect("/api/auth/login");
  }

  // 🔒 Ownership check
  const pet = await prisma.pet.findFirst({
    where: {
      id: petId,
      ownerId: user.id,
    },
    select: {
      id: true,
      name: true,
    },
  });

  if (!pet) {
    notFound(); // prevents ID probing
  }

  return (
    <main className="max-w-xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">
        Log Event for {pet.name}
      </h1>

      {/* Client-only UI */}
      <LogEventView petId={pet.id} />
    </main>
  );
}
