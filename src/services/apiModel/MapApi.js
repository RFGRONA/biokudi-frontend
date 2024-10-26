import axios from "axios";

export const getPoints = async () => {
  const API_URL = process.env.REACT_APP_URL_API + "/Map/points";
  try {
    const response = await axios.get(API_URL, {
      withCredentials: true,
    });
    if (response.status === 200) {
      const { data } = response;
      console.log(data);
      return data;
    } else {
      throw new Error("Error obteniendo puntos");
    }
  } catch (error) {
    console.log("Error obteniendo puntos", error);
    return {
      error: true,
      message: "Error obteniendo puntos",
      status: error.status || 500,
    };
  }
};

export const getFullInfoPlace = async (id) => {
  const API_URL = process.env.REACT_APP_URL_API + "/Map/place/" + id;
  try {
    const response = await axios.get(API_URL, {
      withCredentials: true,
    });
    if (response.status === 200) {
      const { data } = response;
      console.log(data);
      return data;
    } else {
      throw new Error("Error obteniendo información");
    }
  } catch (error) {
    console.log("Error obteniendo información", error);
    return {
      error: true,
      message: "Error obteniendo información",
      status: error.status || 500,
    };
  }
};

export const getPlaceReviews = async (id) => {
  const API_URL = process.env.REACT_APP_URL_API + "/Map/Reviews/" + id;
  try {
    const response = await axios.get(API_URL, {
      withCredentials: true,
    });
    if (response.status === 200) {
      const { data } = response;
      return data;
    } else {
      throw new Error("Error obteniendo reseñas");
    }
  } catch (error) {
    console.log("Error obteniendo reseñas", error);
    return {
      error: true,
      message: "Error obteniendo reseñas",
      status: error.status || 500,
    };
  }
};
