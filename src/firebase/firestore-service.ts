// firestore-service.ts
import {
  doc,
  setDoc,
  collection,
  getDocs,
  query,
  where,
  addDoc,
} from "firebase/firestore";
import { User } from "firebase/auth";
import { db } from "./firebase-config";
import { Contract } from "../models/contract";

export async function saveUserToFirestore(user: User) {
  const ref = doc(db, "users", user.uid);
  await setDoc(
    ref,
    {
      uid: user.uid,
      phoneNumber: user.phoneNumber ?? null,
      email: user.email ?? null,
      displayName: user.displayName ?? null,
      photoURL: user.photoURL ?? null,
      lastLogin: new Date().toISOString(),
    },
    { merge: true }
  );
}

export async function fetchUserContracts(uid: string): Promise<Contract[]> {
  const contractsRef = collection(db, "contracts");
  const q = query(contractsRef, where("signers", "array-contains", { uid }));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<Contract, "id">),
  }));
}

export async function saveContract(
  contract: Omit<Contract, "id">
): Promise<string> {
  const contractsRef = collection(db, "contracts");
  const docRef = await addDoc(contractsRef, contract);
  return docRef.id;
}
