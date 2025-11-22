import { expect, test } from "vitest";
import { screen } from "@testing-library/react";
import { LoginForm } from "@/components/login-form";
import { renderWithProviders } from "@/tests/test-providers";

test("renders Login button in LoginForm", () => {
    renderWithProviders(<LoginForm />);
    expect(screen.getByText(/Task Manager/i)).toBeDefined();
});
