import axios from "axios";
import { CryptoService } from "./cryptoService";

export const registerApi = async (email, password, nameUser, captchaToken) => {
  const URL_REGISTER = process.env.REACT_APP_URL_API + "/api/register";

  try {
    const { encryptPassword } = CryptoService;
    const encryptedPassword = await encryptPassword(password);

    const response = await axios.post(URL_REGISTER, {
      email,
      password: encryptedPassword,
      nameUser,
      captchaToken,
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    const { response } = error;
    console.log("Error en el registro", error);
    return response;
  }
};
