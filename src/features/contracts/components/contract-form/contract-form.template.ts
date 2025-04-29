import { html, repeat, when } from "@microsoft/fast-element";
import type { ContractForm } from "./contract-form";

export const ContractFormTemplate = html<ContractForm>`
  ${when(
    (x) => x.template,
    html<ContractForm>`
      <form
        @submit=${(x, c) => {
          c.event.preventDefault();
          x.submit();
        }}
      >
        <h3>${(x) => x.template!.label}</h3>

        ${repeat(
          (x) => Object.entries(x.metadata),
          html<[string, string]>`
            <div>
              <label>
                ${(x) => x[0]}:<br />
                <input
                  type="text"
                  value="${(x) => x[1]}"
                  @input="${(x, c) => c.parent.handleInput(c.event, x[0])}"
                />
              </label>
            </div>
          `
        )}

        <button type="submit">צור חוזה</button>
      </form>
    `,
    html`<p>טוען טופס...</p>`
  )}
`;
