import { html, css, LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import "@features/campaigns/pages/campaigns-list";
import "@features/campaigns/pages/campaign-detail";

@customElement("app-root")
export class AppRoot extends LitElement {
  static styles = css`
    :host {
      display: block;
      padding: 16px;
    }
  `;

  render() {
    return html`
      <h1>Welcome to the Campaign Manager</h1>
      <campaign-list></campaign-list>
    `;
  }
}
