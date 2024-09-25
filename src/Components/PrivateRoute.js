import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useSelector } from "react-redux";

const PrivateRoute = ({ allowedRoles = [] }) => {
  const token = useSelector((state) => state.auth.token);
  const { user } = useAuth();

  if (!token) {
    return <Navigate to="/login" />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/" />; // Redirige al usuario a la página de inicio
  }

  return <Outlet />;
};

export default PrivateRoute;
