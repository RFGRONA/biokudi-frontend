// src/Components/PublicRoute.js
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PublicRoute = () => {
  const { user, loading } = useAuth();

  // Mientras carga la autenticación
  if (loading) {
    return <p>Cargando...</p>; // Puedes usar un spinner aquí
  }

  // Si ya hay un usuario autenticado, redirige a la página de inicio
  if (user) {
    return <Navigate to="/" />;
  }

  // Si no está autenticado, renderiza las rutas públicas
  return <Outlet />;
};

export default PublicRoute;
