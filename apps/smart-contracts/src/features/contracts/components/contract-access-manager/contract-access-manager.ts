import { FASTElement, attr, observable } from "@microsoft/fast-element";
import { functions } from "@services/firebase-config";
import { httpsCallable } from "firebase/functions";
import type { ContractAccess, Role } from "@features/contracts/models";

export class ContractAccessManager extends FASTElement {
  @attr({ attribute: "contract-id" }) contractId = "";
  @observable accessUsers: ContractAccess[] = [];
  @observable accessLoading = false;
  @observable accessError: string | null = null;
  @observable inviteUid = "";
  @observable inviteRole: Role = "viewer";
  @observable inviteLoading = false;
  @observable inviteError: string | null = null;

  connectedCallback() {
    super.connectedCallback();
    this.loadAccessUsers();
  }

  async loadAccessUsers() {
    if (!this.contractId) return;
    this.accessLoading = true;
    this.accessError = null;
    try {
      const getContractUsers = httpsCallable(functions, "getContractUsers");

      const result = await getContractUsers({ contractId: this.contractId });
      this.accessUsers = result.data as ContractAccess[];
    } catch (err: any) {
      this.accessError = err.message || "Failed to load users.";
    } finally {
      this.accessLoading = false;
    }
  }

  async inviteUser() {
    if (!this.contractId || !this.inviteUid) return;
    this.inviteLoading = true;
    this.inviteError = null;
    try {
      const grantContractAccess = httpsCallable(
        functions,
        "grantContractAccess"
      );
      await grantContractAccess({
        contractId: this.contractId,
        uid: this.inviteUid,
        role: this.inviteRole,
      });
      this.inviteUid = "";
      this.inviteRole = "viewer";
      await this.loadAccessUsers();
    } catch (err: any) {
      this.inviteError = err.message || "Failed to invite user.";
    } finally {
      this.inviteLoading = false;
    }
  }

  async removeUser(uid: string) {
    if (!this.contractId || !uid) return;
    try {
      const revokeContractAccess = httpsCallable(
        functions,
        "revokeContractAccess"
      );
      await revokeContractAccess({ contractId: this.contractId, uid });
      await this.loadAccessUsers();
    } catch (err: any) {
      this.accessError = err.message || "Failed to remove user.";
    }
  }
}
