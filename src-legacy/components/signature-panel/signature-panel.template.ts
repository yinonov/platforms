// components/signature-panel/signature-panel.template.ts
import { html } from "@microsoft/fast-element";
import type { SignaturePanel } from "./signature-panel";

export const SignaturePanelTemplate = html<SignaturePanel>`
  <form
    @submit.prevent="verifyCodeAndSign"
    style="display: flex; flex-direction: column; gap: 1rem; max-width: 400px;"
  >
    <div>
      <label>שם מלא</label><br />
      <input
        type="text"
        value="${(x) => x.signerName}"
        @input="${(x, c) =>
          (x.signerName = (c.event.target as HTMLInputElement).value)}"
        required
      />
    </div>

    <div>
      <label>מספר טלפון</label><br />
      <input
        type="tel"
        value="${(x) => x.phone}"
        @input="${(x, c) =>
          (x.phone = (c.event.target as HTMLInputElement).value)}"
        ?disabled="${(x) => x.sent}"
        required
      />
      <button
        type="button"
        @click="sendCode"
        ?disabled="${(x) => x.loading || x.sent}"
      >
        שלח קוד
      </button>
    </div>

    ${(x) =>
      x.sent
        ? html`
            <div>
              <label>קוד אימות</label><br />
              <input
                type="text"
                value="${(x) => x.code}"
                @input="${(x, c) =>
                  (x.code = (c.event.target as HTMLInputElement).value)}"
                required
              />
            </div>
            <button type="submit" ?disabled="${(x) => x.loading}">
              אמת וחתום
            </button>
          `
        : ""}
    ${(x) => (x.loading ? html`<p>טוען...</p>` : "")}
    ${(x) => (x.error ? html`<p style="color: red">${x.error}</p>` : "")}

    <div id="recaptcha-container" style="display: none;"></div>
  </form>
`;
