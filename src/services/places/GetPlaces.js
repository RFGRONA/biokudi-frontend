import axios from "axios";

export const getPlacesApi = async () => {
  const URL_LOGIN = process.env.REACT_APP_URL_API + "/api/places";
  try {
    const response = await axios.get(URL_LOGIN);
    if (response.status === 200) {
      console.log("Lugares obtenidos exitosamente");
      console.log("Respuesta: ", response);
      return response;
    }
  } catch (error) {
    const { response } = error;
    console.log("Error obteniendo lugares", response);
    return response;
  }
};
