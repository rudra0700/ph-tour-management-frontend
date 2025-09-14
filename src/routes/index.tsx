import App from "@/App";
import DashboardLayout from "@/components/layout/DashboardLayout";
import About from "@/pages/About";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Verify from "@/pages/Verify";
import { generateRoutes } from "@/utils/generateRoutes";
import { createBrowserRouter, Navigate } from "react-router";
import { adminSidebarItem } from "./adminSidebarItems";
import { userSidebarItem } from "./userSidebarItems";
import { withAuth } from "@/utils/withAuth";
import Unauthorized from "@/pages/Unauthorized";
import { role } from "@/constants/role";
import type { TRole } from "@/types";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        Component: withAuth(About),
        path: "about",
      },
    ],
  },

  {
    Component: withAuth(DashboardLayout, role.superAdmin as TRole),
    path: "/admin",
    children: [
      {index: true, element: <Navigate to="/admin/analytics"></Navigate>},
      ...generateRoutes(adminSidebarItem)
    ],
  },

  {
    Component: DashboardLayout,
    path: "/user",
    children: [
       {index: true, element: <Navigate to="/user/bookings"></Navigate>},
      ...generateRoutes(userSidebarItem)
    ],
  },

  {
    Component: Login,
    path: "/login",
  },

  {
    Component: Register,
    path: "/register",
  },

  {
    Component: Verify,
    path: "/verify",
  }, 
  
  {
    Component: Unauthorized,
    path: "/unauthorized",
  },
]);
