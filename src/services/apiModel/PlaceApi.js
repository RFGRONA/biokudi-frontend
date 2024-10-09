import axios from "axios";

/*GET FOR READ */
export const getPlaceApi = async () => {
  const URL_PLACE = process.env.REACT_APP_URL_API + "/place";
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
    console.log("Error obteniendo lugares", response);
    return response;
  }
};

/*GET FOR USERS LIST */
export const getPlacesListApi = async () => {
  const URL_PLACE = process.env.REACT_APP_URL_API + "/place/GetListActivities";
  try {
    const response = await axios.get(URL_PLACE, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status === 200) {
      const { data } = response;
      return data;
    }
  } catch (error) {
    const { response } = error;
    console.log("Error obteniendo lugares", response);
    return response;
  }
};

/*CREATE PLACE */
export const createPlaceApi = async (data) => {
  data.cityId = parseInt(data.cityId);
  data.stateId = parseInt(data.stateId);
  data.longitude = parseFloat(data.longitude);
  data.latitude = parseFloat(data.latitude);
  const URL_PLACE = process.env.REACT_APP_URL_API + "/Place";
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
    console.log("Error creando lugar", response);
    return response;
  }
};

export const getPlaceById = async (id) => {
  const URL_PLACE = process.env.REACT_APP_URL_API + `/Place/${id}`;
  try {
    const response = await axios.get(URL_PLACE, {
      withCredentials: true,
    });
    if (response.status === 200) {
      const { data } = response;
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

export const updatePlaceApi = async (id, data) => {
  data.cityId = parseInt(data.cityId);
  data.stateId = parseInt(data.stateId);
  console.log(data);

  const URL_PLACE = process.env.REACT_APP_URL_API + `/Place/${id}`;
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
      console.log("Error editando lugar", response);
      return;
    }
  } catch (error) {
    console.log("Error editando lugar", error);
    return {
      error: true,
      message: "Error editando lugar",
      status: error.status || 500,
    };
  }
};

export const deletePlaceApi = async (id) => {
  const URL_PLACE = process.env.REACT_APP_URL_API + `/Place/${id}`;
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
      console.log("Error eliminando lugar", response);
      return;
    }
  } catch (error) {
    console.log("Error eliminando lugar", error);
    return {
      error: true,
      message: "Error eliminando lugar",
      status: error.status || 500,
    };
  }
};
