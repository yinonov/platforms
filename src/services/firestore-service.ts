// src/services/firestore-service.ts
import { db } from "./firebase-config";
import {
  collection,
  doc,
  getDoc,
  setDoc,
  addDoc,
  updateDoc,
} from "firebase/firestore";
import type { Contract } from "../models/contract";

const contractsCollection = collection(db, "contracts");

export async function getContract(id: string): Promise<Contract | null> {
  const ref = doc(db, "contracts", id);
  const snap = await getDoc(ref);
  return snap.exists() ? ({ id: snap.id, ...snap.data() } as Contract) : null;
}

export async function saveContract(
  contract: Omit<Contract, "id">
): Promise<string> {
  const ref = await addDoc(contractsCollection, contract);
  return ref.id;
}

export async function updateContract(
  id: string,
  updates: Partial<Contract>
): Promise<void> {
  const ref = doc(db, "contracts", id);
  await updateDoc(ref, updates);
}
