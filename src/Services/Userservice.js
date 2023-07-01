import axios from "axios";

export class Userservice {
  static serverURL = "http://localhost:9000";

  static getAllUsers() {
    let dataURL = `${this.serverURL}/users`;
    return axios.get(dataURL);
  }
  static getUser(userId) {
    let dataURL = `${this.serverURL}/users/${userId}`;
    return axios.get(dataURL);
  }

  static createUser(user) {
    let dataURL = `${this.serverURL}/users`;
    return axios.post(dataURL, user);
  }

  static updateUser(user, userId) {
    let dataURL = `${this.serverURL}/users/${userId}`;
    return axios.put(dataURL, user);
  }
  static deleteUser(userId) {
    let dataURL = `${this.serverURL}/users/${userId}`;
    return axios.delete(dataURL);
  }

  static checkUserExists(username) {
    let dataURL = `${this.serverURL}/users?username=${username}`;
    return axios
      .get(dataURL)
      .then((response) => {
        return response.data?.length > 0 ? response?.data[0] : null;
      })
      .catch((error) => {
        console.error(error);
        return false;
      });
  }
}
