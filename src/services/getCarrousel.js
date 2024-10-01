//We need at least 7 images to show in the carousel, so we will create a function that returns an array of images.
import axios from "axios";

const apiUrl = process.env.REACT_APP_URL_API + "/Place/GetStartCarrousel";
export const fetchImages = async () => {
  try {
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    console.log("Error fetching images", error);
    return error;
  }
};
