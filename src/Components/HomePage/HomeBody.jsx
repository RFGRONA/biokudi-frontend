import React, { useEffect, useState } from "react";
import "./HomeBody.css";
import { fetchImages } from "../../api/getCarrousel";

const HomeBody = () => {
  const [images, setImages] = useState([]);

  //API call to get images
  useEffect(() => {
    const getImages = async () => {
      const imageData = await fetchImages();
      setImages([...imageData, ...imageData]);
    };

    getImages();
  }, []);

  return (
    <div className="body">
      <div className="bodyTitle">Destinos que te pueden interesar</div>
      {images.length > 0 && (
        <div className="imageCarousel">
          {images.map((image, index) => (
            <div className="oneImageCarousel" key={index}>
              <img src={image.url} alt={image.name} />
              <div className="imageInfo">
                <h4>{image.name}</h4>
                <p>Calificación: {image.rating}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HomeBody;
