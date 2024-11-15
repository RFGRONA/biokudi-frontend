import React, { useState } from "react";
import styles from "./PlaceReview.module.css";
import starIcon from "../../assets/map/starIcon.svg";
import rateStarIcon from "../../assets/map/reviewStar.svg";
import { useAuth } from "../../context/AuthContext";

const PlaceReview = ({ selectPlaceId, onSubmit, setLoading }) => {
  const [rate, setRate] = useState(1);
  const [comment, setComment] = useState("");
  const { user } = useAuth();

  const handleRating = (index) => {
    setRate(index + 1);
  };

  const handleSubmit = () => {
    const reviewData = {
      comment,
      rate,
      personId: user?.id,
      placeId: selectPlaceId,
    };

    onSubmit(reviewData);
  };

  return (
    <div className={styles.review}>
      <div className={styles.reviewInformation}>
        <img
          src={rateStarIcon}
          alt="Calificación"
          className={styles.ratingIcon}
        />
        <span className={styles.ratingValue}>{rate}</span>
      </div>

      <div className={styles.ratePlace}>
        <p className={styles.ratePlaceText}>Califica este lugar: </p>
        <div className={styles.stars}>
          {[...Array(5)].map((_, index) => (
            <img
              key={index}
              src={index < rate ? rateStarIcon : starIcon}
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
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </div>

      <button
        className={styles.submitButton}
        onClick={handleSubmit}
        disabled={!rate || !comment}
      >
        Enviar reseña
      </button>
    </div>
  );
};

export default PlaceReview;
