import { Pet } from "@/prisma/generated/client";
import {
  SeizureEvent,
  FeedingEvent,
  MedicationEvent,
  ChangeLine,
  ActivityEvent,
} from "@/prisma/generated/client";

export type PetWithRelations = {
  seizureEvents: SeizureEvent[];
  feedingEvents: FeedingEvent[];
  medicationEvents: MedicationEvent[];
  changeLines: ChangeLine[];
  activityEvents: ActivityEvent[];
} & Pet;