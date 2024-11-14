import React, { useEffect, useState, useCallback } from "react";
import styles from "./MapView.module.css";
import Sidebar from "./SideBar";
import Map from "./Map";
import { getPoints } from "../../services/apiModel/MapApi";
import PlaceInformation from "./PlaceInformation";
import Loading from "../helpers/loading/Loading";
import { useNavigate } from "react-router-dom";
import Error from "../error/Error";

const MapView = () => {
  const [points, setPoints] = useState([]);
  const [selectedPlaceId, setSelectedPlaceId] = useState(null);
  const [showMore, setShowMore] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [errorCode, setErrorCode] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isPlaceLoading, setIsPlaceLoading] = useState(false);

  /* Obtener los puntos */
  useEffect(() => {
    const fetchPoint = async () => {
      try {
        const response = await getPoints();
        console.log(response);
        if (response.error) {
          setErrorCode(response.status);
          setErrorMessage(response.message);
          return; // Salir de la función si hay error
        }
        setPoints(response);
      } catch (error) {
        console.log("Error obteniendo puntos", error);
        if (error.response) {
          setErrorCode(error.response.status);
          setErrorMessage(error.response.data.message || error.message);
        } else if (error.request) {
          setErrorCode(null);
          setErrorMessage("No hay respuesta del servidor");
        } else {
          setErrorCode(null);
          setErrorMessage(error.message);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchPoint();
  }, []);

  /* Manejar la selección de un punto */
  const handlePlaceSelect = useCallback((id) => {
    setSelectedPlaceId(id);
  }, []);

  const handleShowMore = useCallback(() => {
    setIsPlaceLoading(true);
    setShowMore((prevShowMore) => !prevShowMore);
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : errorMessage ? (
        <Error errorCode={errorCode} errorMessage={errorMessage} />
      ) : (
        <div className={styles.mainContainer}>
          <Sidebar
            points={points}
            selectedPlaceId={selectedPlaceId}
            onPlaceSelect={handlePlaceSelect}
            showMore={handleShowMore}
            setIsPlaceLoading={setIsPlaceLoading}
            isPlaceLoading={isPlaceLoading}
          />
          <Map
            points={points}
            selectedPlaceId={selectedPlaceId}
            onPlaceSelect={handlePlaceSelect}
          />
          {showMore && selectedPlaceId && (
            <PlaceInformation
              selectedPlaceId={selectedPlaceId}
              showMore={handleShowMore}
              setIsPlaceLoading={setIsPlaceLoading}
            />
          )}
        </div>
      )}
    </>
  );
};

export default MapView;
