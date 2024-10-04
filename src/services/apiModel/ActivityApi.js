import axios from "axios";

export const getActivitiesApi = async () => {
  const API_URL = process.env.REACT_APP_URL_API + "/Activity";
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
    console.log("Error obteniendo ciudades", response);
    return response;
  }
};

export const createActivityApi = async (data) => {
  const URL_ACTIVITY = process.env.REACT_APP_URL_API + "/Activity";
  try {
    const response = await axios.post(URL_ACTIVITY, data, {
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
    console.log("Error creando lugar", response);
    return response;
  }
};

export const getActivityById = async (id) => {
  const URL_ACTIVITY = process.env.REACT_APP_URL_API + `/Activity/${id}`;
  try {
    const response = await axios.get(URL_ACTIVITY, {
      withCredentials: true,
    });
    if (response.status === 200) {
      const { data } = response;
      return data;
    }
  } catch (error) {
    console.log("Error obteniendo actividad", error);
    return {
      error: true,
      message: "Error obteniendo actividad",
      status: error.status || 500,
    };
  }
};

export const updateActivityApi = async (id, data) => {
  const URL_ACTIVITY = process.env.REACT_APP_URL_API + `/Activity/${id}`;
  try {
    const response = await axios.put(URL_ACTIVITY, data, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status === 200) {
      return response;
    } else {
      console.log("Error editando actividad", response);
      return;
    }
  } catch (error) {
    console.log("Error editando actividad", error);
    return {
      error: true,
      message: "Error editando actividad",
      status: error.status || 500,
    };
  }
};

export const deleteActivityApi = async (id) => {
  const URL_ACTIVITY = process.env.REACT_APP_URL_API + `/Activity/${id}`;
  try {
    const response = await axios.delete(URL_ACTIVITY, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status === 200) {
      return response;
    } else {
      console.log("Error eliminando actividad", response);
      return;
    }
  } catch (error) {
    console.log("Error eliminando actividad", error);
    return {
      error: true,
      message: "Error eliminando actividad",
      status: error.status || 500,
    };
  }
};
