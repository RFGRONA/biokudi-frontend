import axios from "axios";
import { CryptoService } from "./cryptoService";

export const loginApi = async (email, password, rememberme, captchatoken) => {
  const URL_LOGIN = process.env.REACT_APP_URL_API + "/auth/login";
  try {
    const { encryptPassword } = CryptoService;
    const passwordEncrypted = await encryptPassword(password);

    const response = await axios.post(URL_LOGIN, {
      email,
      password: passwordEncrypted,
      rememberme,
      captchatoken},
      { withCredentials: true }
    );
    if (response.status === 200) {
      console.log("Login exitoso");
      return response;
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
  try {
    if (!jwtToken) {
      const response = { status: 401 };
      return response;
    }
    const response = axios.post(
      process.env.REACT_APP_URL_API + "/auth/check-session",
      {},
      {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      }
    );
    console.log("Respuesta: ", response);
    return response;
  } catch (error) {
    console.error("Error verificando token:", error);
    return error;
  }
};
