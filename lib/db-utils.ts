"use server";

import prisma from "@/lib/prisma";

/**
 * Checks if the Pet table exists in the database
 * @returns Promise<boolean> - true if the table exists, false otherwise
 */
export async function checkPetTableExists(): Promise<boolean> {
  try {
    // Try to query the pet table
    await prisma.pet.findFirst();
    return true;
  } catch {
    // If there's an error, the table likely doesn't exist
    return false;
  }
}
