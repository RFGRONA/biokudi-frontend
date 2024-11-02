import axios from "axios";

/*GET REVIEWS */
export const getReviewApi = async () => {
  const URL_PLACE = process.env.REACT_APP_URL_API + "/review";
  try {
    const response = await axios.get(URL_PLACE, {
      withCredentials: true,
    });
    if (response.status === 200) {
      const { data } = response;
      console.log(data);
      return data;
    }
  } catch (error) {
    const { response } = error;
    console.log("Error obteniendo reviews", response);
    return response;
  }
};

/*UPDATE REVIEW */
export const updatePlaceApi = async (id, data) => {
  console.log(data);
  const URL_PLACE = process.env.REACT_APP_URL_API + `/Review/${id}`;
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
      console.log("Error editando review", response);
      return;
    }
  } catch (error) {
    console.log("Error editando review", error);
    return {
      error: true,
      message: "Error editando review",
      status: error.status || 500,
    };
  }
};

/*DELETE REVIEWS */
export const deleteReviewApi = async (id) => {
  const URL_PLACE = process.env.REACT_APP_URL_API + `/Review/${id}`;
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
      console.log("Error eliminando review", response);
      return;
    }
  } catch (error) {
    console.log("Error eliminando review", error);
    return {
      error: true,
      message: "Error eliminando review",
      status: error.status || 500,
    };
  }
};