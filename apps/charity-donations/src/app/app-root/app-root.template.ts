// src/app/app-root.template.ts
import { html } from "@microsoft/fast-element";
import type { AppRoot } from "./app-root";
import { NavLink } from "@components/ui/src/navigation/models";

export const AppRootTemplate = html<AppRoot>`
  <header>
    <app-navigation
      :auth="${(x) => x.auth}"
      :links="${() => [
        { label: "בית", href: "/" },
        { label: "קמפיינים", href: "/campaigns" }
      ] as NavLink[]}"
    >
      <firebase-auth-menu
        slot="end"
        :auth="${(x) => x.auth}"
      ></firebase-auth-menu>
    </app-navigation>
  </header>
  <slot></slot>
`;
