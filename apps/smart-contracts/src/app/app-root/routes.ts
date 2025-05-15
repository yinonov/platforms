import type { ContractDetail } from "@features/contracts/pages/contract-detail/contract-detail";
import { auth } from "@services/firebase-config";
import type { Commands, Route, RouteContext } from "@vaadin/router";
import { signOut } from "firebase/auth";

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
    window.location.href = "/home";
    return false;
  }
  return true;
};

export const routes: Route[] = [
  {
    path: "/",
    component: "sc-home",
    action: async () => {
      await import("@app/pages/home");
      return;
    },
  },
  {
    path: "/login/:to?",
    component: "sc-login",
    action: async () => {
      await import("@features/user/pages/login");
      return;
    },
  },
  {
    path: "/logout",
    action: async (context: RouteContext, commands: Commands) => {
      await signOut(auth);
      return commands.redirect("/");
    },
  },
  {
    path: "/create-contract",
    component: "sc-contract-edit",
    action: async () => {
      await import("@features/contracts/pages/contract-edit");
      return;
    },
  },
  // ! not sure this is correct at this point
  // {
  //   path: "/edit-contract/:id",
  //   component: "sc-contract-edit",
  //   action: async () => {
  //     await import("@features/contracts/pages/contract-edit");
  //     return;
  //   },
  // },
  {
    path: "/contract/:id",
    // component: "sc-contract-detail",
    action: async (context: RouteContext) => {
      await import("@features/contracts/pages/contract-detail");
      const el = document.createElement("sc-contract-detail") as ContractDetail;
      el.contractId = context.params.id as string;
      return el;
    },
  },
  {
    path: "/dashboard",
    component: "sc-user-dashboard",
    action: async (context: RouteContext, commands: Commands) => {
      if (!(await isAuthenticated())) {
        return commands.redirect(
          "/login/" + encodeURIComponent(location.pathname)
        );
      }
      await import("@features/user/pages/user-dashboard");
      return;
    },
  },
  // {
  //   path: "/contract",
  //   component: "sc-contract",
  // },
];
