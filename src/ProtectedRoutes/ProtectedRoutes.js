import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import Navbar from "../Navbar/Navbar";

const ProtectedRoutes = () => {
  const { userDetail } = useContext(AuthContext);

  return userDetail?.id ? (
    <>
      <Navbar />
      <Outlet />
    </>
  ) : (
    <Navigate to="/login" />
  );
};

export default ProtectedRoutes;
