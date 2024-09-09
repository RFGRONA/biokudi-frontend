import React, { useEffect, useState } from "react";
import { fetchImages } from "../../model/getCarrousel";
import styles from "./HomeBody.module.css";
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
    <div className={styles.body}>
      <div
        className={[
          styles.bodyTitle,
          "inter",
          "inter-italic",
          "inter-bold",
        ].join(" ")}
      >
        Destinos que te pueden interesar
      </div>
      {images.length > 0 && (
        <div className={styles.imageCarousel}>
          {images.map((image, index) => (
            <div className={styles.oneImageCarousel} key={index}>
              <img src={image.url} alt={image.name} />
              <div className={[styles.imageCarrouselInfo, "inter"].join(" ")}>
                <h4 className={styles.imageCarrouselName}>{image.name}</h4>
                <p className={styles.imageCarrouselRating}>
                  <i
                    className={[
                      "fa-regular",
                      "fa-star-half-stroke",
                      styles.starRaiting,
                    ].join(" ")}
                  ></i>{" "}
                  {image.rating}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HomeBody;
