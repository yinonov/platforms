// src/app/app-root.ts
import { FASTElement } from "@microsoft/fast-element";
import { Router } from "@vaadin/router";
import { auth } from "@services/index";
// preload home-view
import "@pages/home-view";
//import "@pages/contract-view";

const isAuthenticated = async () => {
  return new Promise((resolve) => {
    const unsub = auth.onAuthStateChanged((user) => {
      unsub();
      resolve(!!user);
    });
  });
};

const requireAuth = async () => {
  const loggedIn = await isAuthenticated();
  if (!loggedIn) {
    window.location.href = "/login"; // או עמוד אחר
    return false;
  }
  return true;
};

const routes = [
  { path: "/", redirect: "/home" },
  {
    path: "/home",
    component: "home-view",
  },
  {
    path: "/contract",
    component: "edit-contract",
    action: async () => {
      await import("@pages/edit-contract");
      return;
    },
    conditions: [requireAuth],
  },
  {
    path: "/contract/:id",
    component: "edit-contract",
    action: async () => {
      await import("@pages/edit-contract");
      return;
    },
    conditions: [requireAuth],
  },
  {
    path: "/dashboard",
    component: "user-dashboard",
    action: async () => {
      await import("@pages/user-dashboard");
      return;
    },
    conditions: [requireAuth],
  },
  // {
  //   path: "/contract-view",
  //   component: "contract-view",
  // },
];
export class AppRoot extends FASTElement {
  connectedCallback() {
    super.connectedCallback();
    const router = new Router(this);
    router.setRoutes(routes);
  }
}
