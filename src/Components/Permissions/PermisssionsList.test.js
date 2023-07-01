import {
  act,
  render,
  screen,
  fireEvent,
  waitFor,
} from "@testing-library/react";
import PermissionsList from "./PermissionsList";
import { Permissionservice } from "../../Services/Permissionservice.ts";

// Mock the Permissionservice
jest.mock("../../Services/Permissionservice");

describe("PermissionsList", () => {
  beforeEach(() => {
    // Reset mock implementation and state before each test
    Permissionservice.getAllPermissions.mockReset();
    Permissionservice.createPermission.mockReset();
    Permissionservice.updatePermission.mockReset();
  });

  test("renders an empty permission list", () => {
    render(<PermissionsList />);

    // Verify that the initial state of permissions is an empty array
    const permissionItems = screen.queryAllByRole("row");
    expect(permissionItems).toHaveLength(1);
  });

  test("fetches and displays permissions", async () => {
    const mockPermissions = [
      { id: 1, name: "Permission 1", description: "Description 1" },
      { id: 2, name: "Permission 2", description: "Description 2" },
    ];
    Permissionservice.getAllPermissions.mockResolvedValueOnce({
      data: mockPermissions,
    });

    render(<PermissionsList />);

    // Wait for the fetchPermissionList function to complete
    await screen.findByRole("row");

    // Verify that the permissions are displayed correctly
    await waitFor(() => {
      const permissionItems = screen.getAllByRole("row");
      expect(permissionItems).toHaveLength(mockPermissions.length + 1); // +1 for the table header row
    });
  });

  test("deletes a permission", async () => {
    const mockPermissions = [
      { id: 1, name: "Permission 1" },
      { id: 2, name: "Permission 2" },
      { id: 3, name: "Permission 3" },
    ];
    Permissionservice.getAllPermissions.mockResolvedValue(mockPermissions);
    Permissionservice.deletePermission.mockResolvedValueOnce({});

    // Render the component
    render(<PermissionsList />);

    await act(async () => {
      // Wait for the fetchPermissionList function to complete
      await waitFor(() => screen.getByRole("row"));
    });

    // Verify that the initial permissions are displayed correctly
    const permissionItems = screen.getAllByRole("row");
    expect(permissionItems).toHaveLength(1);

    // Click the delete button for the first permission
    const deleteButton = screen.getByTestId(
      `delete-button-${mockPermissions[0].id}`
    );
    fireEvent.click(deleteButton);

    // Verify that the confirmation dialog is shown
    const confirmationDialog = screen.getByRole("dialog");
    expect(confirmationDialog).toBeInTheDocument();

    // Click the confirm button in the dialog
    const confirmButton = screen.getByText("OK");
    fireEvent.click(confirmButton);

    // Verify that the delete function is called with the correct parameter
    expect(Permissionservice.deletePermission).toHaveBeenCalledWith(
      mockPermissions[0].id
    );

    await act(async () => {
      // Simulate a delay for the permissions to be updated after deletion
      await new Promise((resolve) => setTimeout(resolve, 1000));
    });

    // Verify that the deleted permission is no longer displayed
    const updatedPermissionItems = screen.queryAllByRole("row");
    expect(updatedPermissionItems).toHaveLength(mockPermissions.length); // Updated length after deletion
  });

  test("creates a new permission", async () => {
    const mockPermission = {
      id: 1,
      name: "New Permission",
      description: "New Description",
      access: [],
    };
    Permissionservice.createPermission.mockResolvedValueOnce({
      data: mockPermission,
    });

    render(<PermissionsList />);

    // Wait for the fetchPermissionList function to complete
    await screen.findByRole("row");

    // Enter input values in the form
    const nameInput = screen.getByLabelText("Permission Name");
    fireEvent.change(nameInput, { target: { value: mockPermission.name } });

    const descriptionInput = screen.getByLabelText("Description");
    fireEvent.change(descriptionInput, {
      target: { value: mockPermission.description },
    });

    // Submit the form
    const submitButton = screen.getByTestId("add-role-button");
    fireEvent.click(submitButton);

    // Verify that the createPermission function is called with the correct parameter
    expect(Permissionservice.createPermission).toHaveBeenCalledWith({
      description: "New Description",
      name: "New Permission",
      access: [],
    });

    // Wait for the fetchPermissionList function to complete after creating the permission
    await screen.findByRole("row");

    // Verify that the new permission is displayed
    const permissionItems = screen.getAllByRole("row");
    expect(permissionItems).toHaveLength(1); // +1 for the table header row
  });
});
