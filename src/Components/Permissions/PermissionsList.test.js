import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import PermissionsList from "./PermissionsList";
import { Permissionservice } from "../../Services/Permissionservice";

// Mock Permissionservice methods
jest.mock("../../Services/Permissionservice", () => ({
  getAllPermissions: jest.fn(),
  createPermission: jest.fn(),
  updatePermission: jest.fn(),
}));

describe("PermissionsList", () => {
  beforeEach(() => {
    // Clear mock function calls and return values
    Permissionservice.getAllPermissions.mockClear();
    Permissionservice.createPermission.mockClear();
    Permissionservice.updatePermission.mockClear();
  });

  test("renders the component", () => {
    render(<PermissionsList />);
    // TODO: Write assertions to validate the rendered component
  });

  test("fetches permission list on component mount", async () => {
    Permissionservice.getAllPermissions.mockResolvedValueOnce({
      data: [{ id: 1, name: "Permission 1", description: "Description 1" }],
    });

    render(<PermissionsList />);

    // TODO: Write assertions to validate the loading state, table content, etc.

    // Wait for the component to finish fetching the permission list
    // You can use the "waitFor" function from "@testing-library/react" to wait for asynchronous tasks
    await screen.findByText("Permission 1");

    expect(Permissionservice.getAllPermissions).toHaveBeenCalledTimes(1);
  });

  test("adds a new permission", async () => {
    Permissionservice.createPermission.mockResolvedValueOnce({
      data: { id: 1, name: "New Permission", description: "New Description" },
    });

    render(<PermissionsList />);

    // TODO: Write assertions to validate the form inputs, buttons, etc.

    // Fill in the form inputs
    fireEvent.change(screen.getByLabelText("Permission Name"), {
      target: { value: "New Permission" },
    });
    fireEvent.change(screen.getByLabelText("Description"), {
      target: { value: "New Description" },
    });

    // Click the "Add Permission" button
    fireEvent.click(screen.getByText("Add Permission"));

    // Wait for the component to finish adding the new permission
    await screen.findByText("Successfully created permissions");

    expect(Permissionservice.createPermission).toHaveBeenCalledTimes(1);
    expect(Permissionservice.createPermission).toHaveBeenCalledWith({
      name: "New Permission",
      description: "New Description",
    });
  });

  test("updates an existing permission", async () => {
    Permissionservice.updatePermission.mockResolvedValueOnce({
      data: {
        id: 1,
        name: "Updated Permission",
        description: "Updated Description",
      },
    });

    render(<PermissionsList />);

    // TODO: Write assertions to validate the table content, buttons, etc.

    // Click the "Edit" button for a permission
    fireEvent.click(screen.getByText("Edit"));

    // Wait for the form to populate with the permission details
    await screen.findByDisplayValue("Permission 1");

    // Modify the permission details
    fireEvent.change(screen.getByLabelText("Permission Name"), {
      target: { value: "Updated Permission" },
    });
    fireEvent.change(screen.getByLabelText("Description"), {
      target: { value: "Updated Description" },
    });

    // Click the "Update" button
    fireEvent.click(screen.getByText("Update Permission"));

    // Wait for the component to finish updating the permission
    await screen.findByText("Successfully updated permissions");

    expect(Permissionservice.updatePermission).toHaveBeenCalledTimes(1);
    expect(Permissionservice.updatePermission).toHaveBeenCalledWith(
      {
        name: "Updated Permission",
        description: "Updated Description",
      },
      1 // Pass the permission ID
    );
  });

  test("deletes a permission", async () => {
    Permissionservice.deletePermission.mockResolvedValueOnce();

    render(<PermissionsList />);

    // TODO: Write assertions to validate the table content, buttons, etc.

    // Click the "Delete" button for a permission
    fireEvent.click(screen.getByText("Delete"));

    // Wait for the confirmation dialog
    await screen.findByText("Are you sure you want to delete this permission?");

    // Mock the window.confirm function to return true
    window.confirm = jest.fn(() => true);

    // Click the "Confirm" button
    fireEvent.click(screen.getByText("Confirm"));

    // Wait for the component to finish deleting the permission
    await screen.findByText("Successfully deleted permission");

    expect(Permissionservice.deletePermission).toHaveBeenCalledTimes(1);
    expect(Permissionservice.deletePermission).toHaveBeenCalledWith(1); // Pass the permission ID
  });

  // TODO: Add more test cases to cover error scenarios, form validations, etc.
});
