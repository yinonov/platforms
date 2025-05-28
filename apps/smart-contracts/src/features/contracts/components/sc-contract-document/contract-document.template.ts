import { html } from "@microsoft/fast-element";
import type { ContractDocument } from "./contract-document";

export const ContractDocumentTemplate = html<ContractDocument>`
  <div class="contract-body" :innerHTML="${(x) => x.html}"></div>
`;
