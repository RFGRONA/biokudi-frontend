import axios from "axios";

export const getPlaceReport = async () => {
  const API_URL = process.env.REACT_APP_URL_API + "/Report/Place";
  try {
    const response = await axios.get(API_URL, {
      withCredentials: true,
    });
    if (response.status === 200) {
      const { data } = response;
      return data;
    }
  } catch (error) {
    console.log("Error obteniendo reporte de lugares", error);
    return {
      error: true,
      message: "Error obteniendo reporte de lugares",
      status: error.status || 500,
    };
  }
};

export const getActivityReport = async () => {
  const API_URL = process.env.REACT_APP_URL_API + "/Report/Activity";
  try {
    const response = await axios.get(API_URL, {
      withCredentials: true,
    });
    if (response.status === 200) {
      const { data } = response;
      return data;
    }
  } catch (error) {
    console.log("Error obteniendo reporte de actividades", error);
    return {
      error: true,
      message: "Error obteniendo reporte de actividades",
      status: error.status || 500,
    };
  }
};

export const getStateReport = async () => {
  const API_URL = process.env.REACT_APP_URL_API + "/Report/State";
  try {
    const response = await axios.get(API_URL, {
      withCredentials: true,
    });
    if (response.status === 200) {
      const { data } = response;
      return data;
    }
  } catch (error) {
    console.log("Error obteniendo reporte de estados", error);
    return {
      error: true,
      message: "Error obteniendo reporte de estados",
      status: error.status || 500,
    };
  }
};

export const getUserReport = async () => {
  const API_URL = process.env.REACT_APP_URL_API + "/Report/Person";
  try {
    const response = await axios.get(API_URL, {
      withCredentials: true,
    });
    if (response.status === 200) {
      const { data } = response;
      return data;
    }
  } catch (error) {
    console.log("Error obteniendo reporte de usuarios", error);
    return {
      error: true,
      message: "Error obteniendo reporte de usuarios",
      status: error.status || 500,
    };
  }
};

export const getRoleReport = async () => {
  const API_URL = process.env.REACT_APP_URL_API + "/Report/Role";
  try {
    const response = await axios.get(API_URL, {
      withCredentials: true,
    });
    if (response.status === 200) {
      const { data } = response;
      return data;
    }
  } catch (error) {
    console.log("Error obteniendo reporte de roles", error);
    return {
      error: true,
      message: "Error obteniendo reporte de roles",
      status: error.status || 500,
    };
  }
};

export const getPictureReport = async () => {
  const API_URL = process.env.REACT_APP_URL_API + "/Report/Picture";
  try {
    const response = await axios.get(API_URL, {
      withCredentials: true,
    });
    if (response.status === 200) {
      const { data } = response;
      return data;
    }
  } catch (error) {
    console.log("Error obteniendo reporte de imágenes", error);
    return {
      error: true,
      message: "Error obteniendo reporte de imágenes",
      status: error.status || 500,
    };
  }
};

export const getReviewReport = async () => {
  const API_URL = process.env.REACT_APP_URL_API + "/Report/Review";
  try {
    const response = await axios.get(API_URL, {
      withCredentials: true,
    });
    if (response.status === 200) {
      const { data } = response;
      return data;
    }
  } catch (error) {
    console.log("Error obteniendo reporte de reseñas", error);
    return {
      error: true,
      message: "Error obteniendo reporte de reseñas",
      status: error.status || 500,
    };
  }
};

export const getTicketReport = async () => {
  const API_URL = process.env.REACT_APP_URL_API + "/Report/Ticket";
  try {
    const response = await axios.get(API_URL, {
      withCredentials: true,
    });
    if (response.status === 200) {
      const { data } = response;
      return data;
    }
  } catch (error) {
    console.log("Error obteniendo reporte de tickets", error);
    return {
      error: true,
      message: "Error obteniendo reporte de tickets",
      status: error.status || 500,
    };
  }
};

export const sendReportByEmail = (recipientEmail, tableName, fileBase64) => {
  const API_URL = process.env.REACT_APP_URL_API + "/Report/SendByEmail";
  return axios.post(
    API_URL,
    {
      recipientEmail,
      tableName,
      fileBase64,
    },
    {
      withCredentials: true,
    }
  );
};
