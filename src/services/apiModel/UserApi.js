import axios from "axios";

export const getUsersApi = async () => {
  const URL_USER = process.env.REACT_APP_URL_API + "/Person";
  try {
    const response = await axios.get(URL_USER, {
      withCredentials: true,
    });
    if (response.status === 200) {
      const { data } = response;
      return data;
    }
  } catch (error) {
    const { response } = error;
    console.log("Error obteniendo usuarios", response);
    return test;
  }
};

export const deleteUserApi = async (id) => {
  const URL_USER = process.env.REACT_APP_URL_API + `/Person/${id}`;
  try {
    const response = await axios.delete(URL_USER, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status === 200) {
      return response;
    } else {
      console.log("Error eliminando usuario", response);
      return;
    }
  } catch (error) {
    console.log("Error eliminando usuario", error);
    return {
      error: true,
      message: "Error eliminando usuario",
      status: error.status || 500,
    };
  }
};
