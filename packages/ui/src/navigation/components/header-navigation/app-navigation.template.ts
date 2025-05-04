import { html, ref } from "@microsoft/fast-element";
import type { AppNavigation } from "./app-navigation";

const LinksTemplate = html<AppNavigation>`
  <sl-button variant="text" @click="${(x) => x.closeDrawer()}" href="/"
    >בית</sl-button
  >
  <sl-button
    variant="text"
    @click="${(x) => x.closeDrawer()}"
    href="/create-contract"
    >יצירת חוזה</sl-button
  >
  <sl-button variant="text" @click="${(x) => x.closeDrawer()}" href="/dashboard"
    >אזור אישי</sl-button
  >
`;

export const AppNavigationTemplate = html<AppNavigation>`
  <nav
    style="display: flex; align-items: center; gap: 1rem; padding: 0.5rem 1rem; background: var(--sl-color-neutral-0); border-radius: 0.5rem; box-shadow: 0 2px 8px #0001;"
  >
    <!-- Menu button for small screens -->
    <sl-icon-button
      name="list"
      library="bootstrap"
      class="nav-menu-btn"
      style="font-size: 1.5rem; display: none;"
      @click="${(x: AppNavigation) => x.openDrawer()}"
      aria-label="פתח תפריט"
    ></sl-icon-button>
    <!-- Wide nav links -->
    <div class="nav-links">${LinksTemplate}</div>
    <div
      style="margin-inline-start: auto; display: flex; gap: 0.5rem; align-items: center;"
    >
      <firebase-auth-menu :auth="${(x: any) => (window as any).appAuth}">
      </firebase-auth-menu>
    </div>
  </nav>
  <!-- Drawer for mobile nav -->
  <sl-drawer
    label="ניווט"
    class="nav-drawer"
    placement="start"
    ${ref("drawer")}
  >
    ${LinksTemplate}
  </sl-drawer>
`;
