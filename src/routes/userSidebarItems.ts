import Bookings from "@/pages/User/Bookings";
import type { ISidebaritems } from "@/types";

export const userSidebarItem: ISidebaritems[] = [
  {
    title: "History",
    items: [
      {
        title: "Boookings",
        url: "/user/bookings",
        component: Bookings,
      },
    ],
  },
];
