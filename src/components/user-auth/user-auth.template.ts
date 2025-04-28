import { html } from "@microsoft/fast-element";
import { UserAuth } from "./user-auth";

export const UserAuthTemplate = html<UserAuth>`
  <!-- אם יש משתמש מחובר -->
  ${(x) =>
    x.currentUser
      ? html`
          <div class="welcome">
            <p>
              Welcome,
              ${x.currentUser.phoneNumber || x.currentUser.email || "User"}!
            </p>
            <button @click="${(x) => x.signOut()}" ?disabled="${x.loading}">
              Sign Out
            </button>
          </div>
        `
      : html`
          <!-- טופס התחברות -->
          <div class="auth-container">
            <!-- טעינה -->
            ${(x) =>
              x.loading
                ? html` <div class="spinner">Loading...</div> `
                : html`
                    <!-- הודעת שגיאה -->
                    ${(x) =>
                      x.errorMessage
                        ? html`
                            <div class="error-message">${x.errorMessage}</div>
                          `
                        : null}

                    <!-- בחירת סוג התחברות -->
                    <div class="auth-switcher">
                      <button
                        @click="${(x) => (x.authMethod = "email")}"
                        ?disabled="${x.authMethod === "email"}"
                      >
                        📧 Email
                      </button>
                      <button
                        @click="${(x) => (x.authMethod = "phone")}"
                        ?disabled="${x.authMethod === "phone"}"
                      >
                        📱 Phone
                      </button>
                      <button
                        @click="${(x) => (x.authMethod = "google")}"
                        ?disabled="${x.authMethod === "google"}"
                      >
                        🔵 Google
                      </button>
                    </div>

                    <!-- טפסים דינאמיים -->
                    ${(x) =>
                      x.authMethod === "email"
                        ? html`
                            <div class="email-login">
                              <input
                                type="email"
                                placeholder="Email"
                                @input="${(e) =>
                                  (x.email = (
                                    e.target as HTMLInputElement
                                  ).value)}"
                              />
                              <input
                                type="password"
                                placeholder="Password"
                                @input="${(e) =>
                                  (x.password = (
                                    e.target as HTMLInputElement
                                  ).value)}"
                              />
                              <button
                                @click="${(x) => x.signIn()}"
                                ?disabled="${x.loading}"
                              >
                                Sign In
                              </button>
                            </div>
                          `
                        : x.authMethod === "phone"
                        ? html`
                            <div class="phone-login">
                              <input
                                type="tel"
                                placeholder="Phone Number"
                                @input="${(e) =>
                                  (x.phoneNumber = (
                                    e.target as HTMLInputElement
                                  ).value)}"
                              />
                              <button
                                @click="${(x) => x.sendPhoneCode()}"
                                ?disabled="${x.loading}"
                              >
                                Send Verification Code
                              </button>
                              <input
                                type="text"
                                placeholder="Verification Code"
                                @input="${(e) =>
                                  (x.smsCode = (
                                    e.target as HTMLInputElement
                                  ).value)}"
                              />
                              <button
                                @click="${(x) => x.signIn()}"
                                ?disabled="${x.loading}"
                              >
                                Verify and Sign In
                              </button>
                            </div>
                          `
                        : html`
                            <div class="google-login">
                              <button
                                @click="${(x) => x.signIn()}"
                                ?disabled="${x.loading}"
                              >
                                Sign In with Google
                              </button>
                            </div>
                          `}
                  `}
          </div>
        `}
`;
