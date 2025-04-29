import { FASTElement, attr, observable } from "@microsoft/fast-element";
import { listenToContract } from "@features/contracts/services/firestore-service";
import type { Contract } from "@features/contracts/models";

export class ContractView extends FASTElement {
  @attr contractId = "";
  @observable contract: Contract | null = null;
  @observable loading = false;
  @observable error: string | null = null;
  private unsubscribe: (() => void) | null = null;

  connectedCallback() {
    super.connectedCallback();
    if (this.contractId) {
      this.loading = true;
      this.unsubscribe = listenToContract(this.contractId, (contract) => {
        this.contract = contract;
        this.error = contract ? null : "Contract not found.";
        this.loading = false;
      });
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if (this.unsubscribe) {
      this.unsubscribe();
      this.unsubscribe = null;
    }
  }

  // Placeholder for sharing logic
  shareContract() {
    // TODO: Implement sharing logic
  }

  // Placeholder for signature logic
  signContract() {
    // TODO: Implement signature logic
  }
}

export default ContractView;
