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

    if (response.status !== 200) {
      return response;
    }

    if (response.status === 200) {
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
      response = "Error en la autenticación";
      return response;
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
