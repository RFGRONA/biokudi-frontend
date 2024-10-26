import React, { useEffect, useState } from "react";
import styles from "./PlaceInformation.module.css";
import locationIcon from "../../assets/map/locationIcon.svg";
import activitieIcon from "../../assets/map/activitieIcon.svg";
import directionIcon from "../../assets/map/directionIcon.svg";
import starIcon from "../../assets/map/starIcon.svg";
import reviewStarIcon from "../../assets/map/reviewStar.svg";
import showMoreIcon from "../../assets/map/showMore.svg";
import webPageIcon from "../../assets/map/webPage.svg";
import logo from "../../assets/map/logo.svg";

import {
  getFullInfoPlace,
  getPlaceReviews,
} from "../../services/apiModel/MapApi";

const PlaceInformation = ({ selectedPlaceId }) => {
  const [placeData, setPlaceData] = useState(null);
  const [reviews, setReviews] = useState([]);

  //Get information of the selected place
  useEffect(() => {
    const fetchPlaceData = async () => {
      try {
        const response = await getFullInfoPlace(selectedPlaceId);
        if (response.error) {
          throw new Error("Error obteniendo información");
        }
        setPlaceData(response);
      } catch (error) {
        console.log("Error obteniendo información", error);
      }
    };

    fetchPlaceData();
  }, [selectedPlaceId]);

  //If the place is not selected
  if (!placeData) {
    return null;
  }

  return (
    <div className={styles.place}>
      <div className={styles.imageContainer}>
        <img
          src={placeData.pictures[0] ? placeData.pictures[0].url : logo}
          alt="Imagen del lugar"
          className={styles.placeImage}
        />
      </div>

      <h1 className={styles.placeTitle}>{placeData.namePlace} </h1>
      <div className={styles.locationInfo}>
        <div className={styles.locationItem}>
          <img src={directionIcon} alt="Dirección" className={styles.icon} />
          <p>{placeData.address || "Sin dirección asignada"}</p>
        </div>
        <div className={styles.locationItem}>
          <img src={locationIcon} alt="Ciudad" className={styles.icon} />
          <p>
            {placeData.city ? placeData.city.nameCity : "Ciudad no asignada"}{" "}
          </p>
        </div>
      </div>

      <p className={styles.placeDescription}>
        {placeData.description || "Sin descripción disponible."}
      </p>

      <div className={styles.activities}>
        <img src={activitieIcon} alt="Lista" className={styles.icon} />
        <p>
          {placeData.activities.length > 0
            ? placeData.activities.map((activity, index) => {
                return <span key={index}>{activity.nameActivity} </span>;
              })
            : "No hay actividades asignadas"}{" "}
        </p>
      </div>

      <div className={styles.reviews}>
        <h2 className={styles.reviewsTitle}>Reseñas</h2>
        <div className={styles.reviewInformation}>
          <img
            src={reviewStarIcon}
            alt="Calificación"
            className={styles.ratingIcon}
          />
          <span className={styles.ratingValue}>
            {placeData.rating || "No asignado"}
          </span>
        </div>
      </div>

      {placeData.reviews.length > 0 ? (
        <div className={styles.reviewList}>
          <div className={styles.reviewItem}>
            <div className={styles.reviewDetail}>
              <img
                src={starIcon}
                alt="Calificación"
                className={styles.reviewDetailIcon}
              />
              <span className={styles.reviewRating}>4</span>
              <p className={styles.reviewUser}>Nombre del usuario</p>
              <span className={styles.reviewSuspensive}>...</span>
            </div>
            <p className={styles.reviewText}>
              Lorem ipsum odor amet, consectetur adipiscing elit. Elit ultricies
              aptent dis efficitur enim sollicitudin lobortis. Nisi non ex leo
              malesuada primis ullamcorper sit mus primis.
            </p>
          </div>
        </div>
      ) : (
        <div className={styles.noInfo}>"No hay reseñas disponibles"</div>
      )}

      <div className={styles.placeDetails}>
        {placeData.reviews.length > 0 ? (
          <button className={styles.showMore}>
            <img
              src={showMoreIcon}
              alt="Ver más"
              className={styles.iconDetail}
            />
            Ver más
          </button>
        ) : (
          ""
        )}

        {placeData.link ? (
          <a href="" className={styles.website}>
            <img
              src={webPageIcon}
              alt="Página web"
              className={styles.iconDetail}
            />
            Página web
          </a>
        ) : (
          <a className={styles.website}>
            <img
              src={webPageIcon}
              alt="Página web"
              className={styles.iconDetail}
            />
            Página web
          </a>
        )}
      </div>
    </div>
  );
};

export default PlaceInformation;
