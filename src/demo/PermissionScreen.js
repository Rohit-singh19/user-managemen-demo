import React, { useEffect, useState } from "react";

const PermissionScreen = () => {
  const [permissions, setPermissions] = useState([]);

  useEffect(() => {
    // Fetch permissions from the backend API
    fetchPermissions().then((data) => {
      setPermissions(data);
    });
  }, []);

  const fetchPermissions = () => {
    // Simulating API call to fetch permissions
    return new Promise((resolve) => {
      setTimeout(() => {
        const dummyPermissions = [
          {
            id: 1,
            name: "Create",
            description: "Permission to create new content",
          },
          {
            id: 2,
            name: "Edit",
            description: "Permission to edit existing content",
          },
          {
            id: 3,
            name: "Delete",
            description: "Permission to delete content",
          },
        ];
        resolve(dummyPermissions);
      }, 1000); // Simulating delay of 1 second
    });
  };

  return (
    <div>
      <h1>Permission Management</h1>
      <div className="permission-list">
        {permissions.map((permission) => (
          <div key={permission.id}>
            <p>Name: {permission.name}</p>
            <p>Description: {permission.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PermissionScreen;
