import React, { useEffect, useState } from "react";
import { Userservice } from "../Services/Userservice";

const ListDemo = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    // Fetch the list of users from the backend API
    Userservice.getAllUsers().then(({ data }) => {
      setUsers(data);
    });
  }, []);

  const handleUserSelect = (user) => {
    setSelectedUser(user);
  };

  const handleRoleUpdate = (role) => {
    // updateUserRole(selectedUser.id, role).then(() => {
    //   // Display a success message or perform any necessary actions
    // });
  };

  return (
    <div>
      <h1>User Management</h1>
      <div className="user-list">
        {users.map((user) => (
          <div
            key={user.id}
            className={`user-item ${selectedUser === user ? "selected" : ""}`}
            onClick={() => handleUserSelect(user)}
          >
            {user.name}
          </div>
        ))}
      </div>
      <div className="user-details">
        {selectedUser && (
          <div>
            <h2>User Details:</h2>
            <p>Name: {selectedUser.name}</p>
            <p>Email: {selectedUser.email}</p>
            <p>Role: {selectedUser.role}</p>
          </div>
        )}
      </div>
      <div className="role-form">
        {selectedUser && (
          <div>
            <h2>Update User Role:</h2>
            <select
              value={selectedUser.role}
              onChange={(e) => handleRoleUpdate(e.target.value)}
            >
              <option value="">Select Role</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListDemo;
