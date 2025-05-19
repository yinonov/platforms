import { FASTElement, observable, Updates } from "@microsoft/fast-element";
import {
  type ContractTemplate,
  contractTemplateMap,
} from "@features/contracts/templates/contract-templates";
import { auth, functions } from "@services/index";
import { httpsCallable } from "firebase/functions";
import type { Contract } from "@features/contracts/models";
import { Router } from "@vaadin/router";

export class ContractEdit extends FASTElement {
  @observable contractTypes = Object.keys(contractTemplateMap);
  @observable selectedType = this.contractTypes[0] || "";
  @observable template?: ContractTemplate;

  connectedCallback() {
    super.connectedCallback();
    Updates.enqueue(() => {
      this.handleTemplateSelect(this.contractTypes[0]);
    });
  }

  handleTemplateSelect(type: string) {
    this.selectedType = type;
    this.template = contractTemplateMap[type];
  }

  async handleSubmit(values: Record<string, any>) {
    if (!auth.currentUser) {
      alert("נא להתחבר כדי להמשיך");
      return;
    }
    let response;
    if (this.template?.type === "rental") {
      response = await httpsCallable(
        functions,
        "generateRentalContract"
      )(values);
    } else if (this.template?.type === "service") {
      response = await httpsCallable(
        functions,
        "generateServiceContract"
      )(values);
    } else if (this.template?.type === "last-will") {
      response = await httpsCallable(
        functions,
        "generateLastWillContract"
      )(values);
    } else {
      alert("סוג חוזה לא נתמך");
      return;
    }
    const content = (response.data as any).contractText;
    // Call backend function to create contract and contractAccess atomically
    const createContractWithAccess = httpsCallable(
      functions,
      "createContractWithAccess"
    );
    const contractData = {
      contractType: this.template.type,
      contractData: {
        type: this.template.type,
        title: this.template.title,
        content,
        metadata: values,
        status: "generated",
        createdAt: new Date().toISOString(),
      },
    };
    const result = await createContractWithAccess(contractData);
    const contractId = (result.data as { contractId?: string })?.contractId;
    Router.go(`/contract/${contractId}`);
  }
}
