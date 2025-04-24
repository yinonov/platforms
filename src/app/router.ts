// router.ts
import { Router } from "@vaadin/router";

export function initRouter(outlet: HTMLElement) {
  const router = new Router(outlet);

  router.setRoutes([
    {
      path: "/",
      component: "home-view",
      action: async () => {
        await import("./pages/home-view");
        return;
      },
    },
    {
      path: "/dashboard",
      component: "user-dashboard",
      action: async () => {
        await import("./pages/user-dashboard");
        return;
      },
    },
    {
      path: "/create",
      component: "create-contract",
      action: async () => {
        await import("./pages/create-contract");
        return;
      },
    },
    {
      path: "/contract/:id",
      component: "contract-view",
      action: async () => {
        await import("./pages/contract-view");
        return;
      },
    },
    {
      path: "(.*)",
      redirect: "/",
    },
  ]);
}
