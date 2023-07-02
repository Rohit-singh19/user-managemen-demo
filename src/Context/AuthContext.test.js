import React from "react";
import { render, screen } from "@testing-library/react";
import { AuthContext, AuthProvider } from "./AuthContext";

describe("AuthProvider", () => {
  test("renders children without crashing", () => {
    render(
      <AuthProvider>
        <div>Test Children</div>
      </AuthProvider>
    );
    const children = screen.getByText("Test Children");
    expect(children).toBeInTheDocument();
  });

  test("sets and retrieves userDetail value correctly", () => {
    const userDetailMock = { name: "John Doe" };
    render(
      <AuthProvider>
        <AuthContext.Consumer>
          {(context) => {
            context.setUserDetail(userDetailMock);
            return null;
          }}
        </AuthContext.Consumer>
        <AuthContext.Consumer>
          {(context) => {
            expect(context.userDetail).toEqual(userDetailMock);
            return null;
          }}
        </AuthContext.Consumer>
      </AuthProvider>
    );
  });

  test("sets and retrieves permissionInfo value correctly", () => {
    const permissionInfoMock = { access: ["read", "write"] };
    render(
      <AuthProvider>
        <AuthContext.Consumer>
          {(context) => {
            context.setPermissionInfo(permissionInfoMock);
            return null;
          }}
        </AuthContext.Consumer>
        <AuthContext.Consumer>
          {(context) => {
            expect(context.permissionInfo).toEqual(permissionInfoMock);
            return null;
          }}
        </AuthContext.Consumer>
      </AuthProvider>
    );
  });

  test("calls logout function and resets userDetail and permissionInfo", () => {
    const logoutMock = jest.fn();
    render(
      <AuthProvider>
        <AuthContext.Consumer>
          {(context) => {
            context.logout();
            return null;
          }}
        </AuthContext.Consumer>
        <AuthContext.Consumer>
          {(context) => {
            expect(context.userDetail).toEqual({});
            expect(context.permissionInfo).toEqual({});
            return null;
          }}
        </AuthContext.Consumer>
      </AuthProvider>
    );
  });
});
