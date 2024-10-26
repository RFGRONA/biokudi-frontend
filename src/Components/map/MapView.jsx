import React, { useEffect, useState, useCallback } from "react";
import styles from "./MapView.module.css";
import Sidebar from "./SideBar";
import Map from "./Map";
import { getPoints } from "../../services/apiModel/MapApi";
import PlaceInformation from "./PlaceInformation";

const MapView = () => {
  const [points, setPoints] = useState([]);
  const [selectedPlaceId, setSelectedPlaceId] = useState(null);

  /* Obtener los puntos */
  useEffect(() => {
    const fetchPoint = async () => {
      try {
        const response = await getPoints();
        setPoints(response);
      } catch (error) {
        console.log("Error obteniendo puntos", error);
      }
    };
    fetchPoint();
  }, []);

  /* Manejar la selección de un punto */
  const handlePlaceSelect = useCallback((id) => {
    setSelectedPlaceId(id);
  }, []);

  return (
    <div className={styles.mainContainer}>
      <Sidebar
        points={points}
        selectedPlaceId={selectedPlaceId}
        onPlaceSelect={handlePlaceSelect}
      />
      <Map
        points={points}
        selectedPlaceId={selectedPlaceId}
        onPlaceSelect={handlePlaceSelect}
      />
      {selectedPlaceId && (
        <PlaceInformation selectedPlaceId={selectedPlaceId} />
      )}
    </div>
  );
};

export default MapView;
