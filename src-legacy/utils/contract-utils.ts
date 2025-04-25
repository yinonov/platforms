// src/utils/contract-utils.ts
import type { Contract } from "../models/contract";

export function normalizeMetadata(
  metadata: Partial<Contract["metadata"]>
): Contract["metadata"] {
  return {
    landlord: metadata.landlord || "לא צויין משכיר",
    tenant: metadata.tenant || "לא צויין שוכר",
    address: metadata.address || "לא צויין כתובת",
    rent: metadata.rent || "0",
  };
}

export function generateTitleFromMetadata(
  metadata: Contract["metadata"]
): string {
  const base = `${metadata.landlord} <> ${metadata.tenant}`;
  const loc = metadata.address?.split(",")[0] || "מיקום לא ידוע";
  return `${base} (${loc})`;
}
