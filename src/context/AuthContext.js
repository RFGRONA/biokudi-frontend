import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { loginApi } from "../services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Estado del usuario
  const [loading, setLoading] = useState(false); // Estado de carga

  // Función para cargar el usuario desde localStorage al montar el componente
  useEffect(() => {
    const storedUser = localStorage.getItem("userData");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Función para hacer login
  const login = async (email, password, remember, captchaToken) => {
    try {
      setLoading(true);
      const response = await loginApi(email, password, remember, captchaToken);
      if (response && response.status === 200) {
        const { data } = response;

        const userData = {
          name: data.nameUser,
          id: data.userId,
          email: data.email,
          role: data.role,
          photo: data.profilePicture,
          phone: data?.phone,
        };

        setUser(userData);

        // Almacenar datos del usuario en localStorage
        localStorage.setItem("userData", JSON.stringify(userData));

        // Guardar indicador de sesión recordada
        if (remember) {
          localStorage.setItem("rememberSession", "true");
        } else {
          localStorage.removeItem("rememberSession");
        }
        return response;
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
      localStorage.removeItem("userData");
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
