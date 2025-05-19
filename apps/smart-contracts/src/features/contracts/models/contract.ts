// src/models/contract.ts
export type Role = "viewer" | "editor" | "owner";

export interface Contract {
  id?: string;
  type: string; // e.g. "rental" | "service"
  title: string;
  content: string;
  metadata: Record<string, string>;
  status: "draft" | "generated" | "signed";
  // createdBy: string; // using contractAccess collection instead
  createdAt: string;
}

// Join collection for contract-user access
export interface ContractAccess {
  contractId: string;
  uid: string;
  role: Role;
  addedAt: string;
}

export interface Invitation {
  id?: string;
  contractId: string;
  email: string;
  role: Role;
  status: "pending" | "accepted" | "expired";
  expiry: string; // ISO date string
  createdAt: string;
}
