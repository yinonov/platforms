import type { Contract } from "@features/contracts/models";
import { FASTElement, observable } from "@microsoft/fast-element";
import { listenToContracts } from "@features/contracts/services";

export class UserDashboard extends FASTElement {
  @observable contracts: Contract[] = [];
  @observable loading = true;
  private unsubscribeContracts: (() => void) | null = null;

  connectedCallback() {
    super.connectedCallback();

    this.loading = true;

    this.unsubscribeContracts = listenToContracts((contracts) => {
      // Sort contracts by createdAt descending (newest first)
      this.contracts = contracts.slice().sort((a, b) => {
        const dateA = new Date(a.createdAt).getTime();
        const dateB = new Date(b.createdAt).getTime();
        return dateB - dateA;
      });
      this.loading = false;
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();

    if (this.unsubscribeContracts) {
      this.unsubscribeContracts();
      this.unsubscribeContracts = null;
    }
  }
}
