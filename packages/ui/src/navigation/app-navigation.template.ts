import { html, ref, slotted } from "@microsoft/fast-element";
import type { AppNavigation } from "./app-navigation";

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
    <div class="nav-links">
      <slot name="links" ${slotted("linksNodes")}></slot>
    </div>
    <div
      style="margin-inline-start: auto; display: flex; gap: 0.5rem; align-items: center;"
    >
      <slot name="end"> </slot>
    </div>
  </nav>
  <sl-drawer
    label="Navigation"
    class="nav-drawer"
    placement="start"
    ${ref("drawer")}
  >
    <div class="drawer-links" ${ref("drawerLinksContainer")}></div>
  </sl-drawer>
`;
