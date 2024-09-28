import axios from "axios";

/**Get All States */
export const getStatesApi = async () => {
  const API_URL = process.env.REACT_APP_URL_API + "/state/getall";
  try {
    const response = await axios.get(API_URL);
    if (response.status === 200) {
      console.log("Estados obtenidos exitosamente");
      const { data } = response;
      return data;
    }
  } catch (error) {
    const { response } = error;
    console.log("Error obteniendo estados", response);
    return response;
  }
};
