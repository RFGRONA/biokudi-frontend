import React, { useEffect, useState } from "react";
import styles from "./PlaceReview.module.css";
import starIcon from "../../assets/map/starIcon.svg";
import rateStarIcon from "../../assets/map/reviewStar.svg";
import { useAuth } from "../../context/AuthContext";
import {
  getReviewById,
  updateReviewApi,
} from "../../services/apiModel/ReviewApi";

const PlaceReview = ({
  selectPlaceId,
  onSubmit,
  setLoading,
  initialRate = 1,
  initialComment = "",
  isEditing = false,
  reviewId = null,
}) => {
  const [rate, setRate] = useState(initialRate);
  const [comment, setComment] = useState(initialComment);
  const { user } = useAuth();

  useEffect(() => {
    const fetchReview = async () => {
      if (isEditing && reviewId) {
        try {
          setLoading(true);
          const response = await getReviewById(reviewId);
          if (response && response.data) {
            setRate(response.data.rate);
            setComment(response.data.comment);
          }
        } catch (error) {
          console.error("Error al obtener los datos del review", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchReview();
  }, [isEditing, reviewId, setLoading]);

  const handleRating = (index) => {
    setRate(index + 1);
  };

  const handleSubmit = async () => {
    const reviewData = {
      comment,
      rate,
      personId: user?.id,
      placeId: selectPlaceId,
    };

    if (isEditing) {
      try {
        setLoading(true);
        const response = await updateReviewApi(reviewId, reviewData);
        if (response.status === 200) {
          console.log("Reseña actualizada con éxito");
          onSubmit(true); // Informa al componente padre que se completó la edición
        } else {
          throw new Error("Error actualizando la reseña");
        }
      } catch (error) {
        console.error("Error actualizando la reseña", error);
      } finally {
        setLoading(false);
      }
    } else {
      // Llamada para crear una nueva reseña
      onSubmit(reviewData);
    }
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
        <p className={styles.ratePlaceText}>
          {isEditing ? "Edita tu calificación:" : "Califica este lugar:"}
        </p>
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
        {isEditing ? "Guardar cambios" : "Enviar reseña"}
      </button>
    </div>
  );
};

export default PlaceReview;
