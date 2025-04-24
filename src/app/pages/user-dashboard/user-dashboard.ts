// user-dashboard.ts
import { FASTElement, observable } from "@microsoft/fast-element";
import { Contract } from "../../../models/contract";
import { fetchUserContracts } from "../../../firebase";
import { userContext } from "../../../context";

export class UserDashboard extends FASTElement {
  @observable contracts: Contract[] = [];

  async connectedCallback() {
    super.connectedCallback();
    const user = userContext.currentUser;
    if (user) {
      this.contracts = await fetchUserContracts(user.uid);
    }
  }
}
