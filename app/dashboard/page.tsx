import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { createPet } from "./actions";
import { DashboardView } from "./DashboardView";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/api/auth/login");
  }

  const pets = await prisma.pet.findMany({
    where: {
      ownerId: user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <DashboardView
      pets={pets}
      userId={user.id}
      onCreatePet={createPet.bind(null, user.id)}
    />
  );
}
