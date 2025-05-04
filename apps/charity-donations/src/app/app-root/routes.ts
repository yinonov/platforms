import { auth } from "@services/firebase-config";
import type { Commands, Route, RouteContext } from "@vaadin/router";
import { signOut } from "firebase/auth";
// import { AboutView } from '../pages/about-view';
// import { CampaignsListView } from '../pages/campaigns-list-view';
// import { CampaignDetailView } from '../pages/campaign-detail-view';
// import { UserDashboardView } from '../pages/user-dashboard-view';
// import { AdminDashboardView } from '../pages/admin-dashboard-view';
// import { DonationFormView } from '../pages/donation-form-view';

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
    component: "home-view",
    action: async () => {
      await import("@app/pages/home-view");
      return;
    },
  },
  {
    path: "/login/:to?",
    component: "login-view",
    action: async () => {
      await import("@features/user/pages/login-view");
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
  //   component: "contract-edit",
  //   action: async () => {
  //     await import("@features/contracts/pages/contract-edit");
  //     return;
  //   },
  // },
  // {
  //   path: "/edit-contract/:id",
  //   component: "contract-edit",
  //   action: async () => {
  //     await import("@features/contracts/pages/contract-edit");
  //     return;
  //   },
  // },
  // {
  //   path: "/contract/:id",
  //   component: "contract-view",
  //   action: async (context: RouteContext): Promise<HTMLElement> => {
  //     await import("@features/contracts/pages/contract-view");
  //     const el = document.createElement("contract-view") as ContractView;
  //     el.contractId = context.params.id as string;
  //     return el;
  //   },
  // },
  // {
  //   path: "/dashboard",
  //   component: "user-dashboard",
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
  // { path: 'about', component: AboutView },
  // { path: 'campaigns', component: CampaignsListView },
  // { path: 'campaigns/:id', component: CampaignDetailView },
  // { path: 'dashboard', component: UserDashboardView },
  // { path: 'admin', component: AdminDashboardView },
  // { path: 'donate', component: DonationFormView },
];
