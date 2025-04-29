import { auth } from "@features/user/services";

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

export const routes = [
  { path: "/", redirect: "/home" },
  {
    path: "/home",
    component: "home-view",
    action: async () => {
      await import("@app/pages/home-view");
      return;
    },
  },
  {
    path: "/create-contract",
    component: "contract-edit",
    action: async () => {
      await import("@features/contracts/pages/contract-edit");
      return;
    },
    conditions: [requireAuth],
  },
  {
    path: "/edit-contract/:id",
    component: "contract-edit",
    action: async () => {
      await import("@features/contracts/pages/contract-edit");
      return;
    },
    conditions: [requireAuth],
  },
  {
    path: "/contract/:id",
    component: "contract-view",
    action: async () => {
      await import("@features/contracts/pages/contract-view");
      return;
    },
    conditions: [requireAuth],
  },
  {
    path: "/dashboard",
    component: "user-dashboard",
    action: async () => {
      await import("@features/user/pages/user-dashboard");
      return;
    },
    conditions: [requireAuth],
  },
  // {
  //   path: "/contract-view",
  //   component: "contract-view",
  // },
];
