import { html, when } from "@microsoft/fast-element";
import type { ContractForm } from "./contract-form";

export const ContractFormTemplate = html<ContractForm>`
  ${(x) => x.landlord}1
  <form @submit="${(x, c) => x.handleSubmit(c.event)}">
    <label>
      משכיר:
      <input
        type="text"
        value="${(x) => x.landlord}"
        @input="${(x, c) => x.handleInput("landlord", c.event)}"
      />
    </label>

    <label>
      שוכר:
      <input
        type="text"
        value="${(x) => x.tenant}"
        @input="${(x, c) => x.handleInput("tenant", c.event)}"
      />
    </label>

    <label>
      כתובת הנכס:
      <input
        type="text"
        value="${(x) => x.address}"
        @input="${(x, c) => x.handleInput("address", c.event)}"
      />
    </label>

    <label>
      שכר דירה (ש"ח):
      <input
        type="text"
        value="${(x) => x.rent}"
        @input="${(x, c) => x.handleInput("rent", c.event)}"
      />
    </label>

    <label>
      תקופת שכירות:
      <input
        type="text"
        value="${(x) => x.period}"
        @input="${(x, c) => x.handleInput("period", c.event)}"
      />
    </label>

    <label>
      תאריך התחלה:
      <input
        type="date"
        value="${(x) => x.startDate}"
        @input="${(x, c) => x.handleInput("startDate", c.event)}"
      />
    </label>

    <button type="submit">צור חוזה</button>
  </form>

  ${when((x) => x.isLoading, html`<p>טוען חוזה...</p>`)}
  ${when(
    (x) => x.generatedContract,
    html`
      <hr />
      <h3>החוזה שנוצר:</h3>
      <pre id="contract" style="white-space: pre-wrap; direction: rtl;">
(מבוסס על מבנה חוזה מקובל לפי לשכת עורכי הדין בישראל)

${(x) => x.generatedContract}

  </pre
      >

      <!-- ✅ חתימה מוצגת רק לאחר יצירת חוזה -->
      <p style="direction: rtl; font-style: italic;">
        אנא קרא את החוזה המלא לפני שתאשר ותחתום עליו.
      </p>
      <signature-panel
        @signed="${(x, c) => x.handleSigned(c.event as CustomEvent)}"
      ></signature-panel>

      ${when(
        (x) => x.signerName && x.signedAt && x.isApproved,
        html`
          <p style="direction: rtl; font-style: italic;">
            נחתם ע״י: ${(x) => x.signerName}<br />
            טלפון מאומת: ${(x) => x.phone}<br />
            תאריך: ${(x) => x.signedAt}
          </p>
          <button @click="${(x) => x.downloadAsSignedPDF()}">
            הורד חוזה חתום כ־PDF
          </button>
        `
      )}
    `
  )}
`;
