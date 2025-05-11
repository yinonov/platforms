// contract-share-service.ts
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { nanoid } from "nanoid";
import { db } from "../../../services/firebase-config";
import { httpsCallable } from "firebase/functions";
import { getFunctions } from "firebase/functions";

const CONTRACT_SHARES_COLLECTION = "contractShares";

export interface ContractShare {
  contractId: string;
  recipientEmail: string;
  linkId: string;
  createdAt: any;
  expiresAt: any;
  status: "pending" | "viewed" | "signed" | "declined" | "expired";
}

export async function createContractShare({
  contractId,
  recipientEmail,
  expiresInHours = 72,
}: {
  contractId: string;
  recipientEmail: string;
  expiresInHours?: number;
}): Promise<any> {
  const functions = getFunctions();
  const createShare = httpsCallable(functions, "createContractShare");
  const result = await createShare({
    contractId,
    recipientEmail,
    expiresInHours,
  });
  return result.data;
}

export function getShareLink(linkId: string): string {
  // Adjust the base URL as needed for your frontend
  return `${window.location.origin}/contract/share/${linkId}`;
}
