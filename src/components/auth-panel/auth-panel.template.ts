import { html } from "@microsoft/fast-element";
import type { AuthPanel } from "./auth-panel";

export const AuthPanelTemplate = html<AuthPanel>`
  <form @submit="${(x, c) => c.event.preventDefault()}">
    ${(x) =>
      x.isLoggedIn
        ? html`<p>ברוך הבא, ${x.currentUser?.phoneNumber ?? "אורח"}</p>`
        : html`
            <label>
              מספר טלפון:
              <input
                type="tel"
                value="${(x) => x.phone}"
                @input="${(x, c) => x.handleInput("phone", c.event)}"
                required
              />
            </label>
            <button type="button" @click="${(x, c) => x.sendSMS(c.event)}">
              שלח קוד
            </button>

            ${x.smsSent
              ? html`
                  <label>
                    קוד אימות:
                    <input
                      type="text"
                      value="${(x) => x.smsCode}"
                      @input="${(x, c) => x.handleInput("smsCode", c.event)}"
                      required
                    />
                  </label>
                  <button
                    type="button"
                    @click="${(x, c) => x.verifyCode(c.event)}"
                  >
                    אמת והתחבר
                  </button>
                `
              : ""}
          `}
  </form>
`;
