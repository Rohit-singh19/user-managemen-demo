import axios from "axios";

export class Permissionservice {
  static serverURL = "http://localhost:9000";

  static getAllPermissions() {
    let dataURL = `${this.serverURL}/permissions`;
    return axios.get(dataURL);
  }

  static createPermission(permission) {
    let dataURL = `${this.serverURL}/permissions`;
    return axios.post(dataURL, permission);
  }

  static updatePermission(user, id) {
    let dataURL = `${this.serverURL}/permissions/${id}`;
    return axios.put(dataURL, user);
  }

  static deletePermission(permissionId) {
    let dataURL = `${this.serverURL}/permissions/${permissionId}`;
    return axios.delete(dataURL);
  }

  static assignPermissionToUser(permissionId, userId) {
    let dataURL = `${this.serverURL}/users/${userId}/permissions`;
    return axios.post(dataURL, { permissionId });
  }

  static fetchPermissionDetail(roleId) {
    let dataURL = `${this.serverURL}/permissions?id=${roleId}`;
    return axios
      .get(dataURL)
      .then((response) => {
        return response.data?.length > 0 ? response.data[0] : null;
      })
      .catch((error) => {
        console.error(error);
        return false;
      });
  }
}
