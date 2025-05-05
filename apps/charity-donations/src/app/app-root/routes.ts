import type { CampaignDetail } from "@features/campaigns/pages/campaign-detail/campaign-detail";
import { auth } from "@services/firebase-config";
import type { Commands, Route, RouteContext } from "@vaadin/router";
import { signOut } from "firebase/auth";
// import { About } from '../pages/about';
// import { CampaignsList } from '../pages/campaigns-list';
// import { CampaignDetail } from '../pages/campaign-detail';
// import { UserDashboard } from '../pages/user-dashboard';
// import { AdminDashboard } from '../pages/admin-dashboard';
// import { DonationForm } from '../pages/donation-form';

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
    component: "c-home",
    action: async () => {
      await import("@app/pages/home");
      return;
    },
  },
  {
    path: "/login/:to?",
    component: "c-login",
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
  // {
  //   path: "/create-contract",
  //   component: "c-contract-edit",
  //   action: async () => {
  //     await import("@features/contracts/pages/contract-edit");
  //     return;
  //   },
  // },
  // {
  //   path: "/edit-contract/:id",
  //   component: "c-contract-edit",
  //   action: async () => {
  //     await import("@features/contracts/pages/contract-edit");
  //     return;
  //   },
  // },
  // {
  //   path: "/contract/:id",
  //   component: "c-contract",
  //   action: async (context: RouteContext): Promise<HTMLElement> => {
  //     await import("@features/contracts/pages/contract");
  //     const el = document.createElement("contract") as Contract;
  //     el.contractId = context.params.id as string;
  //     return el;
  //   },
  // },
  // {
  //   path: "/dashboard",
  //   component: "c-user-dashboard",
  //   action: async (context: RouteContext, commands: Commands) => {
  //     if (!(await isAuthenticated())) {
  //       return commands.redirect(
  //         "/login/" + encodeURIComponent(location.pathname)
  //       );
  //     }
  //     await import("@features/user/pages/user-dashboard");
  //     return;
  //   },
  // },
  {
    path: "/campaigns",
    component: "c-campaigns-list",
    action: async () => {
      await import("@features/campaigns/pages/campaigns-list");
      return;
    },
  },
  {
    path: "/campaigns/create",
    component: "c-campaign-create",
    action: async () => {
      await import("@features/campaigns/pages/campaign-create");
      return;
    },
  },
  {
    path: "/campaigns/:id",
    // component: "c-campaign-detail",
    action: async (context: RouteContext) => {
      await import("@features/campaigns/pages/campaign-detail");
      const el = document.createElement("c-campaign-detail") as CampaignDetail;
      el.campaignId = context.params.id as string;
      return el;
    },
  },

  // { path: 'about', component: About },
  // { path: 'campaigns', component: CampaignsList },
  // { path: 'campaigns/:id', component: CampaignDetail },
  // { path: 'dashboard', component: UserDashboard },
  // { path: 'admin', component: AdminDashboard },
  // { path: 'donate', component: DonationForm },
];
