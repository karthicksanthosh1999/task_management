import { ReactNode } from "react";
import { Provider } from "react-redux";
import { render } from "@testing-library/react";
import { ThemeProvider } from "@/app/providers/themeProvider";
import UserAuthProvider from "@/app/providers/authProvider";
import { Toaster } from "sonner";
import { store } from "@/app/store/store";

export function renderWithProviders(ui: ReactNode) {
    return render(<Provider store={store}>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange>
            <UserAuthProvider>
                {ui}
                <Toaster position="bottom-right" />
            </UserAuthProvider>
        </ThemeProvider>
    </Provider>);
}
