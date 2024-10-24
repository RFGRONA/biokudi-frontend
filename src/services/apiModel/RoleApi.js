import axios from "axios";

export const getRolesApi = async () => {
  const API_URL = process.env.REACT_APP_URL_API + "/Role";
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
    console.log("Error obteniendo roles", response);
    return response;
  }
};

export const createRoleApi = async (data) => {
  const URL_ACTIVITY = process.env.REACT_APP_URL_API + "/Role";
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
    console.log("Error creando rol", response);
    return response;
  }
};

export const getRoleById = async (id) => {
  const URL_ACTIVITY = process.env.REACT_APP_URL_API + `/Role/${id}`;
  try {
    const response = await axios.get(URL_ACTIVITY, {
      withCredentials: true,
    });
    if (response.status === 200) {
      const { data } = response;
      return data;
    }
  } catch (error) {
    console.log("Error obteniendo Rol", error);
    return {
      error: true,
      message: "Error obteniendo Rol",
      status: error.status || 500,
    };
  }
};

export const updateRoleApi = async (id, data) => {
  const URL_ACTIVITY = process.env.REACT_APP_URL_API + `/Role/${id}`;
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
      console.log("Error editando Rol", response);
      return;
    }
  } catch (error) {
    console.log("Error editando Rol", error);
    return {
      error: true,
      message: "Error editando Rol",
      status: error.status || 500,
    };
  }
};

export const deleteRoleApi = async (id) => {
  const URL_ACTIVITY = process.env.REACT_APP_URL_API + `/Role/${id}`;
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
      console.log("Error eliminando rol", response);
      return;
    }
  } catch (error) {
    console.log("Error eliminando rol", error);
    return {
      error: true,
      message: "Error eliminando rol",
      status: error.status || 500,
    };
  }
};
