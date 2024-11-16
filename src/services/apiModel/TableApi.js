import axios from "axios";

export const getTablesApi = async () => {
  const URL_API = process.env.REACT_APP_URL_API + "/tableRelation";
  try {
    const response = await axios.get(URL_API, {
      withCredentials: true,
    });
    if (response.status === 200) {
      const { data } = response;
      return data;
    } else {
      throw new Error("Error obteniendo tablas");
    }
  } catch (error) {
    console.log("Error obteniendo tablas", error);
    return {
      error: true,
      message: "Error obteniendo tablas",
      status: error.status || 500,
    };
  }
};
