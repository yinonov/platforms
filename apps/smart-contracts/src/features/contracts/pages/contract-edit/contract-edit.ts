import { FASTElement, observable, Updates } from "@microsoft/fast-element";
import {
  type ContractTemplate,
  contractTemplateMap,
} from "@features/contracts/templates/contract-templates";
import { auth, functions } from "@services/index";
import { httpsCallable } from "firebase/functions";
import type { Contract } from "@features/contracts/models";
import { createContract } from "@features/contracts/services";
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
    const base = {
      type: this.template.type,
      title: this.template.title,
      content,
      metadata: values,
      status: "generated" as const, // <-- fix here
      createdBy: auth.currentUser.uid,
      createdAt: new Date().toISOString(),
    };
    const contractId = await createContract(base);
    Router.go(`/contract/${contractId}`);
  }
}
