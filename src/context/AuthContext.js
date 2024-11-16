import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { loginApi } from "../services/authService";
import { useLocation } from "react-router-dom";
import CryptoJS from "crypto-js"; // Importar la librería para cifrado

const AuthContext = createContext();
let authChecked = false; // Usado para evitar múltiples solicitudes al backend

const SECRET_KEY = process.env.REACT_APP_SESSION_KEY; // Clave para cifrar y descifrar

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Restaurar los datos del usuario desde sessionStorage si están presentes y descifrarlos
    const encryptedUser = sessionStorage.getItem("user");
    if (encryptedUser) {
      try {
        const bytes = CryptoJS.AES.decrypt(encryptedUser, SECRET_KEY);
        const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        return decryptedData;
      } catch (error) {
        console.error("Error al descifrar los datos del usuario", error);
        return null;
      }
    }
    return null;
  });

  const [loading, setLoading] = useState(false);
  const [firstLoad, setFirstLoad] = useState(true);
  const location = useLocation();

  // Función para verificar la sesión
  const checkAuth = async () => {
    if (authChecked) return; // Si ya se verificó la sesión, no la verifiques de nuevo
    try {
      setLoading(true);
      const response = await axios.get(
        process.env.REACT_APP_URL_API + "/auth/check-session",
        { withCredentials: true }
      );
      const { data } = response;

      const userData = {
        name: data.nameUser,
        id: data.userId,
        email: data.email,
        role: data.role,
        photo: data.profilePicture,
      };
      setUser(userData);

      // Cifrar los datos del usuario antes de almacenarlos en sessionStorage
      const encryptedData = CryptoJS.AES.encrypt(
        JSON.stringify(userData),
        SECRET_KEY
      ).toString();
      sessionStorage.setItem("user", encryptedData);
      authChecked = true; // Marcar que ya hemos verificado la autenticación
    } catch (error) {
      setUser(null);
      sessionStorage.removeItem("user"); // Limpiar datos del usuario si falla la autenticación
    } finally {
      setLoading(false);
    }
  };

  // Función para restaurar la sesión si el usuario eligió recordarla
  useEffect(() => {
    const restoreSession = async () => {
      const rememberedSession = localStorage.getItem("rememberSession");

      // Solo restaurar la sesión si la flag persistente (localStorage) está activa
      if (firstLoad && rememberedSession === "true") {
        if (!user) {
          // Solo hacemos checkAuth si no hay un usuario almacenado
          await checkAuth();
        }
      }

      // Una vez hecho el primer check, cambiamos firstLoad a false
      setFirstLoad(false);
    };

    if (firstLoad) {
      restoreSession();
    }
  }, [firstLoad, user]);

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
        };
        setUser(userData);

        // Cifrar los datos del usuario antes de almacenarlos en sessionStorage
        const encryptedData = CryptoJS.AES.encrypt(
          JSON.stringify(userData),
          SECRET_KEY
        ).toString();
        sessionStorage.setItem("user", encryptedData);

        // Guardar en localStorage si el usuario decidió recordar la sesión
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
      setUser(null);
      sessionStorage.removeItem("user");
      localStorage.removeItem("rememberSession");
      authChecked = false; // Resetear para permitir la verificación de autenticación nuevamente
      await axios.post(
        `${process.env.REACT_APP_URL_API}/auth/logout`,
        {},
        { withCredentials: true }
      );
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
