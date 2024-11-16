import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import styles from "./MapView.module.css";
import Sidebar from "./SideBar";
import Map from "./Map";
import { getPoints } from "../../services/apiModel/MapApi";
import PlaceInformation from "./PlaceInformation";
import Loading from "../helpers/loading/Loading";
import Error from "../error/Error";

const MapView = () => {
  const { placeId } = useParams();
  const [points, setPoints] = useState([]);
  const [selectedPlaceId, setSelectedPlaceId] = useState(placeId || null);
  const [showMore, setShowMore] = useState(placeId ? true : false);
  const [loading, setLoading] = useState(true);
  const [errorCode, setErrorCode] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isPlaceLoading, setIsPlaceLoading] = useState(false);

  console.log("placeId", placeId);

  useEffect(() => {
    const fetchPoint = async () => {
      try {
        const response = await getPoints();
        if (response.error) {
          setErrorCode(response.status);
          setErrorMessage(response.message);
          return;
        }
        setPoints(response);
      } catch (error) {
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

  useEffect(() => {
    if (placeId) {
      handlePlaceSelect(placeId);
    }
  }, [placeId, handlePlaceSelect]);

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
