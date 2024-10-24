import axios from "axios";

export const getUsersApi = async () => {
  const URL_USER = process.env.REACT_APP_URL_API + "/Person";
  try {
    const response = await axios.get(URL_USER, {
      withCredentials: true,
    });
    if (response.status === 200) {
      const { data } = response;
      return data;
    }
  } catch (error) {
    const { response } = error;
    console.log("Error obteniendo usuarios", response);
    return test;
  }
};

export const getUserById = async (id) => {
  const URL_PLACE = process.env.REACT_APP_URL_API + `/Person/${id}`;
  try {
    const response = await axios.get(URL_PLACE, {
      withCredentials: true,
    });
    if (response.status === 200) {
      const { data } = response;
      return data;
    }
  } catch (error) {
    console.log("Error obteniendo usuario", error);
    return {
      error: true,
      message: "Error obteniendo usuario",
      status: error.status || 500,
    };
  }
};

export const updateUserApi = async (id, data) => {
  console.log(data);
  data.roleId = parseInt(data.roleId);
  data.stateId = parseInt(data.stateId);

  const URL_PLACE = process.env.REACT_APP_URL_API + `/Person/${id}`;
  try {
    const response = await axios.put(URL_PLACE, data, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status === 200) {
      return response;
    } else {
      console.log("Error editando usuario", response);
      return;
    }
  } catch (error) {
    console.log("Error editando usuario", error);
    return {
      error: true,
      message: "Error editando usuario",
      status: error.status || 500,
    };
  }
};

export const deleteUserApi = async (id) => {
  const URL_USER = process.env.REACT_APP_URL_API + `/Person/${id}`;
  try {
    const response = await axios.delete(URL_USER, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status === 200) {
      return response;
    } else {
      console.log("Error eliminando usuario", response);
      return;
    }
  } catch (error) {
    console.log("Error eliminando usuario", error);
    return {
      error: true,
      message: "Error eliminando usuario",
      status: error.status || 500,
    };
  }
};

/*PROFILE API */
export const getProfileApi = async () => {
  const URL_USER = process.env.REACT_APP_URL_API + "/Auth/profile";
  try {
    const response = await axios.get(URL_USER, {
      withCredentials: true,
    });
    if (response.status === 200) {
      const { data } = response;
      return data;
    }
  } catch (error) {
    const { response } = error;
    console.log("Error obteniendo perfil", response);
    return test;
  }
};

export const updateProfileApi = async (data) => {
  data.nameUser = data.userName;
  delete data.userName;
  data.telephone = data.phoneNumber;
  delete data.phoneNumber;
  data.stateId = parseInt(0); //TODO: Cambiar cuando se habilite el estado
  data.accountDeleted = false;
  data.emailList = false;
  data.picture = data.profilePicture;
  delete data.profilePicture;
  const URL_PLACE = process.env.REACT_APP_URL_API + "/Auth/update-profile";
  try {
    const response = await axios.put(URL_PLACE, data, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status === 200) {
      return response;
    } else {
      console.log("Error editando perfil", response);
      return;
    }
  } catch (error) {
    console.log("Error editando perfil", error);
    return {
      error: true,
      message: "Error editando perfil",
      status: error.status || 500,
    };
  }
};
