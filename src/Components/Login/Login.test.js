import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Login from "./Login";
import { AuthProvider } from "../../Context/AuthContext";
import { Permissionservice } from "../../Services/Permissionservice.ts";
import { Userservice } from "../../Services/Userservice";
import { Router } from "react-router";

jest.mock("../../Services/Userservice");

jest.mock("../../Services/Permissionservice.ts");

describe("Login", () => {
  beforeEach(() => {
    // Clear any previous mock implementation
    Userservice.checkUserExists.mockClear();
    Permissionservice.fetchPermissionDetail.mockClear();
  });

  test("renders login form without crashing", () => {
    render(
      <AuthProvider>
        <Login />
      </AuthProvider>
    );

    const usernameInput = screen.getByLabelText("User Name");
    const passwordInput = screen.getByLabelText("Password");
    const signInButton = screen.getByText("Sign in");

    expect(usernameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(signInButton).toBeInTheDocument();
  });

  test("displays error message if username is not provided", async () => {
    render(
      <AuthProvider>
        <Login />
      </AuthProvider>
    );

    const signInButton = screen.getByText("Sign in");
    fireEvent.click(signInButton);

    await waitFor(() => {
      const errorMessage = screen.getByText("User name is required");
      expect(errorMessage).toBeInTheDocument();
    });
  });

  test("displays error message if password is not provided", async () => {
    render(
      <AuthProvider>
        <Login />
      </AuthProvider>
    );

    const usernameInput = screen.getByLabelText("User Name");
    const signInButton = screen.getByText("Sign in");

    fireEvent.change(usernameInput, { target: { value: "john.doe" } });
    fireEvent.click(signInButton);

    await waitFor(() => {
      const errorMessage = screen.getByText("Password is required");
      expect(errorMessage).toBeInTheDocument();
    });
  });

  test("displays error message if user does not exist", async () => {
    Userservice.checkUserExists.mockResolvedValueOnce(false);

    render(
      <Router>
        <AuthProvider>
          <Login />
        </AuthProvider>
      </Router>
    );

    const usernameInput = screen.getByLabelText("User Name");
    const passwordInput = screen.getByLabelText("Password");
    const signInButton = screen.getByText("Sign in");

    fireEvent.change(usernameInput, { target: { value: "john.doe" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.click(signInButton);

    await waitFor(() => {
      const errorMessage = screen.getByText("john.doe does not exist!");
      expect(errorMessage).toBeInTheDocument();
    });

    expect(Userservice.checkUserExists).toHaveBeenCalledWith("john.doe");
  });

  test("sets user detail and permission info on successful login", async () => {
    const mockUser = { id: 1, username: "john.doe", role_id: 2 };
    const mockPermissions = { access: ["read", "write"] };

    Userservice.checkUserExists.mockResolvedValueOnce(true);
    Permissionservice.fetchPermissionDetail.mockResolvedValueOnce(
      mockPermissions
    );

    render(
      <AuthProvider>
        <Login />
      </AuthProvider>
    );

    const usernameInput = screen.getByLabelText("User Name");
    const passwordInput = screen.getByLabelText("Password");
    const signInButton = screen.getByText("Sign in");

    fireEvent.change(usernameInput, { target: { value: "john.doe" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.click(signInButton);

    await waitFor(() => {
      expect(screen.queryByText("john.doe does not exist!")).toBeNull();
    });

    expect(Userservice.checkUserExists).toHaveBeenCalledWith("john.doe");
    expect(Permissionservice.fetchPermissionDetail).toHaveBeenCalledWith(2);
    // You can also assert other behaviors after successful login, like navigation
  });
});
