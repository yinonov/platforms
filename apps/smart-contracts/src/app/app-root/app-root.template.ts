// src/app/app-root.template.ts
import { html } from "@microsoft/fast-element";
import type { AppRoot } from "./app-root";
import { NavLink } from "@components/ui/src/navigation/models";

export const AppRootTemplate = html<AppRoot>`
  <header>
    <ui-app-navigation
      :auth="${(x) => x.auth}"
      :links="${() =>
        [
          { label: "בית", href: "/" },
          { label: "יצירת חוזה", href: "/create-contract" },
          { label: "אזור אישי", href: "/dashboard" },
        ] as NavLink[]}"
    >
      <ui-firebase-auth-menu
        slot="end"
        :auth="${(x) => x.auth}"
      ></ui-firebase-auth-menu>
    </ui-app-navigation>
  </header>
  <slot></slot>
`;
