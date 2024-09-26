import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { loginApi } from "../services/authService";
import { useLocation } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); 
  const navigate = useNavigate();
  const location = useLocation();

  const checkAuth = async () => {
    try {
      const response = await axios.get(
        process.env.REACT_APP_URL_API + "/auth/check-session",
        { withCredentials: true }
      );
      setUser(response.data.user); 
    } catch (error) {
      setUser(null); 
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const restoreSession = async () => {
      try {
        setLoading(true); 
        await checkAuth(); 
      } catch (error) {
        console.Warning("No se encontró una sesión valida.");
      } finally {
        setLoading(false); 
      }
    };

    restoreSession(); 
  }, [location.pathname]);

  const login = async (email, password, remember, captchaToken) => {
    try {
      const response = await loginApi(email, password, remember, captchaToken);

      if (response && response.status === 200) {
        const { data } = response;
        console.log("Login exitoso", data);
        setUser({
          name: data.nameUser,
          id: data.userId,
          email: data.email,
          role: data.role,
        });

        return true;
      } else {
        console.log("Error en la autenticación");
        return "Error en la autenticación";
      }
    } catch (error) {
      console.error("Error durante el login", error);
      return error.response?.data || "Error en la autenticación";
    }
  };

  const logout = async () => {
    try {
      await axios.post(
        `${process.env.REACT_APP_URL_API}/auth/logout`,
        {},
        { withCredentials: true }
      );
      setUser(null); 
      navigate("/login"); 
    } catch (error) {
      console.error("Error durante logout", error);
    }
  };

  const value = {
    user,
    loading,
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
