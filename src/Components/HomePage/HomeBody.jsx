import React, { useEffect, useState, useRef } from "react";
import { fetchImages } from "../../services/getCarrousel";
import styles from "./HomeBody.module.css";

const HomeBody = () => {
  const [images, setImages] = useState([]);
  const carouselRef = useRef(null);

  useEffect(() => {
    const getImages = async () => {
      try {
        const imageData = await fetchImages();
        // Duplicamos las imágenes para la animación continua
        setImages([...imageData, ...imageData]);
      } catch (error) {
        console.log("Error fetching images", error);
      }
    };

    getImages();
  }, []);

  useEffect(() => {
    const updateVariables = () => {
      const width = window.innerWidth;
      let numVisible;
      let animationDuration;

      if (width <= 600) {
        numVisible = 2;
        animationDuration = 20;
      } else if (width > 600 && width <= 1024) {
        numVisible = 3;
        animationDuration = 40;
      } else if (width > 1024 && width <= 1440) {
        numVisible = 5;
        animationDuration = 60;
      } else {
        numVisible = 6;
        animationDuration = 80;
      }

      document.documentElement.style.setProperty('--num-images-visible', numVisible);
      document.documentElement.style.setProperty('--animation-duration', `${animationDuration}s`);
    };

    updateVariables();
    window.addEventListener('resize', updateVariables);

    return () => {
      window.removeEventListener('resize', updateVariables);
    };
  }, []);

  useEffect(() => {
    const calculateTotalWidth = () => {
      if (carouselRef.current && images.length > 0) {
        const oneImageElement = carouselRef.current.querySelector(`.${styles.oneImageCarousel}`);
        if (oneImageElement) {
          const oneImageWidth = oneImageElement.offsetWidth;
          const gap = parseFloat(getComputedStyle(carouselRef.current).gap) || 0;
          const numUniqueImages = images.length / 2; // Ya que duplicamos las imágenes
          const totalWidth = numUniqueImages * oneImageWidth + (numUniqueImages - 1) * gap;
          document.documentElement.style.setProperty('--total-width', `${totalWidth}px`);
        }
      }
    };

    calculateTotalWidth();
    window.addEventListener('resize', calculateTotalWidth);

    return () => {
      window.removeEventListener('resize', calculateTotalWidth);
    };
  }, [images]);

  return (
    <div className={styles.body}>
      <div className={`${styles.bodyTitle} inter inter-italic inter-bold`}>
        Destinos que te pueden interesar
      </div>
      {images.length > 0 && (
        <div className={styles.carouselWrapper}>
          <div className={styles.imageCarousel} ref={carouselRef}>
            {images.map((image, index) => (
              <div className={styles.oneImageCarousel} key={`${image.id}-${index}`}>
                <img src={image.url} alt={image.name} />
                <div className={`${styles.imageCarrouselInfo} inter`}>
                  <h4 className={styles.imageCarrouselName}>{image.name}</h4>
                  <p className={styles.imageCarrouselRating}>
                    <i className={`fa-solid fa-star ${styles.starRaiting}`}></i>{" "}
                    {image.rating}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeBody;