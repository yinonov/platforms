import { html } from "@microsoft/fast-element";
import { UserAuth } from "./user-auth";

export const UserAuthTemplate = html<UserAuth>`
  ${(x) =>
    x.currentUser
      ? html`
          <sl-card class="welcome" style="padding: 1rem; text-align: center;">
            <p>
              Welcome,
              ${x.currentUser.phoneNumber || x.currentUser.email || "User"}!
            </p>
            <sl-button
              variant="primary"
              @click="${(x) => x.signOut()}"
              ?disabled="${x.loading}"
            >
              Sign Out
            </sl-button>
          </sl-card>
        `
      : html`
          <sl-card
            class="auth-container"
            style="max-width: 350px; margin: 1rem auto; padding: 1.5rem;"
          >
            ${(x) =>
              x.loading
                ? html` <div class="spinner">Loading...</div> `
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
                      <sl-tab slot="nav" panel="email">📧 Email</sl-tab>
                      <sl-tab slot="nav" panel="phone">📱 Phone</sl-tab>
                      <sl-tab slot="nav" panel="google">🔵 Google</sl-tab>

                      <sl-tab-panel name="email">
                        <sl-input
                          type="email"
                          placeholder="Email"
                          value="${(x) => x.email}"
                          @input="${(e, c) =>
                            (x.email = (
                              c.event.target as HTMLInputElement
                            ).value)}"
                          style="margin-bottom: 1rem;"
                        ></sl-input>
                        <sl-input
                          type="password"
                          placeholder="Password"
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
                          Sign In
                        </sl-button>
                      </sl-tab-panel>
                      <sl-tab-panel name="phone">
                        <sl-input
                          type="tel"
                          placeholder="Phone Number"
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
                          Send Verification Code
                        </sl-button>
                        <sl-input
                          type="text"
                          placeholder="Verification Code"
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
                          Verify and Sign In
                        </sl-button>
                      </sl-tab-panel>
                      <sl-tab-panel name="google">
                        <sl-button
                          variant="primary"
                          @click="${(x) => x.signIn()}"
                          ?disabled="${x.loading}"
                        >
                          Sign In with Google
                        </sl-button>
                      </sl-tab-panel>
                    </sl-tab-group>
                  `}
          </sl-card>
        `}
`;
