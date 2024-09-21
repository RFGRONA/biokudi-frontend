import { useAuth } from "../context/AuthContext";
export const loginUser = async (email, password, captchaToken) => {
  try {
    const { login } = useAuth();
    const response = await login(email, password, captchaToken);

    if (!response.ok) {
      console.log("Error al iniciar sesión");
      return null;
    }
    return response;
  } catch (error) {
    console.error("Error al iniciar sesión", error);
    return null;
  }
};

export const logoutUser = async () => {
  const { logout } = useAuth();
  logout();
};
