import axios from "axios";

/**Get All States */
export const getStatesApi = async () => {
  const API_URL = process.env.REACT_APP_URL_API + "/state";
  try {
    const response = await axios.get(API_URL, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status === 200) {
      const { data } = response;
      return data;
    }
  } catch (error) {
    const { response } = error;
    console.log("Error obteniendo estados", response);
    return response;
  }
};

export const createStateApi = async (data) => {
  const API_URL = process.env.REACT_APP_URL_API + "/State";
  try {
    const response = await axios.post(API_URL, data, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status === 200) {
      return response;
    }
  } catch (error) {
    const { response } = error;
    console.log("Error creando estado", response);
    return response;
  }
};

export const deleteStateApi = async (id) => {
  const API_URL = process.env.REACT_APP_URL_API + `/State/${id}`;
  try {
    const response = await axios.delete(API_URL, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status === 200) {
      return response;
    } else {
      console.log("Error eliminando estado", response);
      return;
    }
  } catch (error) {
    console.log("Error eliminando estado", error);
    return {
      error: true,
      message: "Error eliminando estado",
      status: error.status || 500,
    };
  }
};
