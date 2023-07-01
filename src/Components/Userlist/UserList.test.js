import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Userlist from "./Userlist";
import { Userservice } from "../../Services/Userservice";

jest.mock("../../Services/Userservice");

describe("Userlist", () => {
  test("fetches and displays users", async () => {
    // Mock data and API call
    const mockUsers = [
      {
        id: 1,
        name: "John",
        username: "john123",
        email: "john@example.com",
        role: "User",
      },
      {
        id: 2,
        name: "Jane",
        username: "jane456",
        email: "jane@example.com",
        role: "Admin",
      },
    ];
    Userservice.getAllUsers.mockResolvedValueOnce({ data: mockUsers });

    render(
      <Router>
        <Userlist />
      </Router>
    );

    // Wait for the users to be fetched and displayed
    await screen.findByText("John");

    // Assert that the user elements are rendered
    expect(screen.getByText("John")).toBeInTheDocument();
    expect(screen.getByText("Jane")).toBeInTheDocument();
  });

  test("deletes a user", async () => {
    // Mock data and API calls
    const mockUsers = [
      {
        id: 1,
        name: "John",
        username: "john123",
        email: "john@example.com",
        role: "User",
      },
      {
        id: 2,
        name: "Jane",
        username: "jane456",
        email: "jane@example.com",
        role: "Admin",
      },
    ];
    Userservice.getAllUsers.mockResolvedValueOnce({ data: mockUsers });
    Userservice.deleteUser.mockResolvedValueOnce(true);

    render(
      <Router>
        <Userlist />
      </Router>
    );

    // Wait for the users to be fetched and displayed
    await screen.findByText("John");

    // Get the delete button based on its className
    // const deleteButton = screen.getByRole("button", {
    //   className: "text-red-700",
    // });
    const deleteButton = screen.getByTestId(`delete-${mockUsers[0]?.id}`);

    // Confirm the deletion
    window.confirm = jest.fn().mockReturnValueOnce(true);

    // Simulate a click on the delete button
    deleteButton.click();

    // Wait for the users to be updated
    await screen.findByText("Jane");

    // Assert that the user is deleted and no longer displayed
    expect(screen.queryByText("John")).not.toBeInTheDocument();
    expect(screen.getByText("Jane")).toBeInTheDocument();
  });

  // Add other test cases here
});
