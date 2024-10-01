import axios from "axios";

export const getUsersApi = async () => {
  const API_URL = process.env.REACT_APP_URL_API + "/User";
  try {
    const response = await axios.get(API_URL);
    if (response.status === 200) {
      const { data } = response;
      return data;
    }
  } catch (error) {
    const { response } = error;
    console.log("Error obteniendo ciudades", response);
    return response;
  }
};
