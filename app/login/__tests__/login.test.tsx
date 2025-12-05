import { LoginForm } from "@/components/login-form";
import { mockPush } from "@/tests/setup";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";


describe("Login Page", () => {
    test("Check renders the login form elements", () => {
        render(<LoginForm />);

        // CHECK THE TASK MANAGER TITLE
        expect(screen.getByText(/Task Manager/)).toBeInTheDocument();

        // CHECK THE INPUTS
        expect(screen.getByPlaceholderText("Enter email")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Enter password")).toBeInTheDocument();

        // CHECK THE LOGIN BUTTON
        expect(screen.getByRole("button", { name: "Login" })).toBeInTheDocument();
    })

    test("Update inputs fields on change", () => {
        render(<LoginForm />)

        // INPUT TEST DATA
        const emailValues = "admin@jk.net";
        const passwordValues = "12345";

        // GET THE ALL INPUTS 
        const emailInput = screen.getByPlaceholderText("Enter email");
        const passwordInput = screen.getByPlaceholderText("Enter password");

        fireEvent.change(emailInput, { target: { value: emailValues } });
        fireEvent.change(passwordInput, { target: { value: passwordValues } })

        expect(emailInput).toHaveValue(emailValues)
        expect(passwordInput).toHaveValue(passwordValues)
    })

    test("Submit the form", async () => {
        render(<LoginForm />)

        // INPUT TEST DATA
        const emailValues = "admin@jk.net";
        const passwordValues = "12345";

        // GET THE ALL INPUTS 
        const emailInput = screen.getByPlaceholderText("Enter email");
        const passwordInput = screen.getByPlaceholderText("Enter password");

        fireEvent.change(emailInput, { target: { value: emailValues } });
        fireEvent.change(passwordInput, { target: { value: passwordValues } })

        const loginButton = screen.getByRole("button", { name: "Login" });
        fireEvent.click(loginButton);

        await waitFor(() => {
            expect(mockPush).toHaveBeenCalledWith("/dashboard");
        });
    })
});
