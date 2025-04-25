// services/pdf-export.ts
import html2pdf from "html2pdf.js";
import type { SignatureData } from "../models";

export async function exportContractToPDF(
  element: HTMLElement,
  signature: SignatureData
) {
  const clone = element.cloneNode(true) as HTMLElement;
  const footer = document.createElement("div");
  footer.innerHTML = `
    <hr/>
    <p style="direction: rtl; font-style: italic;">
      נחתם ע״י: ${signature.signerName}<br/>
      מספר טלפון מאומת: ${signature.phone}<br/>
      תאריך: ${signature.signedAt}
    </p>
  `;
  clone.appendChild(footer);

  await html2pdf().from(clone).save("contract.pdf");
}
