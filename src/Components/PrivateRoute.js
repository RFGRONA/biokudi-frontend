// src/Components/PrivateRoute.js
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ allowedRoles }) => {
  const { user, loading } = useAuth();

  // Mientras carga la autenticación
  if (loading) {
    return <p>Cargando...</p>; // Puedes usar un spinner aquí
  }

  // Si no hay usuario autenticado, redirige al login
  if (!user) {
    return <Navigate to="/login" />;
  }

  // Si hay roles permitidos, verifica que el usuario tenga el rol adecuado
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" />; // O alguna página de acceso denegado
  }

  return <Outlet />;
};

export default PrivateRoute;
