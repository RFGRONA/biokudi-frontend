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
