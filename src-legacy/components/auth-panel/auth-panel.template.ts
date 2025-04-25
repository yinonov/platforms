import { html, when } from "@microsoft/fast-element";
import type { AuthPanel } from "./auth-panel";

const renderLoggedIn = html`<span
    >ברוך הבא,
    ${(x) => x.currentUser?.displayName ?? x.currentUser?.phoneNumber}</span
  >
  <a href="#" @click="${(x, c) => x.signOutUser(c.event)}">[התנתקות]</a>`;

const renderToggle = html`<a
  href="#"
  @click="${(x, c) => x.togglePanel(c.event)}"
>
  ${(x) => (x.isExpanded ? "סגור התחברות" : "התחברות למערכת")}
</a>`;

const renderPhoneForm = html`
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
    שלח קוד
  </button>
`;

const renderSmsCodeForm = html`
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
    אמת והתחבר
  </button>
`;

const renderGoogleButton = html`
  <button
    type="button"
    @click="${(x, c) => x.signInWithGoogle(c.event)}"
    style="background: #db4437;"
  >
    התחברות עם Google
  </button>
`;

export const AuthPanelTemplate = html<AuthPanel>`
  <div class="auth-toggle">
    ${(x) => (x.isLoggedIn ? renderLoggedIn : renderToggle)}
  </div>

  ${when(
    (x) => x.isExpanded && !x.isLoggedIn,
    html`
      <form class="card">
        <h3>כניסה עם טלפון או גוגל</h3>
        ${renderPhoneForm} ${when((x) => x.smsSent, renderSmsCodeForm)}
        <hr />
        ${renderGoogleButton}
        <p id="error-message" style="color: red; font-size: 0.9rem;"></p>
      </form>
    `
  )}
`;
