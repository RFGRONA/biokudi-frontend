import axios from "axios";

export const getUrlPictureApi = async (picture) => {
  const URL = process.env.REACT_APP_URL_PICTURE + `/upload`;
  const KEY = process.env.REACT_APP_PICTURE_KEY;
  const URL_PICTURE = `${URL}?key=${KEY}`;

  /*Clean headers */
  const base64Data = picture.replace(/^data:image\/\w+;base64,/, "");

  /*Add to a formData */
  const formData = new FormData();
  formData.append("image", picture);

  try {
    const response = await axios.post(URL_PICTURE, formData);
    console.log(response);
    if (response.status === 200) {
      console.log(response);
      return response;
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
