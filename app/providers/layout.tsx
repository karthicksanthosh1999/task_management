"use client";
import React, { ReactNode } from "react";
import { ThemeProvider } from "./themeProvider";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { Provider } from "react-redux";
import { store } from "../store/store";
import { Toaster } from "sonner";
import UserAuthProvider from "./authProvider";

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <Provider store={store}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange>
        <UserAuthProvider>
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
              <Toaster position="bottom-right" />
              <div className="p-3">{children}</div>
            </SidebarInset>
          </SidebarProvider>
        </UserAuthProvider>
      </ThemeProvider>
    </Provider>
  );
};

export default MainLayout;
