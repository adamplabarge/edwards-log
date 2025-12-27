import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";

type EventType = "seizure" | "feeding" | "medication" | "change" | "activity";
type MedicationType = "ASM" | "OTHER";

/*
  Handles creating and updating pet events.
  */
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
  const { eventType, notes, type, label, date, endDate } = body as {
    eventType: EventType;
    notes?: string;
    type?: string;
    label?: string;
    date?: string;
    endDate?: string;
  };

  const eventDate = date ? new Date(date) : new Date();
  const eventEndDate = endDate ? new Date(endDate) : new Date();

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
        return NextResponse.json(
          { error: "Feeding type required" },
          { status: 400 }
        );
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
      if (!type || !["ASM", "OTHER"].includes(type)) {
        return NextResponse.json(
          { error: "Medication type required and must be ASM or OTHER" },
          { status: 400 }
        );
      }
      await prisma.medicationEvent.create({
        data: {
          pet: { connect: { id: petId } },
          date: eventDate,
          type: type as MedicationType,
          notes,
        },
      });
      break;

    case "change":
      if (!label) {
        return NextResponse.json(
          { error: "Change label required" },
          { status: 400 }
        );
      }
      await prisma.changeLine.create({
        data: {
          pet: { connect: { id: petId } },
          date: eventDate,
          label,
        },
      });
      break;

    case "activity":
      if (!type) {
        return NextResponse.json(
          { error: "Activity type required" },
          { status: 400 }
        );
      }
      await prisma.activityEvent.create({
        data: {
          pet: { connect: { id: petId } },
          date: eventDate,
          endDate: eventEndDate,
          type,
          notes,
        },
      });
      break;

    default:
      return NextResponse.json(
        { error: "Invalid event type" },
        { status: 400 }
      );
  }

  return NextResponse.json({ success: true });
}

/*
  Handles updating pet events.
  */
export async function PUT(
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
  const { id, eventType, notes, type, label, date, endDate } = body as {
    id?: string;
    eventType: EventType;
    notes?: string;
    type?: string;
    label?: string;
    date?: string;
    endDate?: string;
  };

  if (!id) {
    return NextResponse.json({ error: "Event ID required" }, { status: 400 });
  }

  const eventDate = date ? new Date(date) : undefined;
  const eventEndDate = endDate ? new Date(endDate) : undefined;

  switch (eventType) {
    case "seizure":
      await prisma.seizureEvent.update({
        where: {
          id,
          petId,
        },
        data: {
          ...(eventDate && { date: eventDate }),
          notes,
        },
      });
      break;

    case "feeding":
      if (!type) {
        return NextResponse.json(
          { error: "Feeding type required" },
          { status: 400 }
        );
      }

      await prisma.feedingEvent.update({
        where: {
          id,
          petId,
        },
        data: {
          ...(eventDate && { date: eventDate }),
          type: type as MedicationType,
          notes,
        },
      });
      break;

    case "medication":
      if (!type || !["ASM", "OTHER"].includes(type)) {
        return NextResponse.json(
          { error: "Medication type required and must be ASM or OTHER" },
          { status: 400 }
        );
      }
      await prisma.medicationEvent.update({
        where: {
          id,
          petId,
        },
        data: {
          ...(eventDate && { date: eventDate }),
          type: type as MedicationType,
          notes,
        },
      });
      break;

    case "change":
      if (!label) {
        return NextResponse.json(
          { error: "Change label required" },
          { status: 400 }
        );
      }

      await prisma.changeLine.update({
        where: {
          id,
          petId,
        },
        data: {
          ...(eventDate && { date: eventDate }),
          label,
        },
      });
      break;

    case "activity":
      if (!type) {
        return NextResponse.json(
          { error: "Activity type required" },
          { status: 400 }
        );
      }
      await prisma.activityEvent.update({
        where: {
          id,
          petId,
        },
        data: {
          ...(eventDate && { date: eventDate }),
          ...(eventEndDate && { endDate: eventEndDate }),
          type,
          notes,
        },
      });
      break;

    default:
      return NextResponse.json(
        { error: "Invalid event type" },
        { status: 400 }
      );
  }

  return NextResponse.json({ success: true });
}
