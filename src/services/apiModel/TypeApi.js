import axios from "axios";

export const getTypesApi = async () => {
  const URL_TYPE = process.env.REACT_APP_URL_API + "/Type";
  try {
    const response = await axios.get(URL_TYPE, {
      withCredentials: true,
    });
    if (response.status === 200) {
      const { data } = response;
      return data;
    }
  } catch (error) {
    console.log("Error obteniendo tipos", error);
    return {
      error: true,
      message: "Error obteniendo tipos",
      status: error.status || 500,
    };
  }
};

export const createTypeApi = async (data) => {
  const URL_TYPE = process.env.REACT_APP_URL_API + "/Type";
  try {
    const response = await axios.post(URL_TYPE, data, {
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
    console.log("Error creando tipo", response);
    return response;
  }
};

export const getTypeById = async (id) => {
  const URL_TYPE = process.env.REACT_APP_URL_API + `/Type/${id}`;
  try {
    const response = await axios.get(URL_TYPE, {
      withCredentials: true,
    });
    if (response.status === 200) {
      const { data } = response;
      return data;
    }
  } catch (error) {
    console.log("Error obteniendo tipo", error);
    return {
      error: true,
      message: "Error obteniendo tipo",
      status: error.status || 500,
    };
  }
};

export const updateTypeApi = async (id, data) => {
  const URL_TYPE = process.env.REACT_APP_URL_API + `/Type/${id}`;
  try {
    const response = await axios.put(URL_TYPE, data, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status === 200) {
      return response;
    } else {
      console.log("Error editando tipo", response);
      return;
    }
  } catch (error) {
    console.log("Error editando tipo", error);
    return {
      error: true,
      message: "Error editando tipo",
      status: error.status || 500,
    };
  }
};

export const deleteTypeApi = async (id) => {
  const URL_TYPE = process.env.REACT_APP_URL_API + `/Type/${id}`;
  try {
    const response = await axios.delete(URL_TYPE, {
      withCredentials: true,
    });
    if (response.status === 200) {
      return response;
    }
  } catch (error) {
    const { response } = error;
    console.log("Error eliminando tipo", response);
    return response;
  }
};
