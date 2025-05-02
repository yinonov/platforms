// src/models/contract.ts

export interface Contract {
  id?: string;
  type: string; // e.g. "rental" | "service"
  title: string;
  content: string;
  metadata: Record<string, string>;
  status: "draft" | "generated" | "signed";
  createdBy: string;
  createdAt: string;
}
