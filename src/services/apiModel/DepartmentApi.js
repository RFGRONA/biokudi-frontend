import axios from "axios";
import { getUrlPictureApi } from "./pictureApi";

/*GET FOR READ */
export const getDepartmentsApi = async () => {
  const URL_DEPARTMENT = process.env.REACT_APP_URL_API + "/department";
  try {
    const response = await axios.get(URL_DEPARTMENT, {
      withCredentials: true,
    });
    if (response.status === 200) {
      const { data } = response;
      return data;
    }
  } catch (error) {
    const { response } = error;
    console.log("Error obteniendo departamentos", response);
    return response;
  }
};

/*CREATE DEPARTMENT */
export const createDepartmentApi = async (data) => {
  const URL_DEPARTMENT = process.env.REACT_APP_URL_API + "/Department";
  try {
    const response = await axios.post(URL_DEPARTMENT, data, {
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
    console.log("Error creando departamento", response);
    return response;
  }
};

export const getDepartmentById = async (id) => {
  const URL_DEPARTMENT = process.env.REACT_APP_URL_API + `/Department/${id}`;
  try {
    const response = await axios.get(URL_DEPARTMENT, {
      withCredentials: true,
    });
    if (response.status === 200) {
      const { data } = response;
      return data;
    }
  } catch (error) {
    console.log("Error obteniendo Departamento", error);
    return {
      error: true,
      message: "Error obteniendo Departamento",
      status: error.status || 500,
    };
  }
};

export const updateDepartmentApi = async (id, data) => {
  const URL_DEPARTMENT = process.env.REACT_APP_URL_API + `/Department/${id}`;
  try {
    const response = await axios.put(URL_DEPARTMENT, data, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("Response: ", response);
    if (response.status === 200) {
      return response;
    } else {
      console.log("Error editando Departamento", response);
      return;
    }
  } catch (error) {
    console.log("Error editando Departamento", error);
    return {
      error: true,
      message: "Error editando Departamento",
      status: error.status || 500,
    };
  }
};

export const deleteDepartmentApi = async (id) => {
  const URL_DEPARTMENT = process.env.REACT_APP_URL_API + `/Department/${id}`;
  try {
    const response = await axios.delete(URL_DEPARTMENT, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status === 200) {
      return response;
    } else {
      console.log("Error eliminando Departamento", response);
      return;
    }
  } catch (error) {
    console.log("Error eliminando Departamento", error);
    return {
      error: true,
      message: "Error eliminando Departamento",
      status: error.status || 500,
    };
  }
};
