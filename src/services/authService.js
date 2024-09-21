export const loginApi = async (email, password, remember, captchaToken) => {
  const URL_LOGIN = process.env.REACT_APP_URL_API + "/Person/login";
  try {
    const response = await fetch(URL_LOGIN, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, remember, captchaToken }),
    });
    if (response.ok) {
      const data = await response.json();
      console.log("entrando aqui", data);
      return data;
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
