import { html, repeat, when } from "@microsoft/fast-element";
import type { ContractAccessManager } from "./contract-access-manager";
import { type ContractAccess, Role } from "@features/contracts/models";

export const ContractAccessManagerTemplate = html<ContractAccessManager>`
  <div style="margin-bottom: 2rem;">
    ${when(
      (x) => x.viewerIsOwner,
      html`<h3>ניהול שיתוף החוזה</h3>
        <form
          @submit=${(x, c) => {
            c.event.preventDefault();
            x.inviteUser();
          }}
          style="display: flex; flex-wrap: wrap; gap: 0.5rem; align-items: flex-end; margin-bottom: 1rem; max-width: 100%;
            --form-flex-direction: row;"
          class="responsive-invite-form"
        >
          <sl-input
            label="UID משתמש"
            placeholder="הכנס UID"
            value="${(x) => x.inviteUid}"
            @input=${(x, c) => {
              const target = c.event.target as HTMLInputElement;
              if (target) x.inviteUid = target.value;

              x.inviteUid = target.value;
            }}
            style="width: 200px; min-width: 0; flex: 1 1 120px;"
          ></sl-input>
          <sl-select
            label="הרשאה"
            value="${(x) => x.inviteRole}"
            @sl-change=${(x, c) => {
              const target = c.event.target as HTMLSelectElement;
              x.inviteRole = target.value as Role;
            }}
            style="width: 120px; min-width: 0; flex: 1 1 80px;"
          >
            <sl-option value="viewer">צפייה</sl-option>
            <sl-option value="editor">עריכה</sl-option>
          </sl-select>
          <sl-button
            variant="primary"
            type="submit"
            ?loading="${(x) => x.inviteLoading}"
            style="flex: 0 0 auto;"
            >הזמן</sl-button
          >
        </form>`
    )}
    ${when(
      (x) => x.inviteError,
      html`<sl-alert open variant="danger" style="margin-bottom: 1rem;"
        >${(x) => x.inviteError}</sl-alert
      >`
    )}
    <h4>משתמשים עם גישה</h4>
    ${when(
      (x) => x.accessLoading,
      html`<sl-spinner style="font-size: 1.5rem;"></sl-spinner>`,
      html<ContractAccessManager>`
        <div style="overflow-x: auto; width: 100%;">
          <table style="min-width: 100%; border-collapse: collapse;">
            <thead>
              <tr>
                <th style="text-align: right; max-width: 20ch;">UID</th>
                <th style="text-align: right; max-width: 10ch;">הרשאה</th>
                <th style="text-align: right; max-width: 18ch;">הצטרף בתאריך</th>
                <th style="max-width: 6ch;"></th>
              </tr>
            </thead>
            <tbody>
              ${repeat(
                (x) => x.accessUsers,
                html<any>`
                  <tr>
                    <td style="max-width: 20ch; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${(u: ContractAccess) => u.uid}</td>
                    <td style="max-width: 10ch; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
                      ${(u) =>
                        u.role === "owner"
                          ? "בעלים"
                          : u.role === "editor"
                          ? "עורך"
                          : "צופה"}
                    </td>
                    <td style="max-width: 18ch; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${(u) => new Date(u.addedAt).toLocaleString()}</td>
                    <td style="max-width: 6ch; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
                      ${when(
                        (u, c) => u.role !== "owner" && c.parent.viewerIsOwner,
                        html<any>`<sl-button
                          size="small"
                          variant="danger"
                          @click=${(x, c) => c.parent.removeUser(c.parent?.uid)}
                          >הסר</sl-button
                        >`
                      )}
                    </td>
                  </tr>
                `
              )}
            </tbody>
          </table>
        </div>
        ${when(
          (x) => x.accessError,
          html`<sl-alert open variant="danger" style="margin-top: 1rem;"
            >${(x) => x.accessError}</sl-alert
          >`
        )}
      `
    )}
  </div>
  <style>
    @media (max-width: 500px) {
      .responsive-invite-form {
        flex-direction: column !important;
        align-items: stretch !important;
      }
      .responsive-invite-form sl-input,
      .responsive-invite-form sl-select,
      .responsive-invite-form sl-button {
        width: 100% !important;
        min-width: 0 !important;
        flex: 1 1 100% !important;
      }
    }
  </style>
`;
