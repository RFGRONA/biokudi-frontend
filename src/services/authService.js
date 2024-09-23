import axios from "axios";
import { CryptoService } from "./cryptoService";

export const loginApi = async (email, password, rememberme, captchatoken) => {
  const URL_LOGIN = process.env.REACT_APP_URL_API + "/api/login";
  try {
    const { encryptPassword } = CryptoService;
    const passwordEncrypted = await encryptPassword(password);

    const response = await axios.post(URL_LOGIN, {
      email,
      password: passwordEncrypted,
      rememberme,
      captchatoken,
    });
    if (response.status === 200) {
      console.log("Login exitoso");
    } else {
      return response;
    }
  } catch (error) {
    const { response } = error;
    console.log("Error en la autenticación", response);
    return response;
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
