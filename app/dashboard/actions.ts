"use server";

import { prisma } from "@/lib/prisma";

/*
  Handles creating a new pet for the current user.
  */
export async function createPet(
  userId: string,
  formData: FormData
) {
  const name = formData.get("name") as string;
  const type = formData.get("type") as string;
  const notes = formData.get("notes") as string | null;

  if (!name || !type) {
    throw new Error("Name and type are required");
  }

  await prisma.pet.create({
    data: {
      name,
      type,
      notes,
      ownerId: userId,
    },
  });
}
