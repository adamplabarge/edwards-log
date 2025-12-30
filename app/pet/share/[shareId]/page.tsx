import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { PetView } from "@/app/pet/components/PetView/PetView";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ shareId: string }>;
};

export default async function PetSharePage({ params }: PageProps) {
  const { shareId } = await params;

  const share = await prisma.petShareLink.findUnique({
    where: { 
      id: shareId
    },
    include: { 
      pet: { 
        include: { 
          seizureEvents: true,
          feedingEvents: true,
          medicationEvents: true,
          changeLines: true,
          activityEvents: true
        } } },
  });

  if (!share) notFound();
  // if (share.expiresAt && share.expiresAt < new Date()) notFound();

  return <PetView pet={share.pet} hideShare />;
}
