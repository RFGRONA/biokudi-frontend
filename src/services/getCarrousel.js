//We need at least 7 images to show in the carousel, so we will create a function that returns an array of images.
import axios from "axios";

const apiUrl = process.env.REACT_APP_URL_API;
const route = "/place/getStartCarrousel";
export const fetchImages = async () => {
  try {
    const response = await axios.get(apiUrl + route);
    return response.data;
  } catch (error) {
    console.log("Error fetching images", error);
    return error;
  }
};
