import { auth, db } from "@services/firebase-config";
import {
  collection,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  addDoc,
  onSnapshot,
  query,
  where,
  orderBy,
  documentId,
} from "firebase/firestore";
import type { Contract } from "@features/contracts/models";
import { onAuthStateChanged } from "firebase/auth";

const contractsCollection = collection(db, "contracts");

export const createContract = async (contract: Contract) => {
  const docRef = await addDoc(contractsCollection, contract);
  return docRef.id;
};

export const getContract = async (contractId: string) => {
  const docRef = doc(db, "contracts", contractId);
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists()) {
    throw new Error("Contract not found");
  }
  return docSnap.data() as Contract;
};

/**
 * מאזין לחוזים של היוזר הנוכחי בזמן אמת
 * @param callback מקבל מערך טיפוסי של חוזים
 */
export const listenToContracts = (
  callback: (contracts: Contract[]) => void
) => {
  let unsubscribeAccess: (() => void) | null = null;
  let unsubscribeContracts: (() => void) | null = null;

  const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
    if (unsubscribeAccess) {
      unsubscribeAccess();
      unsubscribeAccess = null;
    }
    if (unsubscribeContracts) {
      unsubscribeContracts();
      unsubscribeContracts = null;
    }

    if (user) {
      const accessRef = collection(db, "contractAccess");
      const accessQuery = query(accessRef, where("uid", "==", user.uid));
      unsubscribeAccess = onSnapshot(accessQuery, async (accessSnapshot) => {
        const contractIds = accessSnapshot.docs.map(
          (doc) => doc.data().contractId
        );
        if (unsubscribeContracts) {
          unsubscribeContracts();
          unsubscribeContracts = null;
        }
        if (contractIds.length === 0) {
          callback([]);
          return;
        }
        // Firestore 'in' queries are limited to 10 items. If more, split into chunks.
        const chunkSize = 10;
        const chunks = [];
        for (let i = 0; i < contractIds.length; i += chunkSize) {
          chunks.push(contractIds.slice(i, i + chunkSize));
        }
        let allContracts: Contract[] = [];
        let unsubscribers: (() => void)[] = [];
        let completed = 0;
        chunks.forEach((chunk) => {
          const contractsRef = collection(db, "contracts");
          const contractsQuery = query(contractsRef, where(documentId(), "in", chunk));
          console.log("contractsQuery", contractsQuery);
          const unsub = onSnapshot(contractsQuery, (contractsSnapshot) => {
            // Merge all contracts from all chunks
            const contracts: Contract[] = contractsSnapshot.docs.map((doc) => ({
              id: doc.id,
              ...(doc.data() as Omit<Contract, "id">),
            }));
            // Replace contracts from this chunk in allContracts
            allContracts = allContracts.filter(
              (c) => !chunk.includes(c.id as string)
            );
            allContracts = allContracts.concat(contracts);
            completed++;
            if (completed === chunks.length) {
              callback(allContracts);
            }
          });
          unsubscribers.push(unsub);
        });
        unsubscribeContracts = () => {
          unsubscribers.forEach((u) => u());
        };
      });
    } else {
      callback([]); // אין יוזר? רשימה ריקה
    }
  });

  return () => {
    if (unsubscribeAccess) unsubscribeAccess();
    if (unsubscribeContracts) unsubscribeContracts();
    unsubscribeAuth();
  };
};

/**
 * מאזין לחוזה בודד בזמן אמת
 * @param contractId מזהה החוזה
 * @param callback פונקציה שמקבלת את החוזה או null אם לא קיים
 * @returns פונקציית ביטול ההאזנה
 */
export const listenToContract = (
  contractId: string,
  callback: (contract: Contract | null) => void
) => {
  const docRef = doc(db, "contracts", contractId);
  return onSnapshot(
    docRef,
    (snap) => {
      if (snap.exists()) {
        callback({ id: snap.id, ...snap.data() } as Contract);
      } else {
        callback(null);
      }
    },
    (error) => {
      callback(null);
    }
  );
};

export const updateContract = async (
  contractId: string,
  data: Partial<Contract>
) => {
  const docRef = doc(db, "contracts", contractId);
  await updateDoc(docRef, data);
};

export const deleteContract = async (contractId: string) => {
  const docRef = doc(db, "contracts", contractId);
  await deleteDoc(docRef);
};
