import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import LogEventView from "./LogEventView";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function LogEventPage({ params }: Props) {
  const { id: petId } = await params;

  const user = await getCurrentUser();
  if (!user) {
    redirect("/api/auth/login");
  }

  const pet = await prisma.pet.findFirst({
    where: {
      id: petId,
      ownerId: user.id,
    },
    include: {
      seizureEvents: true,
      feedingEvents: true,
      medicationEvents: true,
      changeLines: true,
      shareLinks: true,
      activityEvents: true,
    },
  });

  if (!pet) {
    notFound();
  }

  return (
    <LogEventView pet={pet} />
  );
}
