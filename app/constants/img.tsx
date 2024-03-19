'use client';
import { Id } from "@/convex/_generated/dataModel";

export function getFileUrl(fileId: Id<"_storage">): string {
  return `https://energized-dalmatian-74.convex.cloud/api/storage/${fileId}`;
}
