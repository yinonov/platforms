// src/firebase/firestore-service.ts
import { db } from "./firebase-config";
import {
  collection,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  addDoc,
  where,
  query,
  getDocs,
} from "firebase/firestore";
import type { Contract } from "../models/contract";

export async function getUserContracts(uid: string): Promise<Contract[]> {
  const contractsRef = collection(db, "contracts");
  const q = query(contractsRef, where("signers", "array-contains", { uid }));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<Contract, "id">),
  }));
}

export async function getContract(id: string): Promise<Contract | null> {
  const ref = doc(db, "contracts", id);
  const snap = await getDoc(ref);
  return snap.exists() ? ({ id: snap.id, ...snap.data() } as Contract) : null;
}

export async function saveContract(
  contract: Omit<Contract, "id">
): Promise<string> {
  const ref = await addDoc(collection(db, "contracts"), contract);
  return ref.id;
}

export async function updateContract(
  id: string,
  contract: Partial<Omit<Contract, "id">>
): Promise<void> {
  const ref = doc(db, "contracts", id);
  await updateDoc(ref, contract);
}
