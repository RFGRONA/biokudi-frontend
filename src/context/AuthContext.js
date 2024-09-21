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

    if (response) {
      // Guarda el JWT y los datos del usuario
      setJwtToken(response.token); //!!!!!!!!!! ¿Me lo devuelve en el mismo body?

      setUser({
        id: response.id,
        name: response.nameuser,
        email: response.email,
        role: response.role,
      });

      // Almacenar el JWT en cookies de forma segura
      document.cookie = `jwt=${response.token}; path=/; secure; httponly`;

      // Redirige a la página principal u otra según el rol
      navigate("/");
    } else {
      console.log("Error: usuario no encontrado");
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
