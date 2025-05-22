import { html, ref, repeat } from "@microsoft/fast-element";
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
      ${repeat(
        (x) => x.links,
        html`<sl-button variant="text" href="${(x) => x.href}"
          >${(x) => x.label}</sl-button
        >`
      )}
    </div>
    <div
      style="margin-inline-start: auto; display: flex; gap: 0.5rem; align-items: center;"
    >
      <slot name="end"> </slot>
    </div>
  </nav>
  <sl-drawer
    label="ניווט"
    class="nav-drawer"
    placement="start"
    style="--size: 40vw;"
    ${ref("drawer")}
  >
    <nav>
      <ul style="list-style: none; padding: 0; margin: 0;">
        ${repeat(
          (x) => x.links,
          html`<li>
            <sl-button variant="text" href="${(x) => x.href}"
              >${(x) => x.label}</sl-button
            >
          </li>`
        )}
      </ul>
    </nav>
  </sl-drawer>
`;
