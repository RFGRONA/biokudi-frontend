import axios from "axios";

/**Get All States */
export const getStatesApi = async () => {
  const API_URL = process.env.REACT_APP_URL_API + "/state";
  try {
    const response = await axios.get(API_URL, {
      withCredentials: true,
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
