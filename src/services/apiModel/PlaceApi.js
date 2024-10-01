import axios from "axios";
import { Processor } from "postcss";

export const getPlaceApi = async () => {
  const URL_PLACE = process.env.REACT_APP_URL_API + "/place";
  try {
    const response = await axios.get(URL_PLACE, {
      withCredentials: true,
    });
    if (response.status === 200) {
      const { data } = response;
      return data;
    }
  } catch (error) {
    const { response } = error;
    console.log("Error obteniendo lugares", response);
    return response;
  }
};

export const createPlaceApi = async (data) => {
  const URL_PLACE = process.env.REACT_APP_URL_API + "/Place";
  try {
    const response = await axios.post(URL_PLACE, data, {
      withCredentials: true,
    });
    if (response.status === 201) {
      console.log("Lugar creado exitosamente");
      console.log("Respuesta: ", response);
      return response;
    }
  } catch (error) {
    const { response } = error;
    console.log("Error creando lugar", response);
    return response;
  }
};

export const getPlaceById = async (id) => {
  const URL_PLACE = process.env.REACT_APP_URL_API + `/Place/${id}`;
  try {
    const response = await axios.get(URL_PLACE, {
      withCredentials: true,
    });
    if (response.status === 200) {
      const { data } = response;
      return data;
    }
  } catch (error) {
    console.log("Error obteniendo lugar", error);
    return {
      error: true,
      message: "Error obteniendo lugar",
      status: error.status || 500,
    };
  }
};

export const updatePlaceApi = async (id, data) => {
  data.city = parseInt(data.city);
  data.state = parseInt(data.state);

  const URL_PLACE = process.env.REACT_APP_URL_API + `/Place/${id}`;
  try {
    const response = await axios.put(URL_PLACE, data, {
      withCredentials: true,
    });
    if (response.status === 200) {
      const { data } = response;
      console.log("Lugar editado exitosamente");
      return;
    }
  } catch (error) {
    console.log("Error editando lugar", error);
    return {
      error: true,
      message: "Error editando lugar",
      status: error.status || 500,
    };
  }
};
