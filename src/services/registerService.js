import axios from "axios";
import { cryptoService } from './cryptoService';

export const registerApi = async (email, password, nameUser, captchaToken) => {
  const URL_REGISTER = process.env.REACT_APP_URL_API + "/api/register";

  try {
    const encryptedPassword = await cryptoService.encryptPassword(password);
    const response = await axios.post(URL_REGISTER, {
      email,
      password: encryptedPassword,
      nameUser,
      captchaToken,
    });

    console.log("Axiosss", response);
    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.log("Error en el registro", error); // Error de registro
    return { error: "Register failed" };
  }
};
