import axios from "axios";

export const getPlaceApi = async () => {
  const URL_PLACE = process.env.REACT_APP_URL_API + "/Place/getcrudplaces";
  try {
    const response = await axios.get(URL_PLACE);
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
  const URL_PLACE = process.env.REACT_APP_URL_API + "/place/createplace";
  try {
    const response = await axios.post(URL_PLACE, data);
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
  const URL_PLACE = process.env.REACT_APP_URL_API + `/place/getplacebyid/${id}`;
  try {
    const response = await axios.get(URL_PLACE);
    if (response.status === 200) {
      const { data } = response;
      console.log("Lugares obtenidos exitosamente");
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
