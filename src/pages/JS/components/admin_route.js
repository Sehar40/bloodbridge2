import React from "react";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const role = localStorage.getItem("userRole"); // 'admin' or 'user'
  const token = localStorage.getItem("authToken");

  if (!token || role !== "admin") {
    return <Navigate to="/" />;
  }

  return children;
};

export default AdminRoute;
