// src/app/pages/user-dashboard/user-dashboard.ts
import { FASTElement, observable } from "@microsoft/fast-element";
import { auth, db } from "../../../services/firebase-config";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import type { Contract } from "../../../models/contract";

export class UserDashboard extends FASTElement {
  @observable myContracts: Contract[] = [];
  @observable loading = true;
  @observable error: string | null = null;
  private unsubscribe: (() => void) | null = null;

  connectedCallback() {
    super.connectedCallback();

    const user = auth.currentUser;
    if (!user) {
      this.error = "חייבים להיות מחוברים כדי להציג חוזים.";
      this.loading = false;
      return;
    }

    const q = query(
      collection(db, "contracts"),
      where("createdBy", "==", user.uid)
    );
    this.unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        this.myContracts = snapshot.docs.map(
          (doc) => ({ id: doc.id, ...doc.data() } as Contract)
        );
        this.loading = false;
      },
      (error) => {
        console.error(error);
        this.error = "שגיאה בטעינת חוזים.";
        this.loading = false;
      }
    );
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this.unsubscribe) {
      this.unsubscribe();
    }
  }
}
