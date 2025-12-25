export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { notFound, redirect } from "next/navigation";
import { PetView } from "./PetView";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function PetPage(props: PageProps) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/api/auth/login");
  }

  const { id } = await props.params;

  if (!id) {
    notFound();
  }

  const pet = await prisma.pet.findFirst({
    where: {
      id: id,
      ownerId: user.id,
    },
  });

  if (!pet) {
    notFound();
  }

  return <PetView pet={pet} />;
}
