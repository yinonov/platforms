import { html } from "@microsoft/fast-element";
import type { FirebaseAuth } from "./firebase-auth";

export const FirebaseAuthTemplate = html<FirebaseAuth>` ${(x) =>
  x.currentUser
    ? html`
        <sl-card class="welcome" style="padding: 1rem; text-align: center;">
          <p>
            ברוך הבא,
            ${x.currentUser.phoneNumber || x.currentUser.email || "משתמש"}!
          </p>
          <sl-button
            variant="primary"
            @click="${(x) => x.signOut()}"
            ?disabled="${x.loading}"
          >
            התנתק
          </sl-button>
        </sl-card>
      `
    : html`
        <sl-card
          class="auth-container"
          style="max-width: 350px; margin: 1rem auto; padding: 1.5rem;"
        >
          <sl-button
            variant="default"
            @click="${(x) => x.signInAsGuest()}"
            ?disabled="${x.loading}"
            style="width: 100%;"
          >
            המשך כאורח
          </sl-button>
          <sl-divider style="margin: 1rem 0;"></sl-divider>

          ${(x) =>
            x.loading
              ? html` <div class="spinner">טוען...</div> `
              : html`
                  ${(x) =>
                    x.errorMessage
                      ? html`
                          <sl-alert
                            open
                            variant="danger"
                            style="margin-bottom: 1rem;"
                          >
                            ${x.errorMessage}
                          </sl-alert>
                        `
                      : null}
                  <sl-tab-group
                    placement="top"
                    @sl-tab-show="${(e, c) =>
                      (x.authMethod = (c.event as CustomEvent).detail.name)}"
                  >
                    <sl-tab slot="nav" panel="email">📧 אימייל</sl-tab>
                    <sl-tab slot="nav" panel="phone">📱 טלפון</sl-tab>
                    <sl-tab slot="nav" panel="google">🔵 גוגל</sl-tab>

                    <sl-tab-panel name="email">
                      <sl-input
                        type="email"
                        placeholder="אימייל"
                        value="${(x) => x.email}"
                        @input="${(e, c) =>
                          (x.email = (
                            c.event.target as HTMLInputElement
                          ).value)}"
                        style="margin-bottom: 1rem;"
                      ></sl-input>
                      <sl-input
                        type="password"
                        placeholder="סיסמה"
                        value="${(x) => x.password}"
                        @input="${(e, c) =>
                          (x.password = (
                            c.event.target as HTMLInputElement
                          ).value)}"
                        style="margin-bottom: 1rem;"
                      ></sl-input>
                      <sl-button
                        variant="primary"
                        @click="${(x) => x.signIn()}"
                        ?disabled="${x.loading}"
                      >
                        התחבר
                      </sl-button>
                    </sl-tab-panel>
                    <sl-tab-panel name="phone">
                      <sl-input
                        type="tel"
                        placeholder="מספר טלפון"
                        value="${(x) => x.phoneNumber}"
                        @input="${(e, c) =>
                          (x.phoneNumber = (
                            c.event.target as HTMLInputElement
                          ).value)}"
                        style="margin-bottom: 1rem;"
                      ></sl-input>
                      <sl-button
                        variant="primary"
                        @click="${(x) => x.sendPhoneCode()}"
                        ?disabled="${x.loading}"
                      >
                        שלח קוד אימות
                      </sl-button>
                      <sl-input
                        type="text"
                        placeholder="קוד אימות"
                        value="${(x) => x.smsCode}"
                        @input="${(e, c) =>
                          (x.smsCode = (
                            c.event.target as HTMLInputElement
                          ).value)}"
                        style="margin: 1rem 0;"
                      ></sl-input>
                      <sl-button
                        variant="success"
                        @click="${(x) => x.signIn()}"
                        ?disabled="${x.loading}"
                      >
                        אמת והתחבר
                      </sl-button>
                    </sl-tab-panel>
                    <sl-tab-panel name="google">
                      <sl-button
                        variant="primary"
                        @click="${(x) => x.signIn()}"
                        ?disabled="${x.loading}"
                      >
                        התחבר עם גוגל
                      </sl-button>
                    </sl-tab-panel>
                  </sl-tab-group>
                  <div style="margin-top: 1.5rem; text-align: center;"></div>
                `}
        </sl-card>
      `}`;
