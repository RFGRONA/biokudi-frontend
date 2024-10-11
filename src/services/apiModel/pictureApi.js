import axios from "axios";

/*Get all images */
export const getPictureApi = async () => {
  const URL_PICTURE = process.env.REACT_APP_URL_API + `/Picture`;

  try {
    const response = await axios.get(URL_PICTURE, {
      withCredentials: true,
    });
    if (response.status === 200) {
      const { data } = response;
      return data;
    } else {
      throw new Error("Error obteniendo imagenes");
    }
  } catch (error) {
    console.log("Error obteniendo imagenes", error);
    return {
      error: true,
      message: "Error obteniendo imagenes",
      status: error.status || 500,
    };
  }
};

/*Delete a picture */
export const deletePictureApi = async (id) => {
  const URL_PICTURE = process.env.REACT_APP_URL_API + `/Picture/${id}`;

  try {
    const response = await axios.delete(URL_PICTURE, {
      withCredentials: true,
    });
    if (response.status === 200) {
      return response;
    } else {
      throw new Error("Error eliminando imagen");
    }
  } catch (error) {
    console.log("Error eliminando imagen", error);
    return {
      error: true,
      message: "Error eliminando imagen",
      status: error.status || 500,
    };
  }
};

/*Get URL of the image */
export const getUrlPictureApi = async (picture) => {
  const URL = process.env.REACT_APP_URL_PICTURE + `/upload`;
  const KEY = process.env.REACT_APP_PICTURE_KEY;
  const URL_PICTURE = `${URL}?key=${KEY}`;

  /*Clean headers */
  const base64Data = picture.replace(/^data:image\/\w+;base64,/, "");

  /*Add to a formData */
  const formData = new FormData();
  formData.append("image", base64Data);

  try {
    const response = await axios.post(URL_PICTURE, formData);
    console.log(response);
    if (response.status === 200) {
      return response.data.data.url;
    } else {
      throw new Error("Error obteniendo URL de la imagen");
    }
  } catch (error) {
    console.log("Error obteniendo URL de la imagen", error);
    return {
      error: true,
      message: "Error obteniendo URL de la imagen",
      status: error.status || 500,
    };
  }
};
