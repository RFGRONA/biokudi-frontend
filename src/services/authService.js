import axios from "axios";
import { CryptoService } from "./cryptoService";

export const loginApi = async (email, password, rememberme, captchatoken) => {
  email = email ? email.toLowerCase() : email;
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
      return response;
    } else {
      return response;
    }
  } catch (error) {
    if (error.response && error.response.data) {
      return { error: "Correo o contraseña incorrectos" };
    }
    return { error: "Error en la autenticación" };
  }
};

export const requestResetPasswordApi = async (email) => {
  const URL_RECOVERY_PASSWORD =
    process.env.REACT_APP_URL_API + "/auth/request-reset-password";
  const data = {
    email: email,
  };
  try {
    const response = await axios.post(URL_RECOVERY_PASSWORD, data, {
      withCredentials: true,
    });
    if (response.status === 200) {
      return response;
    } else {
      return response;
    }
  } catch (error) {
    console.log(error);
    if (error.response && error.response.data) {
      return { error: error.response.data.message };
    }
    return { error: "Error en la autenticación" };
  }
};

export const updatePasswordApi = async (data) => {
  const URL_RECOVERY_PASSWORD =
    process.env.REACT_APP_URL_API + "/auth/update-password";
  try {
    const { encryptPassword } = CryptoService;
    const currentPasswordEncrypted = await encryptPassword(
      data.currentPassword
    );
    const newPasswordEncrypted = await encryptPassword(data.newPassword);

    const dataEncrypted = {
      currentPassword: currentPasswordEncrypted,
      newPassword: newPasswordEncrypted,
    };
    console.log(dataEncrypted);
    const response = await axios.post(URL_RECOVERY_PASSWORD, dataEncrypted, {
      withCredentials: true,
    });
    if (response.status === 200) {
      return response;
    } else {
      return response;
    }
  } catch (error) {
    console.log(error);
    if (error.response && error.response.data) {
      return { error: error.response.data.message };
    }
    return { error: "Error en la autenticación" };
  }
};

export const verifyResetPassword = async (input) => {
  const URL_VERIFY_TOKEN =
    process.env.REACT_APP_URL_API + "/auth/verify-reset-password";

  const { encryptPassword } = CryptoService;
  input.newPassword = await encryptPassword(input.newPassword);
  const data = {
    email: input.email,
    newPassword: input.newPassword,
    token: input.token,
  };
  try {
    const response = await axios.post(URL_VERIFY_TOKEN, data, {
      withCredentials: true,
    });
    if (response.status === 200) {
      return response;
    } else {
      return response;
    }
  } catch (error) {
    console.log(error);
    if (error.response && error.response.data) {
      return { error: error.response.data.message };
    }
    return { error: "Error en la autenticación" };
  }
};
