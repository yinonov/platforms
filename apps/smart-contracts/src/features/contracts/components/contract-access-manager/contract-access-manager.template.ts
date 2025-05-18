import { html, repeat, when } from "@microsoft/fast-element";
import type { ContractAccessManager } from "./contract-access-manager";
import { Role } from "@features/contracts/models";

export const ContractAccessManagerTemplate = html<ContractAccessManager>`
  <div style="margin-bottom: 2rem;">
    <h3>ניהול שיתוף החוזה</h3>
    <form
      @submit=${(x, c) => {
        c.event.preventDefault();
        x.inviteUser();
      }}
      style="display: flex; gap: 0.5rem; align-items: flex-end; margin-bottom: 1rem;"
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
        style="width: 200px;"
      ></sl-input>
      <sl-select
        label="הרשאה"
        value="${(x) => x.inviteRole}"
        @sl-change=${(x, c) => {
          const target = c.event.target as HTMLSelectElement;
          x.inviteRole = target.value as Role;
        }}
        style="width: 120px;"
      >
        <sl-option value="viewer">צפייה</sl-option>
        <sl-option value="editor">עריכה</sl-option>
      </sl-select>
      <sl-button
        variant="primary"
        type="submit"
        ?loading="${(x) => x.inviteLoading}"
        >הזמן</sl-button
      >
    </form>
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
        <table style="width: 100%; border-collapse: collapse;">
          <thead>
            <tr>
              <th style="text-align: right;">UID</th>
              <th style="text-align: right;">הרשאה</th>
              <th style="text-align: right;">הצטרף בתאריך</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            ${repeat(
              (x) => x.accessUsers,
              html<any>`
                <tr>
                  <td>${(u) => u.uid}</td>
                  <td>
                    ${(u) =>
                      u.role === "owner"
                        ? "בעלים"
                        : u.role === "editor"
                        ? "עורך"
                        : "צופה"}
                  </td>
                  <td>${(u) => new Date(u.addedAt).toLocaleString()}</td>
                  <td>
                    ${when(
                      (u) => u.role !== "owner",
                      html<any>`<sl-button
                        size="small"
                        variant="danger"
                        @click=${(x, c) => x.removeUser(c.parent?.uid)}
                        >הסר</sl-button
                      >`
                    )}
                  </td>
                </tr>
              `
            )}
          </tbody>
        </table>
        ${when(
          (x) => x.accessError,
          html`<sl-alert open variant="danger" style="margin-top: 1rem;"
            >${(x) => x.accessError}</sl-alert
          >`
        )}
      `
    )}
  </div>
`;
