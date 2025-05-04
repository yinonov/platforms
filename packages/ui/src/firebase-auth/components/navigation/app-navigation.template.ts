import { html, ref } from "@microsoft/fast-element";
import type { AppNavigation } from "./app-navigation";

const LinksTemplate = html<AppNavigation>`
  <sl-button variant="text" @click="${(x) => x.closeDrawer()}" href="/">Home</sl-button>
  <sl-button variant="text" @click="${(x) => x.closeDrawer()}" href="/about">About</sl-button>
  <sl-button variant="text" @click="${(x) => x.closeDrawer()}" href="/campaigns">Campaigns</sl-button>
  <sl-button variant="text" @click="${(x) => x.closeDrawer()}" href="/donation">Donate</sl-button>
  <sl-button variant="text" @click="${(x) => x.closeDrawer()}" href="/user">Dashboard</sl-button>
  <sl-button variant="text" @click="${(x) => x.closeDrawer()}" href="/admin">Admin</sl-button>
`;

export const AppNavigationTemplate = html<AppNavigation>`
  <nav
    style="display: flex; align-items: center; gap: 1rem; padding: 0.5rem 1rem; background: var(--sl-color-neutral-0); border-radius: 0.5rem; box-shadow: 0 2px 8px #0001;"
  >
    <sl-icon-button
      name="list"
      library="bootstrap"
      class="nav-menu-btn"
      style="font-size: 1.5rem; display: none;"
      @click="${(x: AppNavigation) => x.openDrawer()}"
      aria-label="Open menu"
    ></sl-icon-button>
    <div class="nav-links">${LinksTemplate}</div>
    <div style="margin-inline-start: auto; display: flex; gap: 0.5rem; align-items: center;">
      <firebase-auth-menu></firebase-auth-menu>
    </div>
  </nav>
  <sl-drawer
    label="Navigation"
    class="nav-drawer"
    placement="start"
    ${ref("drawer")}
  >
    ${LinksTemplate}
  </sl-drawer>
`;
