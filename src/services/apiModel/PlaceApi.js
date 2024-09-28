import axios from "axios";

export const getPlaceApi = async () => {
  const URL_LOGIN = process.env.REACT_APP_URL_API + "/Place/getcrudplaces";
  try {
    const response = await axios.get(URL_LOGIN);
    if (response.status === 200) {
      const { data } = response;
      console.log("Lugares obtenidos exitosamente");
      console.log("Respuesta: ", data);
      return data;
    }
  } catch (error) {
    const { response } = error;
    console.log("Error obteniendo lugares", response);
    return response;
  }
};

export const createPlaceApi = async (data) => {
  const URL_LOGIN = process.env.REACT_APP_URL_API + "/place/places";
  try {
    const response = await axios.post(URL_LOGIN, data);
    if (response.status === 201) {
      const { data } = response;
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
