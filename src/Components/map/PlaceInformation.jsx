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
import BackButton from "../../assets/map/backButton.svg";
import Loading from "../helpers/loading/Loading";

import { getFullInfoPlace } from "../../services/apiModel/MapApi";
import { useAuth } from "../../context/AuthContext";

const PlaceInformation = ({ selectedPlaceId, showMore, setIsPlaceLoading }) => {
  const [placeData, setPlaceData] = useState(null);
  const { user } = useAuth();

  const handleReviewClick = () => {
    console.log("Crear reseña");
  };

  useEffect(() => {
    const fetchPlaceData = async () => {
      try {
        setIsPlaceLoading(true);
        const response = await getFullInfoPlace(selectedPlaceId);
        if (response.error) {
          throw new Error("Error obteniendo información");
        }
        setPlaceData(response);
      } catch (error) {
        console.log("Error obteniendo información", error);
      } finally {
        setIsPlaceLoading(false);
      }
    };

    if (selectedPlaceId) {
      fetchPlaceData();
    }
  }, [selectedPlaceId, setIsPlaceLoading]);

  if (!placeData) {
    return (
      <div className={styles.place}>
        <Loading />
      </div>
    );
  }

  return (
    <>
      <div className={styles.place}>
        <div className={styles.backButton} onClick={showMore}>
          <button className={styles.button}>
            <img src={BackButton} alt="Volver"></img>
          </button>
          <div className={styles.backText}>Volver</div>
        </div>
        <div className={styles.imageContainer}>
          <img
            src={
              placeData.pictures && placeData.pictures[0]
                ? placeData.pictures[0].url
                : logo
            }
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
              {placeData.city ? placeData.city.nameCity : "Ciudad no asignada"}
            </p>
          </div>
        </div>

        <p className={styles.placeDescription}>
          {placeData.description || "Sin descripción disponible."}
        </p>

        <div className={styles.activities}>
          <img src={activitieIcon} alt="Lista" className={styles.icon} />
          <p>
            {placeData.activities && placeData.activities.length > 0
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
              {placeData.rating
                ? placeData.rating
                : placeData.rating === 0
                ? 0
                : "No asignado"}
            </span>
          </div>
        </div>

        {placeData.reviews && placeData.reviews.length > 0 ? (
          <div className={styles.reviewList}>
            {placeData.reviews.map((review) => (
              <div key={review.idReview} className={styles.reviewItem}>
                <div className={styles.reviewDetail}>
                  <img
                    src={starIcon}
                    alt="Calificación"
                    className={styles.reviewDetailIcon}
                  />
                  <span className={styles.reviewRating}>{review.rate}</span>
                  <p className={styles.reviewUser}>{review.personName}</p>
                  <span className={styles.reviewSuspensive}>...</span>
                </div>
                <p className={styles.reviewText}>{review.comment}</p>
                <p className={styles.reviewDate}>
                  {new Date(review.dateCreated).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.noInfo}>No hay reseñas disponibles</div>
        )}

        <div className={styles.placeDetails}>
          {placeData.reviews && placeData.reviews.length > 0 ? (
            <button className={styles.showMore}>
              <img
                src={showMoreIcon}
                alt="Ver más"
                className={styles.iconDetail}
              />
              Ver más
            </button>
          ) : null}
          {placeData.link ? (
            <a href={placeData.link} className={styles.website}>
              <img
                src={webPageIcon}
                alt="Página web"
                className={styles.iconDetail}
              />
              Página web
            </a>
          ) : (
            <div className={styles.website}>
              <img
                src={webPageIcon}
                alt="Página web"
                className={styles.iconDetail}
              />
              Página web no disponible
            </div>
          )}
          {/* {user && user.role && ( */}
          <div className={styles.createReview} onClick={handleReviewClick}>
            <button className={styles.button}>Crear reseña</button>
          </div>
          {/* )} */}
        </div>
      </div>
    </>
  );
};

export default PlaceInformation;
