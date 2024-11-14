import React, { useState, useEffect } from "react";
import Header2 from "../header/Header2";
import Footer from "../footer/Footer";
import styles from "./Places.module.css";
import chooseIcon from "../../assets/activities/choose.svg";
import orderIcon from "../../assets/activities/order.svg";
import locationIcon from "../../assets/activities/location.svg";
import mapIcon from "../../assets/activities/map.svg";
import starIcon from "../../assets/activities/star.svg";
import activitiesIcon from "../../assets/activities/activity.svg";
import { getPlacesListApi } from "../../services/apiModel/PlaceApi";
import ErrorAlert from "../helpers/alerts/ErrorAlert";
import Loading from "../helpers/loading/Loading";

const Places = ({ data }) => {
  const list = data;
  return (
    <div>
      <div>
        <div className={styles.mainContainer}>
          <h1 className={styles.title}>Lugares a explorar</h1>
          <div className={styles.buttonActions}>
            <div className={styles.buttonOrder}>
              Ordenar
              <img src={orderIcon} alt="Ordenar" />
            </div>
            <div className={styles.buttonChoose}>
              Escoger
              <img src={chooseIcon} alt="Escoger" />
            </div>
          </div>
        </div>
        <div className={styles.activityContainer}>
          {list.map((place) => (
            <div key={place.idPlace} className={styles.card}>
              <div className={styles.placeImage}>
                <img src={place.image} alt={place.namePlace} />
              </div>
              <div className={styles.cardContent}>
                <div className={styles.cardTitle}>
                  <h1>{place.namePlace}</h1>
                  <div className={styles.cardRating}>
                    <img src={starIcon} alt="Rating" className={styles.icon} />
                    <span className={styles.ratingValue}>
                      {place.rating || "No disponible"}
                    </span>
                  </div>
                </div>
                <div className={styles.cardDetails}>
                  <div className={styles.detailItem}>
                    <img
                      src={locationIcon}
                      alt="Localidad"
                      className={styles.icon}
                    />
                    <h2>{place.cityName || "Ciudad no disponible"}</h2>
                  </div>
                  <div className={styles.detailItem}>
                    <img
                      src={activitiesIcon}
                      alt="Actividades"
                      className={styles.icon}
                    />
                    <h2>
                      {Array.isArray(place.activities)
                        ? place.activities
                            .map((activity) => activity.nameActivity)
                            .join(", ")
                        : "No hay actividades disponibles"}
                    </h2>
                  </div>
                </div>
                <div className={styles.cardDescription}>
                  <p>{place.description || "Descripción no disponible"}</p>
                  <div className={styles.cardFooter}>
                    <div className={styles.footerItem}>
                      <img src={mapIcon} alt="Mapa" className={styles.icon} />
                      <h3>Ver más</h3>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      )
    </div>
  );
};

export default Places;
