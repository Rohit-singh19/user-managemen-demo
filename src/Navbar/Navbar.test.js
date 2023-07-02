import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Navbar from "./Navbar";

describe("Navbar", () => {
  test("renders the logo", () => {
    render(<Navbar />, { wrapper: MemoryRouter });
    const logo = screen.getByAltText("logo");
    expect(logo).toBeInTheDocument();
  });

  test("renders the Home link", () => {
    render(<Navbar />, { wrapper: MemoryRouter });
    const homeLink = screen.getByText("Home");
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute("href", "/");
  });

  test("renders the Permissions link when user has delete access", () => {
    const permissionInfo = { access: ["delete"] };
    render(<Navbar />, {
      wrapper: MemoryRouter,
      // Mocking the AuthContext value
      // You can provide the actual context value in your tests
      // using a custom context provider
      context: {
        permissionInfo: permissionInfo,
      },
    });
    const permissionsLink = screen.getByText("Permissions");
    expect(permissionsLink).toBeInTheDocument();
    expect(permissionsLink).toHaveAttribute("href", "/comp/permissions");
  });

  test("does not render the Permissions link when user does not have delete access", () => {
    const permissionInfo = { access: ["read", "write"] };
    render(<Navbar />, {
      wrapper: MemoryRouter,
      context: {
        permissionInfo: permissionInfo,
      },
    });
    const permissionsLink = screen.queryByText("Permissions");
    expect(permissionsLink).toBeNull();
  });

  test("calls the logout function when logout button is clicked", () => {
    const logoutMock = jest.fn();
    render(<Navbar />, {
      wrapper: MemoryRouter,
      context: {
        logout: logoutMock,
      },
    });
    const logoutButton = screen.getByTitle("logout");
    fireEvent.click(logoutButton);
    expect(logoutMock).toHaveBeenCalled();
  });
});
