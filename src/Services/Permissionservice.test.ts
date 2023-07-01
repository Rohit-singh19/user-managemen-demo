import axios from "axios";

import { Permissionservice } from "./Permissionservice";

jest.mock("axios");

describe("Permissionservice", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("getAllPermissions should make a GET request to the correct URL", async () => {
    (axios.get as jest.Mock).mockResolvedValue({ data: [] });

    await Permissionservice.getAllPermissions();

    expect(axios.get).toHaveBeenCalledWith("http://localhost:9000/permissions");
  });

  test("createPermission should make a POST request to the correct URL with the given permission data", async () => {
    (axios.post as jest.Mock).mockResolvedValue({ data: {} });

    const permission = { name: "read", description: "Read permission" };
    await Permissionservice.createPermission(permission);

    expect(axios.post).toHaveBeenCalledWith(
      "http://localhost:9000/permissions",
      permission
    );
  });

  test("updatePermission should make a PUT request to the correct URL with the given user and permission ID", async () => {
    (axios.put as jest.Mock).mockResolvedValue({ data: {} });

    const user = { name: "John Doe" };
    const permissionId = 1;
    await Permissionservice.updatePermission(user, permissionId);

    expect(axios.put).toHaveBeenCalledWith(
      "http://localhost:9000/permissions/1",
      user
    );
  });

  test("deletePermission should make a DELETE request to the correct URL with the given permission ID", async () => {
    (axios.delete as jest.Mock).mockResolvedValue({ data: {} });

    const permissionId = 1;
    await Permissionservice.deletePermission(permissionId);

    expect(axios.delete).toHaveBeenCalledWith(
      "http://localhost:9000/permissions/1"
    );
  });

  test("assignPermissionToUser should make a POST request to the correct URL with the given permission ID and user ID", async () => {
    (axios.post as jest.Mock).mockResolvedValue({ data: {} });

    const permissionId = 1;
    const userId = 2;
    await Permissionservice.assignPermissionToUser(permissionId, userId);

    expect(axios.post).toHaveBeenCalledWith(
      "http://localhost:9000/users/2/permissions",
      { permissionId }
    );
  });
});
