/*
    This context for handling same modal across the entire application with function
*/

import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userDetail, setUserDetail] = useState({});
  const [permissionInfo, setPermissionInfo] = useState({});

  const logout = () => {
    setUserDetail({});
    setPermissionInfo({});
  };

  console.log("permissionInfo:::", permissionInfo);
  console.log("userDetail:::", userDetail);

  return (
    <AuthContext.Provider
      value={{
        userDetail,
        setUserDetail,
        permissionInfo,
        setPermissionInfo,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
