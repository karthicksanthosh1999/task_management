"use client";
import { ReactNode, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import LoginPage from "../login/page";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { fetchLoginUser } from "../features/authSlices";
import GlobalLoading from "../loading";

type TProps = {
  children: ReactNode;
};

const UserAuthProvider = ({ children }: TProps) => {
  const { user, loading } = useAppSelector(state => state.auth)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchLoginUser());
  }, [dispatch]);

  if (!user) {
    return <LoginPage />;
  }

  if (loading) {
    return <GlobalLoading />
  }
  return <div>
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
      </SidebarInset>
    </SidebarProvider>
  </div>;
};

export default UserAuthProvider;
