"use client";
import React, { ReactNode } from "react";
import { ThemeProvider } from "./themeProvider";
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
          {children}
          <Toaster position="bottom-right" />
        </UserAuthProvider>
      </ThemeProvider>
    </Provider>
  );
};

export default MainLayout;
