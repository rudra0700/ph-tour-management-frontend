import { role } from "@/constants/role";
import { adminSidebarItem } from "@/routes/adminSidebarItems";
import { userSidebarItem } from "@/routes/userSidebarItems";
import type { TRole } from "@/types";

export const getSidebarItems = (userRole: TRole) => {
  switch (userRole) {
    case role.superAdmin:
      return [...adminSidebarItem, ...userSidebarItem];
    case role.admin:
      return [...adminSidebarItem, ...userSidebarItem];
    case role.user:
      return [...userSidebarItem];
    default:
     return [];
  }
};
