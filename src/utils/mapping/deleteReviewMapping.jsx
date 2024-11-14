import { getReviewById } from "../../services/apiModel/ReviewApi";

export const deleteReviewMapping = async (reviewId) => {
  const review = await getReviewById(reviewId);
  console.log(review);
  if (review.error) {
    return { error: true, message: "Error al obtener la reseña" };
  }

  const deleteReview = {
    title: "Eliminar Reseña",
    fields: [
      {
        name: "reason",
        label: "Razón",
        type: "text",
        required: true,
      },
      {
        name: "comment",
        label: "Comentario",
        type: "textarea",
        defaultValue: review.comment,
        blocked: true,
      },
      {
        name: "personEmail",
        label: "Correo de usuario",
        type: "text",
        defaultValue: review.personEmail,
        blocked: true,
      },
    ],
  };

  return deleteReview;
};
