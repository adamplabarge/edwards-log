import { Pet } from "@/prisma/generated/client";
import {
  SeizureEvent,
  FeedingEvent,
  MedicationEvent,
  ChangeLine,
} from "@/prisma/generated/client";

export type PetWithRelations = {
  seizureEvents: SeizureEvent[];
  feedingEvents: FeedingEvent[];
  medicationEvents: MedicationEvent[];
  changeLines: ChangeLine[];
} & Pet;