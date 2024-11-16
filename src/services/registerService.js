import axios from "axios";
import { CryptoService } from "./cryptoService";

export const registerApi = async (email, password, nameUser, captchaToken) => {
  email = email ? email.toLowerCase() : email;
  const URL_REGISTER = process.env.REACT_APP_URL_API + "/auth/register";

  try {
    const { encryptPassword } = CryptoService;
    const encryptedPassword = await encryptPassword(password);

    const response = await axios.post(URL_REGISTER, {
      email: email.toLowerCase(),
      password: encryptedPassword,
      nameUser,
      captchaToken,
    });

    if (response.status === 204) {
      response.data = "Usuario registrado con éxito";
      return response;
    } else {
      return { error: response.data };
    }
  } catch (error) {
    const { response } = error;
    console.log("Error en el registro", error);
    return response;
  }
};
