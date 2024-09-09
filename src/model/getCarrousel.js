//We need at least 7 images to show in the carousel, so we will create a function that returns an array of images.
export const fetchImages = async () => {
  const images = [
    { name: "image1", rating: 5, url: "https://via.placeholder.com/150" },
    { name: "image2", rating: 4, url: "https://via.placeholder.com/150" },
    { name: "image3", rating: 3, url: "https://via.placeholder.com/150" },
    { name: "image4", rating: 3, url: "https://via.placeholder.com/150" },
    { name: "image5", rating: 3, url: "https://via.placeholder.com/150" },
    { name: "image6", rating: 3, url: "https://via.placeholder.com/150" },
    { name: "image7", rating: 3, url: "https://via.placeholder.com/150" },
  ];
  try {
    const response = await fetch("URL_DE_TU_API/imagenes.json");
    const data = await response.json();
    return data;
  } catch (error) {
    return images;
  }
};