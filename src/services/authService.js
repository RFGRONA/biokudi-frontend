import axios from "axios";
import { CryptoService } from './cryptoService';

export const loginApi = async (email, password, rememberme, captchatoken) => {
  const URL_LOGIN = process.env.REACT_APP_URL_API + "/api/login";
  try {
    console.log("URL_LOGIN", URL_LOGIN);
    console.log(email, password, rememberme, captchatoken);
    const cryptoService = new CryptoService();
    password = await cryptoService.encryptPassword(password);
    const response = await axios.post(URL_LOGIN, {
      email,
      password,
      rememberme,
      captchatoken,
    });
    console.log(response);
    if (response.status === 200) {
      response.error = false;
      return response;
    } else {
      return { error: "Correo o contraseña incorrectos" };
    }
  } catch (error) {
    console.log("Error en la autenticación", error); // Error de autenticación
    return { error: "Login failed" };
  }
};

export const verifyTokenApi = async (jwtToken) => {
  const response = await fetch("/api/verify-token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwtToken}`,
    },
  });

  const data = await response.json();
  return data; // Retorna la validación y datos de rol
};
