import React, { createContext, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { loginApi } from "../services/authService";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Guarda datos como nombre, email y rol
  const [jwtToken, setJwtToken] = useState(null); // JWT del usuario
  const navigate = useNavigate();

  const login = async (email, password, remember, captchaToken) => {
    const response = await loginApi(email, password, remember, captchaToken);
    const { error } = response;
    const { errorData } = response;

    if (errorData) {
      return { error: "Usuario o contraseña incorrectos" };
    }
    if (error) {
      return { error: "Error en la autenticación" };
    }

    if (response.status === 200) {
      // Guarda el JWT y los datos del usuario
      const { data } = response.user;
      console.log("data", data);

      setUser({
        id: data.userId,
        name: data.nameUser,
        email: data.email,
        role: data.role,
      });

      return true;
    } else {
      console.log("Error en la autenticación");
      return { error: "Error en la autenticación" };
    }
  };

  const logout = () => {
    setUser(null);
    setJwtToken(null);
    document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, jwtToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
