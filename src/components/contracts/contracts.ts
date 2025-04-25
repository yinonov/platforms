// components/contracts/contracts.ts
import { FASTElement, observable } from "@microsoft/fast-element";
import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../../services/firebase-config";
import type { Contract } from "../../models";

export class Contracts extends FASTElement {
  @observable myContracts: Contract[] = [];
  @observable sharedWithMe: Contract[] = [];

  async connectedCallback() {
    super.connectedCallback();
    const userId = auth.currentUser?.uid;
    if (!userId) return;

    const myContractsSnap = await getDocs(
      query(collection(db, "contracts"), where("ownerId", "==", userId))
    );

    const sharedSnap = await getDocs(
      query(
        collection(db, "contracts"),
        where("participants", "array-contains", userId)
      )
    );

    this.myContracts = myContractsSnap.docs.map(
      (doc) => ({ id: doc.id, ...doc.data() } as Contract)
    );
    this.sharedWithMe = sharedSnap.docs.map(
      (doc) => ({ id: doc.id, ...doc.data() } as Contract)
    );
  }
}
