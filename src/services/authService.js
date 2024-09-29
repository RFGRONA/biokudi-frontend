import axios from "axios";
import { CryptoService } from "./cryptoService";

export const loginApi = async (email, password, rememberme, captchatoken) => {
  const URL_LOGIN = process.env.REACT_APP_URL_API + "/auth/login";
  try {
    const { encryptPassword } = CryptoService;
    const passwordEncrypted = await encryptPassword(password);

    const response = await axios.post(
      URL_LOGIN,
      {
        email,
        password: passwordEncrypted,
        rememberme,
        captchatoken,
      },
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
    if (response.data) {
      return { error: "Correo o contraseña incorrectos" };
    }
    return response;
  }
};
