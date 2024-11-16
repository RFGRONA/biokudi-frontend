import axios from "axios";
import { getUrlPictureApi } from "./pictureApi";

/*GET FOR READ */
export const getCitiesApi = async () => {
  const URL_PLACE = process.env.REACT_APP_URL_API + "/city";
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
    console.log("Error obteniendo ciudades", response);
    return response;
  }
};

/*CREATE CITY */
export const createCityApi = async (data) => {
  const URL_PLACE = process.env.REACT_APP_URL_API + "/City";
  try {
    const response = await axios.post(URL_PLACE, data, {
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
    console.log("Error creando ciudad", response);
    return response;
  }
};

export const getCityById = async (id) => {
  const URL_PLACE = process.env.REACT_APP_URL_API + `/City/${id}`;
  try {
    const response = await axios.get(URL_PLACE, {
      withCredentials: true,
    });
    if (response.status === 200) {
      const { data } = response;
      return data;
    }
  } catch (error) {
    console.log("Error obteniendo Ciudad", error);
    return {
      error: true,
      message: "Error obteniendo Ciudad",
      status: error.status || 500,
    };
  }
};

export const updateCityApi = async (id, data) => {
  const URL_PLACE = process.env.REACT_APP_URL_API + `/City/${id}`;
  try {
    const response = await axios.put(URL_PLACE, data, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("Response: ", response);
    if (response.status === 200) {
      return response;
    } else {
      console.log("Error editando Ciudad", response);
      return;
    }
  } catch (error) {
    console.log("Error editando Ciudad", error);
    return {
      error: true,
      message: "Error editando Ciudad",
      status: error.status || 500,
    };
  }
};

export const deleteCityApi = async (id) => {
  const URL_PLACE = process.env.REACT_APP_URL_API + `/City/${id}`;
  try {
    const response = await axios.delete(URL_PLACE, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status === 200) {
      return response;
    } else {
      console.log("Error eliminando Ciudad", response);
      return;
    }
  } catch (error) {
    console.log("Error eliminando Ciudad", error);
    return {
      error: true,
      message: "Error eliminando Ciudad",
      status: error.status || 500,
    };
  }
};
