import React, { useState } from 'react';
import styles from './PlaceReview.module.css';
import starIcon from '../../assets/map/starIcon.svg';  
import rateStarIcon from '../../assets/map/reviewStar.svg';  

const PlaceReview = () => {
    const [rating, setRating] = useState(1); 

    const handleRating = (index) => {
        setRating(index + 1);
    };

    return (
        <div className={styles.review}>
            <h1 className={styles.reviewTitle}>Reseñas</h1>
            <h2 className={styles.placeTitle}>Título del Lugar</h2>

            <div className={styles.reviewInformation}>
                <img src={rateStarIcon} alt="Calificación" className={styles.ratingIcon} />
                <span className={styles.ratingValue}>4.5</span>
            </div>

            <div className={styles.ratePlace}>
                <p className={styles.ratePlaceText}>Califica este lugar: </p>
                <div className={styles.stars}>
                    {[...Array(5)].map((_, index) => (
                        <img
                            key={index}
                            src={index < rating ? rateStarIcon : starIcon}
                            alt="star"
                            className={styles.starIcon}
                            onClick={() => handleRating(index)}  
                        />
                    ))}
                </div>
            </div>

            <div className={styles.commentSection}>
                <textarea 
                    className={styles.commentTextarea} 
                    placeholder="Escribe tu reseña aquí"
                />
            </div>
        </div>
    );
};

export default PlaceReview;
