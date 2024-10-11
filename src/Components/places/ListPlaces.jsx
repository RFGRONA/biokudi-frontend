import React from "react";
import Header from "../header/Header2";
import Footer from "../footer/Footer";
import Read from "../CRUD_Layout/Read";
import { getPlaceApi, deletePlaceApi } from "../../services/apiModel/PlaceApi";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ErrorAlert from "../helpers/alerts/ErrorAlert";

const ListPlaces = () => {
  const [places, setPlaces] = useState([]);
  const navigate = useNavigate();
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    const fetchFields = async () => {
      const listPlaces = await getPlaceApi();
      if (Array.isArray(listPlaces)) {
        const transformedPlaces = listPlaces.map((place) => [
          place.idPlace,
          place.namePlace,
          place.link,
          place.cityName,
          place.stateName,
        ]);

        setPlaces(transformedPlaces);
      } else {
        setPlaces({ error: true, message: "Error obteniendo lugares" });
      }
    };

    fetchFields();
  }, []);

  const subtitle = ["Id", "Nombre", "Link", "Ciudad", "Estado"];

  const handleEdit = (index) => {
    navigate(`/EditPlace/${index}`);
  };
  const handleCreate = () => {
    navigate("/CreatePlace");
  };

  return (
    <>
      <Header />
      <div className="mainContainer">
        {showErrorAlert && <ErrorAlert message={alertMessage} />}
        <Read
          title={"Lugares"}
          subtitle={subtitle}
          data={places}
          onEdit={handleEdit}
          onCreate={handleCreate}
        />
      </div>
      <Footer />
    </>
  );
};

export default ListPlaces;
