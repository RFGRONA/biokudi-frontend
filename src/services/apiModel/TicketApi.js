import axios from "axios";

export const getTicketsApi = async () => {
  const URL_TICKET = process.env.REACT_APP_URL_API + "/Ticket";
  try {
    const response = await axios.get(URL_TICKET, {
      withCredentials: true,
    });
    if (response.status === 200) {
      const { data } = response;
      console.log(data);
      return data;
    }
  } catch (error) {
    console.log("Error obteniendo tickets", error);
    return {
      error: true,
      message: "Error obteniendo tickets",
      status: error.status || 500,
    };
  }
};

export const createTicketApi = async (data) => {
  data.typeId = parseInt(data.typeId);
  console.log(data);
  const URL_TICKET = process.env.REACT_APP_URL_API + "/Ticket";
  try {
    const response = await axios.post(URL_TICKET, data, {
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
    console.log("Error creando ticket", response);
    return response;
  }
};

export const getTicketById = async (id) => {
  const URL_TICKET = process.env.REACT_APP_URL_API + `/Ticket/${id}`;
  try {
    const response = await axios.get(URL_TICKET, {
      withCredentials: true,
    });
    if (response.status === 200) {
      const { data } = response;
      return data;
    }
  } catch (error) {
    console.log("Error obteniendo ticket", error);
    return {
      error: true,
      message: "Error obteniendo ticket",
      status: error.status || 500,
    };
  }
};

export const updateTicketApi = async (id, data) => {
  delete data.addair;
  delete data.dateCreated;
  delete data.dateAnswered;
  delete data.typeId;
  data.stateId = parseInt(data.stateId);
  console.log(data);
  const URL_TICKET = process.env.REACT_APP_URL_API + `/Ticket/${id}`;
  try {
    const response = await axios.put(URL_TICKET, data, {
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
    console.log("Error actualizando ticket", response);
    return response;
  }
};

export const deleteTicketApi = async (id) => {
  const URL_TICKET = process.env.REACT_APP_URL_API + `/Ticket/${id}`;
  try {
    const response = await axios.delete(URL_TICKET, {
      withCredentials: true,
    });
    if (response.status === 200) {
      return response;
    }
  } catch (error) {
    const { response } = error;
    console.log("Error eliminando ticket", response);
    return response;
  }
};

export const scaleTicketApi = async (id) => {
  const URL_TICKET = process.env.REACT_APP_URL_API + `/Ticket/Scalp/${id}`;
  try {
    const response = await axios.put(
      URL_TICKET,
      { scalpAdmin: true },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 200) {
      return response;
    }
  } catch (error) {
    const { response } = error;
    console.log("Error escalando ticket", response);
    return response;
  }
};
