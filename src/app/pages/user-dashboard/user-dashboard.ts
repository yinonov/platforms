import { FASTElement, observable } from "@microsoft/fast-element";
import { Contract } from "@models/contract";
import { listenToContracts } from "@services/index";

export class UserDashboard extends FASTElement {
  @observable contracts: Contract[] = [];
  @observable loading = true;
  private unsubscribeContracts: (() => void) | null = null;

  connectedCallback() {
    super.connectedCallback();

    this.loading = true;

    this.unsubscribeContracts = listenToContracts((contracts) => {
      this.contracts = contracts;
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
