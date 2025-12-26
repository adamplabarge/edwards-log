import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

type EventType = "seizure" | "feeding" | "medication" | "change";

export async function POST(
  req: Request,
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

  const body = await req.json();
  const { eventType, notes, type, label, date } = body as {
    eventType: EventType;
    notes?: string;
    type?: string;
    label?: string;
    date?: string;
  };

  const eventDate = date ? new Date(date) : new Date();

  switch (eventType) {
    case "seizure":
      await prisma.seizureEvent.create({
        data: {
          pet: { connect: { id: petId } },
          date: eventDate,
          notes,
        },
      });
      break;

    case "feeding":
      if (!type) {
        return NextResponse.json({ error: "Feeding type required" }, { status: 400 });
      }
      await prisma.feedingEvent.create({
        data: {
          pet: { connect: { id: petId } },
          date: eventDate,
          type,
          notes,
        },
      });
      break;

    case "medication":
      await prisma.medicationEvent.create({
        data: {
          pet: { connect: { id: petId } },
          date: eventDate,
          notes,
        },
      });
      break;

    case "change":
      if (!label) {
        return NextResponse.json({ error: "Change label required" }, { status: 400 });
      }
      await prisma.changeLine.create({
        data: {
          pet: { connect: { id: petId } },
          date: eventDate,
          label,
        },
      });
      break;

    default:
      return NextResponse.json({ error: "Invalid event type" }, { status: 400 });
  }

  return NextResponse.json({ success: true });
}
