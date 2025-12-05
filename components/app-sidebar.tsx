"use client";

import * as React from "react";
import {
  Icon,
  IconDashboard,
  IconFolder,
  IconInnerShadowTop,
  IconListDetails,
  IconMessage,
  IconUser,
} from "@tabler/icons-react";
import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { IUser } from "@/app/types/userTypes";
import { useSession } from "next-auth/react";
import NavNews from "./NavNews";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: session } = useSession();
  const user = session?.user;
  const userType = session?.user?.role;

  type TLinks = { title: string; url: string; icon: Icon };
  type TUserTypeNavbar = { navMain: TLinks[] };

  const ROUTES = {
    common: [
      { title: "Dashboard", url: "/dashboard", icon: IconDashboard },
    ],

    adminOnly: [
      { title: "Work", url: "/work", icon: IconListDetails },
      { title: "Projects", url: "/projects", icon: IconFolder },
      { title: "Users", url: "/users", icon: IconUser },
      { title: "Ai-Chat", url: "/chat", icon: IconMessage },
    ],

    employeeOnly: [{ title: "Work", url: "/work", icon: IconListDetails }],
  } as const;

  const navData: TUserTypeNavbar = {
    navMain: [
      ...ROUTES.common,
      ...(userType === "Admin" ? ROUTES.adminOnly : ROUTES.employeeOnly),
    ],
  };

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5">
              <Link href={"#"}>
                <IconInnerShadowTop className="!size-5" />
                <span className="text-base font-semibold">
                  {user?.company ?? "N/A"}
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navData.navMain} />
        <NavNews />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user as IUser} />
      </SidebarFooter>
    </Sidebar>
  );
}
