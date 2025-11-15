"use client";
import { ReactNode, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { fetchLoginUser } from "../features/authSlices";
import GlobalLoading from "../loading";
import { usePathname, useRouter } from "next/navigation";

type TProps = {
  children: ReactNode;
};

const UserAuthProvider = ({ children }: TProps) => {
  const { user, loading } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const pathname = usePathname();

  const publicRoutes = ["/login", "/signup"];

  useEffect(() => {
    dispatch(fetchLoginUser());
  }, [dispatch]);

  useEffect(() => {
    if (!user && !publicRoutes.includes(pathname)) {
      router.replace("/login");
    }
  }, [user, pathname, router]);

  useEffect(() => {
    if (user && publicRoutes.includes(pathname)) {
      router.replace("/dashboard");
    }
  }, [user, pathname, router]);

  if (loading) return <GlobalLoading />;

  const isPublic = publicRoutes.includes(pathname);

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }>
      {/* Sidebar only for private routes */}
      {!isPublic && user && <AppSidebar variant="inset" />}

      <SidebarInset>
        {/* Header only for private routes */}
        {!isPublic && user && <SiteHeader />}

        <div className="p-3">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default UserAuthProvider;
