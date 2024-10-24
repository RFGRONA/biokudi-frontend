import React from "react";
import Header from "../header/Header2";
import Footer from "../footer/Footer";
import Read from "../CRUD_Layout/Read";
import { getPlaceApi, deletePlaceApi } from "../../services/apiModel/PlaceApi";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ErrorAlert from "../helpers/alerts/ErrorAlert";
import { getReviewApi } from "../../services/apiModel/ReviewApi";

const ListReviews = () => {
  const [reviews, setReviews] = useState([]);
  const navigate = useNavigate();
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    const fetchFields = async () => {
      const listReviews = await getReviewApi();
      if (Array.isArray(listReviews)) {
        const transformedPlaces = listReviews.map((review) => [
          review.idReview,
          review.rate,
          review.comment,
          review.placeName,
          review.dateCreated,
          review.personName,
        ]);

        setReviews(transformedPlaces);
      } else {
        setReviews({ error: true, message: "Error obteniendo reviews" });
      }
    };

    fetchFields();
  }, []);

  const subtitle = [
    "Id",
    "Calificación",
    "Comentario",
    "Lugar",
    "Fecha creación",
    "Creado por:",
  ];

  return (
    <>
      <Header />
      <div className="mainContainer">
        {showErrorAlert && <ErrorAlert message={alertMessage} />}
        <Read title={"Reseñas"} subtitle={subtitle} data={reviews} />
      </div>
      <Footer />
    </>
  );
};

export default ListReviews;
