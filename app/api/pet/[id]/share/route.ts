import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

/*
  Handles creating and retrieving pet share links.
  */
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: petId } = await params;

  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const share = await prisma.petShareLink.findFirst({
    where: { petId },
  });

  return NextResponse.json({
    shareUrl: share ? `/pet/share/${share.id}` : null,
  });
}

/*
  Handles creating pet share links.
  */
export async function POST(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: petId } = await params;

  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const pet = await prisma.pet.findFirst({
    where: { id: petId, ownerId: user.id },
  });

  if (!pet) {
    return NextResponse.json({ error: "Pet not found" }, { status: 404 });
  }

  let share = await prisma.petShareLink.findFirst({
    where: { petId },
  });

  if (!share) {
    share = await prisma.petShareLink.create({
      data: {
        createdBy: user.id,
        pet: {
          connect: { id: petId }, // ✅ safest Prisma pattern
        },
      },
    });
  }

  return NextResponse.json({
    shareUrl: `/pet/share/${share.id}`,
  });
}
