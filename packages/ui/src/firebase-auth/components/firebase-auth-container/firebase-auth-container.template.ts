import { html, when } from "@microsoft/fast-element";
import type { FirebaseAuthContainer } from "./firebase-auth-container";
import { getDisplayName } from "../../../services/user-display-name";

export const FirebaseAuthContainerTemplate = html<FirebaseAuthContainer>` ${(
  x: FirebaseAuthContainer
) =>
  x.currentUser
    ? html`
        <sl-card class="welcome" style="padding: 1rem; text-align: center;">
          <p>
            ברוך הבא,
            ${getDisplayName(x.currentUser)}!
          </p>
          <sl-button
            variant="primary"
            @click="${(x: FirebaseAuthContainer) => x.signOut()}"
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
          ${(x: FirebaseAuthContainer) =>
            x.loading
              ? html`
                  <sl-spinner
                    style="display: block; margin: 2rem auto;"
                  ></sl-spinner>
                `
              : html`
                  ${(x: FirebaseAuthContainer) =>
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
                      : html``}
                  <div class="auth-method-toggle">
                    <sl-radio-group
                      size="small"
                      value="${(x: FirebaseAuthContainer) => x.authMethod}"
                      @sl-change="${(e, c) =>
                        (x.authMethod = (c.event.target as HTMLInputElement)
                          .value as "email" | "phone")}"
                    >
                      <sl-radio-button value="email">אימייל</sl-radio-button>
                      <sl-radio-button value="phone">טלפון</sl-radio-button>
                    </sl-radio-group>
                  </div>

                  <div class="auth-fields">
                    ${when(
                      (x: FirebaseAuthContainer) => x.authMethod === "email",
                      html`
                        <sl-input
                          type="email"
                          name="email"
                          placeholder="אימייל"
                          value="${(x: FirebaseAuthContainer) => x.email}"
                          autofocus
                          @input="${(e, c) => {
                            (x as FirebaseAuthContainer).email = (
                              c.event.target as HTMLInputElement
                            ).value;
                            (x as FirebaseAuthContainer).errorMessage = "";
                          }}"
                        ></sl-input>
                        <sl-input
                          type="password"
                          name="password"
                          placeholder="סיסמה"
                          value="${(x: FirebaseAuthContainer) => x.password}"
                          @input="${(e, c) => {
                            (x as FirebaseAuthContainer).password = (
                              c.event.target as HTMLInputElement
                            ).value;
                            (x as FirebaseAuthContainer).errorMessage = "";
                          }}"
                        ></sl-input>
                        <sl-button
                          variant="primary"
                          @click="${(x: FirebaseAuthContainer) => x.signIn()}"
                          ?disabled="${x.loading}"
                        >
                          התחבר
                        </sl-button>
                      `
                    )}
                    ${when(
                      (x: FirebaseAuthContainer) => x.authMethod === "phone",
                      html`
                        <sl-input
                          type="tel"
                          name="phone"
                          placeholder="מספר טלפון"
                          value="${(x: FirebaseAuthContainer) => x.phoneNumber}"
                          autofocus
                          @input="${(e, c) => {
                            (x as FirebaseAuthContainer).phoneNumber = (
                              c.event.target as HTMLInputElement
                            ).value;
                            (x as FirebaseAuthContainer).errorMessage = "";
                          }}"
                        ></sl-input>
                        <sl-button
                          variant="primary"
                          @click="${(x: FirebaseAuthContainer) =>
                            x.sendPhoneCode()}"
                          ?disabled="${x.loading || x.phoneCodeSent}"
                        >
                          שלח קוד אימות
                        </sl-button>
                        ${when(
                          (x: FirebaseAuthContainer) => x.phoneCodeSent,
                          html`
                            <sl-input
                              type="text"
                              name="smsCode"
                              placeholder="קוד אימות"
                              value="${(x: FirebaseAuthContainer) => x.smsCode}"
                              autofocus
                              @input="${(e, c) => {
                                (x as FirebaseAuthContainer).smsCode = (
                                  c.event.target as HTMLInputElement
                                ).value;
                                (x as FirebaseAuthContainer).errorMessage = "";
                              }}"
                            ></sl-input>
                            <sl-button
                              variant="success"
                              @click="${(x: FirebaseAuthContainer) =>
                                x.signIn()}"
                              ?disabled="${x.loading}"
                            >
                              אמת והתחבר
                            </sl-button>
                          `
                        )}
                      `
                    )}
                  </div>

                  <sl-divider style="margin: 1.5rem 0;"></sl-divider>
                  <div class="auth-actions">
                    <sl-button
                      variant="default"
                      @click="${(x: FirebaseAuthContainer) => { x.authMethod = 'google'; x.signIn(); }}"
                      ?disabled="${x.loading}"
                    >
                      <img
                        src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                        alt="Google"
                        style="height: 1.3em; vertical-align: middle; margin-inline-end: 0.5em; background: transparent;"
                      />
                      התחבר עם גוגל
                    </sl-button>
                    <sl-button
                      variant="danger"
                      @click="${(x: FirebaseAuthContainer) =>
                        x.signInAsGuest()}"
                      ?disabled="${x.loading}"
                    >
                      המשך כאורח
                    </sl-button>
                  </div>
                `}
        </sl-card>
      `}`;
