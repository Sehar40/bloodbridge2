import React from "react";
import { Navigate } from "react-router-dom";

const UserRoute = ({ children }) => {
  const role = localStorage.getItem("userRole");
  const token = localStorage.getItem("authToken");

  if (!token || role !== "user") {
    return <Navigate to="/Login" />;
  }

  return children;
};

export default UserRoute;
