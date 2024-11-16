import React, { useState, useEffect } from "react";
import styles from "./PlaceReview.module.css";
import starIcon from "../../assets/map/starIcon.svg";
import rateStarIcon from "../../assets/map/reviewStar.svg";
import exit from "../../assets/map/ReviewMap/exit.svg";
import { useAuth } from "../../context/AuthContext";
import {
  getReviewById,
  updateReviewApi,
} from "../../services/apiModel/ReviewApi";

const EditPlaceReview = ({ reviewId, onSubmit, setLoading, onCancel }) => {
  const [rate, setRate] = useState(1);
  const [comment, setComment] = useState("");
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchReviewData = async () => {
      try {
        setIsLoading(true);
        const response = await getReviewById(reviewId);
        if (response.error) {
          throw new Error("Error obteniendo la reseña");
        }
        setRate(response.rate);
        setComment(response.comment);
      } catch (error) {
        console.log("Error obteniendo la reseña", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (reviewId) {
      fetchReviewData();
    }
  }, [reviewId]);

  const handleRating = (index) => {
    setRate(index + 1);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const reviewData = {
        reviewId,
        comment,
        rate,
        personId: user?.id,
      };

      const response = await updateReviewApi(reviewId, reviewData);
      if (response.status === 200) {
        onSubmit(true);
      } else {
        onSubmit(false);
      }
    } catch (error) {
      console.log("Error actualizando la reseña", error);
      onSubmit(false);
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) {
    return <div className={styles.loading}>Cargando...</div>;
  }

  return (
    <div className={styles.review}>
      <div className={styles.reviewHeader}>
        <h2 className={styles.editTitle}>Editar Reseña</h2>
        <button className={styles.closeButton} onClick={onCancel}>
          <img src={exit} alt="Cerrar" />
        </button>
      </div>

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

      <div className={styles.buttonGroup}>
        <button
          className={styles.submitButton}
          onClick={handleSubmit}
          disabled={!rate || !comment}
        >
          Guardar cambios
        </button>
        <button
          className={`${styles.submitButton} ${styles.cancelButton}`}
          onClick={onCancel}
        >
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default EditPlaceReview;
