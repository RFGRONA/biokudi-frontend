import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { loginApi } from '../services/authService';
import { useLocation } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Para mostrar o no un indicador de carga
  const navigate = useNavigate();
  const location = useLocation();

  // Verificación de sesión desde el backend
  const checkAuth = async () => {
    try {
      const response = await axios.get(process.env.REACT_APP_URL_API + '/api/check-session', { withCredentials: true });
      setUser(response.data.user); // Si la cookie es válida, establece el usuario
    } catch (error) {
      console.error('Error verificando la sesión:', error);
      setUser(null); // Si hay error, la sesión no es válida
    } finally {
      setLoading(false); // Deja de mostrar el indicador de carga
    }
  };

  // Al cargar la aplicación o recargar la página
  useEffect(() => {
    const restoreSession = async () => {
      try {
        setLoading(true); // Muestra un indicador de carga mientras se verifica la sesión
        await checkAuth(); // Verifica si hay una cookie con sesión válida
      } catch (error) {
        console.error("Error restaurando la sesión:", error);
      } finally {
        setLoading(false); // Oculta el indicador de carga después de verificar
      }
    };
  
    restoreSession(); // Llama a la función de restaurar sesión al cargar la app
  }, [location.pathname]);
  

  // Método para manejar el login del usuario
  const login = async (email, password, remember, captchaToken) => {
    try {
      const response = await loginApi(email, password, remember, captchaToken);
      
      if (response && response.status === 200) {
        const { data } = response;
        console.log('Login exitoso', data);
        setUser({
          name: data.nameUser,
          id: data.userId,
          email: data.email,
          role: data.role,
        });

        return true;
      } else {
        console.log('Error en la autenticación');
        return 'Error en la autenticación';
      }
    } catch (error) {
      console.error('Error durante el login', error);
      return error.response?.data || 'Error en la autenticación';
    }
  };

  // Método para cerrar sesión
  const logout = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_URL_API}/api/logout`, {}, { withCredentials: true });
      setUser(null); // Elimina el usuario del contexto
      navigate('/login'); // Redirige al login
    } catch (error) {
      console.error('Error durante logout', error);
    }
  };

  // Valores que se exponen al resto de la aplicación
  const value = {
    user,
    loading,
    login,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Hook personalizado para usar el contexto de autenticación
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};