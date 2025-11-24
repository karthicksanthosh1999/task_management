"use client";

import { ReactNode } from "react";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { useSession } from "next-auth/react";
import GlobalLoading from "../loading";
import Snowfall from "react-snowfall";

type TProps = {
  children: ReactNode;
};

const UserAuthProvider = ({ children }: TProps) => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center">
        <GlobalLoading />
      </div>
    );
  }

  // 🔴 If NOT logged in → do NOT render sidebar/header
  if (!session) {
    return <div className="p-3">{children}</div>;
  }

  // 🟢 Logged in → show sidebar + header
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="p-3">{children}</div>
        <Snowfall />
      </SidebarInset>
    </SidebarProvider>
  );
};

export default UserAuthProvider;
