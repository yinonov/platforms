import { html, when } from "@microsoft/fast-element";
import type { SignaturePanel } from "./signature-panel";

export const SignaturePanelTemplate = html<SignaturePanel>`
  <form class="card">
    <h3>אימות זהות לחתימה</h3>

    <label for="signerName">
      שם החותם:
      <input
        name="signerName"
        id="signerName"
        type="text"
        value="${(x) => x.signerName}"
        @input="${(x, c) => x.handleInput("signerName", c.event)}"
        required
      />
    </label>

    <label for="phone">
      מספר טלפון:
      <input
        name="phone"
        id="phone"
        type="tel"
        value="${(x) => x.phone}"
        @input="${(x, c) => x.handleInput("phone", c.event)}"
        required
      />
    </label>

    <button type="button" @click="${(x, c) => x.sendSMS(c.event)}">
      שלח קוד אימות
    </button>

    ${when(
      (x) => x.smsSent,
      html`
        <label for="smsCode">
          קוד אימות:
          <input
            name="smsCode"
            id="smsCode"
            type="text"
            value="${(x) => x.smsCode}"
            @input="${(x, c) => x.handleInput("smsCode", c.event)}"
            required
          />
        </label>
        <button type="button" @click="${(x, c) => x.verifyCode(c.event)}">
          אמת קוד
        </button>
      `
    )}

    <label>
      <input
        name="approval"
        type="checkbox"
        ?checked="${(x) => x.isApproved}"
        @change="${(x, c) => x.handleCheckbox(c.event)}"
        required
      />
      אני מאשר/ת את תוכן החוזה
    </label>

    <p id="error-message" style="color: red; font-size: 0.9rem;"></p>
  </form>

  ${(x) =>
    x.isPhoneVerified && x.signerName && x.isApproved
      ? html` <p style="color: green;">✔ חתימה בוצעה בתאריך: ${x.signedAt}</p> `
      : ""}
`;
