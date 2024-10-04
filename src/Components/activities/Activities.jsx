import React from 'react';
import Header2 from '../header/Header2';
import Footer from '../footer/Footer';
import styles from './Activities.module.css';
import chooseIcon from '../../assets/activities/choose.svg';
import orderIcon from '../../assets/activities/order.svg';
import locationIcon from '../../assets/activities/location.svg';
import mapIcon from '../../assets/activities/map.svg';
import starIcon from '../../assets/activities/star.svg';
import activitiesIcon from '../../assets/activities/activity.svg';

const Activities = () => {
    return (
        <div>
            <Header2 />
            <div className='mainContainer'>
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
                    <div className={styles.placeImage}>
                        <img src="https://files.visitbogota.co/drpl/sites/default/files/2020-10/simon%20bolivar%203.jpg" alt="Lugar" />
                    </div>
                    <div className={styles.card}>
                        <div className={styles.cardContent}>
                            <div className={styles.cardTitle}>
                                <h1>Nombre del lugar</h1>
                                <div className={styles.cardRating}>
                                    <img src={starIcon} alt="Rating" className={styles.icon} />
                                    <span className={styles.ratingValue}>4.5</span>
                                </div>
                            </div>
                            <div className={styles.cardDetails}>
                                <div className={styles.detailItem}>
                                    <img src={locationIcon} alt="Localidad" className={styles.icon} />
                                    <h2>Ciudad</h2>
                                </div>
                                <div className={styles.detailItem}>
                                    <img src={activitiesIcon} alt="Actividades" className={styles.icon} />
                                    <h2>Lista, Actividades, Destacadas</h2>
                                </div>
                            </div>
                            <div className={styles.cardDescription}>
                                <p>
                                    SimonBolivar
                                </p>
                                <div className={styles.cardFooter}>
                                    <div className={styles.footerItem}>
                                        <img src={mapIcon} alt="Mapa" className={styles.icon} />
                                        <h3>Ver más</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Activities;
