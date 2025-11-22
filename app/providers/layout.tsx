"use client";
import React, { ReactNode } from "react";
import { ThemeProvider } from "./themeProvider";
import { Provider } from "react-redux";
import { store } from "../store/store";
import { Toaster } from "sonner";
import UserAuthProvider from "./authProvider";
import { SessionProvider } from "next-auth/react";

const MainLayout = ({ children }: { children: ReactNode }) => {

  return (
    <SessionProvider>
      <Provider store={store}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange>
          <UserAuthProvider>
            {children}
            <Toaster position="bottom-right" />
          </UserAuthProvider>
        </ThemeProvider>
      </Provider>
    </SessionProvider>
  );
};

export default MainLayout;
