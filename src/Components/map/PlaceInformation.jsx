import React from 'react';
import styles from './PlaceInformation.module.css';
import locationIcon from '../../assets/map/locationIcon.svg';
import activitieIcon from '../../assets/map/activitieIcon.svg';
import directionIcon from '../../assets/map/directionIcon.svg';
import starIcon from '../../assets/map/starIcon.svg';
import reviewStarIcon from '../../assets/map/reviewStar.svg';
import showMoreIcon from '../../assets/map/showMore.svg';
import webPageIcon from '../../assets/map/webPage.svg';

const PlaceInformation = () => {
    return (
        <div className={styles.place}>
            <div className={styles.imageContainer}>
                <img
                    src="https://anpr.org.mx/wp-content/uploads/2023/01/Simo%CC%81n-Boli%CC%81var-4.jpeg"
                    alt="Imagen del lugar"
                    className={styles.placeImage}
                />
            </div>

            <h1 className={styles.placeTitle}>Título del lugar</h1>
            <div className={styles.locationInfo}>
                <div className={styles.locationItem}>
                    <img src={directionIcon} alt="Dirección" className={styles.icon} />
                    <p>Dirección del lugar</p>
                </div>
                <div className={styles.locationItem}>
                    <img src={locationIcon} alt="Ciudad" className={styles.icon} />
                    <p>Ciudad</p>
                </div>
            </div>

            <p className={styles.placeDescription}>
                Lorem ipsum dolor amet, consectetur adipiscing elit. Imperdiet orci est suspendisse litora est ultricies maecenas. Et porttitor dis; penatibus maecenas purus parturient. Vitae phasellus sapien mauris ac curabitur tempor curabitur malesuada. Arcu dictumst nec lacus nunc tempus sollicitudin egestas. Faucibus mattis etiam penatibus, inceptos felis ut hac.
            </p>

            <div className={styles.activities}>
                <img src={activitieIcon} alt="Lista" className={styles.icon} />
                <p>Lista, Actividades, Destacadas</p>
            </div>

            <div className={styles.reviews}>
                <h2 className={styles.reviewsTitle}>Reseñas</h2>
                <div className={styles.reviewInformation}>
                    <img src={reviewStarIcon} alt="Calificación" className={styles.ratingIcon} />
                    <span className={styles.ratingValue}>4.5</span>
                </div>
            </div>

            <div className={styles.reviewList}>
                <div className={styles.reviewItem}>
                    <div className={styles.reviewDetail}>
                        <img src={starIcon} alt="Calificación" className={styles.reviewDetailIcon} />
                        <span className={styles.reviewRating}>4</span>
                        <p className={styles.reviewUser}>Nombre del usuario</p>
                        <span className={styles.reviewSuspensive}>...</span>
                    </div>
                    <p className={styles.reviewText}>
                        Lorem ipsum odor amet, consectetur adipiscing elit. Elit ultricies aptent dis efficitur enim sollicitudin lobortis. Nisi non ex leo malesuada primis ullamcorper sit mus primis.
                    </p>
                </div>
            </div>

            <div className={styles.reviewList}>
                <div className={styles.reviewItem}>
                    <div className={styles.reviewDetail}>
                        <img src={starIcon} alt="Calificación" className={styles.reviewDetailIcon} />
                        <span className={styles.reviewRating}>4</span>
                        <p className={styles.reviewUser}>Nombre del usuario</p>
                        <span className={styles.reviewSuspensive}>...</span>
                    </div>
                    <p className={styles.reviewText}>
                        Lorem ipsum odor amet, consectetur adipiscing elit. Elit ultricies aptent dis efficitur enim sollicitudin lobortis. Nisi non ex leo malesuada primis ullamcorper sit mus primis.
                    </p>
                </div>
            </div>

            <div className={styles.placeDetails}>
                <button className={styles.showMore}>
                    <img src={showMoreIcon} alt="Ver más" className={styles.iconDetail} />
                    Ver más
                </button>
                <a href="https://www.unaurlrandom.com" className={styles.website}>
                    <img src={webPageIcon} alt="Página web" className={styles.iconDetail} />
                    Página web
                </a>
            </div>
        </div>
    );
};

export default PlaceInformation;
