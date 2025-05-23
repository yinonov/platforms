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
    component: "leads-home",
    action: async () => {
      await import("@app/pages/home");
      return;
    },
  },
  {
    path: "/login/:to?",
    component: "leads-login",
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
    path: "/dashboard",
    component: "leads-user-dashboard",
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
];
