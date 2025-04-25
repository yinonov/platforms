// src/components/user-auth/user-auth.template.ts
import { html, when } from "@microsoft/fast-element";
import type { UserAuth } from "./user-auth";

export const UserAuthTemplate = html<UserAuth>`
  ${when(
    (x) => !x.user,
    html<UserAuth>`
      <div class="login">
        <button @click=${(x) => x.loginWithGoogle()}>התחבר עם Google</button>

        <div class="phone-auth">
          <input
            type="tel"
            placeholder="הזן טלפון"
            @input=${(x, c) =>
              (x.phone = (c.event.target as HTMLInputElement).value)}
          />
          <button
            @click=${(x) => x.sendPhoneCode()}
            ?disabled=${(x) => !x.phone}
          >
            שלח קוד
          </button>

          ${when(
            (x) => x.codeSent,
            html<UserAuth>`
              <input
                type="text"
                placeholder="הזן קוד"
                @input=${(x, c) =>
                  (x.code = (c.event.target as HTMLInputElement).value)}
              />
              <button
                @click=${(x) => x.verifyPhoneCode()}
                ?disabled=${(x) => !x.code}
              >
                אימות
              </button>
            `
          )}
        </div>
      </div>
    `,
    html<UserAuth>`
      <div class="profile">
        <span
          >שלום,
          ${(x) =>
            x.user?.displayName || x.user?.phoneNumber || x.user?.email}</span
        >
        <button @click=${(x) => x.logout()}>התנתק</button>
      </div>
    `
  )}
`;
