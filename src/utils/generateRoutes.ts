import type { ISidebaritems } from "@/types";

export const generateRoutes = (sidebarItems: ISidebaritems[]) => {
  return sidebarItems.flatMap((section) =>
    section.items.map((route) => ({
      path: route.url,
      Component: route.component,
    }))
  );
};

