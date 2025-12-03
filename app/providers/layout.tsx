"use client";
import React, { ReactNode } from "react";
import { ThemeProvider } from "./themeProvider";
import { Provider } from "react-redux";
import { store } from "../store/store";
import { Toaster } from "sonner";
import UserAuthProvider from "./authProvider";
import { SessionProvider } from "next-auth/react";
import NewsProvider from "../context/providers/newsProvider";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const MainLayout = ({ children }: { children: ReactNode }) => {

  const queryClient = new QueryClient()
  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        {/* NEWS CONTEXT */}
        <NewsProvider>
          <Provider store={store}>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange>
              <UserAuthProvider>
                {children}
                <ReactQueryDevtools position="bottom" />
                <Toaster position="bottom-right" />
              </UserAuthProvider>
            </ThemeProvider>
          </Provider>
        </NewsProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
};

export default MainLayout;
