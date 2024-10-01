import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { loginApi } from "../services/authService";
import { useLocation } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [firstLoad, setFirstLoad] = useState(true);
  const location = useLocation();

  // Función para verificar la sesión
  const checkAuth = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        process.env.REACT_APP_URL_API + "/auth/check-session",
        { withCredentials: true }
      );
      const { data } = response;
      setUser({
        name: data.nameUser,
        id: data.userId,
        email: data.email,
        role: data.role,
      });
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // Función para restaurar la sesión si el usuario eligió recordarla
  useEffect(() => {
    const restoreSession = async () => {
      // Verifica si el usuario decidió recordar la sesión
      const rememberedSession = localStorage.getItem("rememberSession");

      if (firstLoad && rememberedSession === "true") {
        setLoading(true);
        await checkAuth();
        setLoading(false);
      }

      // Una vez hecho el primer check, cambiamos firstLoad a false
      setFirstLoad(false);
    };

    if (firstLoad) {
      restoreSession();
    }
  }, [firstLoad]);

  // Función para hacer login
  const login = async (email, password, remember, captchaToken) => {
    try {
      setLoading(true);
      const response = await loginApi(email, password, remember, captchaToken);
      if (response && response.status === 200) {
        const { data } = response;
        setUser({
          name: data.nameUser,
          id: data.userId,
          email: data.email,
          role: data.role,
        });

        // Guardar en localStorage si el usuario decidió recordar la sesión
        if (remember) {
          localStorage.setItem("rememberSession", "true");
        } else {
          localStorage.removeItem("rememberSession");
        }
      } else {
        return response;
      }
    } catch (error) {
      console.error("Error durante el login", error);
      return error.response?.data || "Error en la autenticación";
    } finally {
      setLoading(false);
    }
  };

  // Función para hacer logout
  const logout = async () => {
    try {
      await axios.post(
        `${process.env.REACT_APP_URL_API}/auth/logout`,
        {},
        { withCredentials: true }
      );
      setUser(null);
      localStorage.removeItem("rememberSession");
    } catch (error) {
      console.error("Error durante logout", error);
    }
  };

  const value = {
    user,
    loading,
    setLoading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider");
  }
  return context;
};
