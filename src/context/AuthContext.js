// AuthContext.js
import React, { createContext, useState, useContext, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { loginApi, verifyTokenApi } from "../services/authService";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [jwtToken, setJwtToken] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    checkSession();
  }, [location.pathname]);

  const checkSession = async () => {
    const token = getCookie("jwt");
    console.log("Cookie:", document.cookie);

    if (token) {
      try {
        const response = await verifyTokenApi(token);
        if (response.valid) {
          setUser({
            id: response.userId,
            name: response.nameUser,
            email: response.email,
            role: response.role,
          });
          setJwtToken(token);
          setIsLoggedIn(true);

          // Guardar información del usuario en el almacenamiento local
          localStorage.setItem("user", JSON.stringify(user));
          localStorage.setItem("jwt", token);
        } else {
          setUser(null);
          setJwtToken(null);
          setIsLoggedIn(false);

          // Eliminar token de la cookie
          document.cookie =
            "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
          localStorage.removeItem("jwt");
        }
      } catch (error) {
        console.error("Error verificando token:", error);
        setUser(null);
        setJwtToken(null);
        setIsLoggedIn(false);

        // Eliminar token de la cookie
        document.cookie =
          "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        localStorage.removeItem("jwt");
      }
    } else {
      console.log("No hay token");
      setUser(null);
      setJwtToken(null);
      setIsLoggedIn(false);
    }
  };

  const login = async (email, password, remember, captchaToken) => {
    const response = await loginApi(email, password, remember, captchaToken);
    if (response.status === 200) {
      setUser({
        id: response.data.userId,
        name: response.data.nameUser,
        email: response.data.email,
        role: response.data.role,
      });
      const jwtToken = getCookie("jwt");
      console.log("Token:", jwtToken);
      setJwtToken(jwtToken);
      setIsLoggedIn(true);

      // Guardar información del usuario en el almacenamiento local
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("jwt", jwtToken);

      return response;
    } else {
      console.log("Error en la autenticación");
      return response;
    }
  };

  const logout = () => {
    setUser(null);
    setJwtToken(null);
    setIsLoggedIn(false);

    // Eliminar token de la cookie
    setCookie("jwt", "", -1);

    // Eliminar información del usuario del almacenamiento local
    localStorage.removeItem("user");
    localStorage.removeItem("jwt");

    navigate("/");
  };

  /**Get Cookie */
  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      return parts.pop().split(";").shift();
    }
  };

  /**Set Cookie */
  const setCookie = (name, value, days) => {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
  };

  return (
    <AuthContext.Provider
      value={{ user, jwtToken, isLoggedIn, login, logout, checkSession }}
    >
      {children}
    </AuthContext.Provider>
  );
};
