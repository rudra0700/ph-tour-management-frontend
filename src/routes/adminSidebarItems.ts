import AddDivision from "@/pages/Admin/AddDivision";
import { AddTour } from "@/pages/Admin/AddTour";
import AddTourType from "@/pages/Admin/AddTourType";
// import Analytics from "@/pages/Admin/Analytics";
import type { ISidebaritems } from "@/types";
import { lazy } from "react";

const Analytics = lazy(() => import("@/pages/Admin/Analytics"));
export const adminSidebarItem: ISidebaritems[] = [
  {
    title: "Dashboard",
    items: [
      {
        title: "Analytics",
        url: "/admin/analytics",
        component: Analytics,
      },
    ],
  },
  {
    title: "Tour management",
    items: [
      {
        title: "Add Tour Type",
        url: "/admin/add-tour-type",
        component: AddTourType,
      },
      {
        title: "Add Division",
        url: "/admin/add-division",
        component: AddDivision,
      },
      {
        title: "Add tour",
        url: "/admin/add-tour",
        component: AddTour,
      },
    ],
  },
];
