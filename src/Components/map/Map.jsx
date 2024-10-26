// Map.jsx
import React, { useEffect, useRef } from "react";
import styles from "./Map.module.css";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import markerIconPng from "../../assets/map/markerIcon.svg";
import { memo } from "react";

const Map = ({ points, selectedPlaceId, onPlaceSelect }) => {
  const mapRef = useRef(null);
  const markersRef = useRef({}); // Cambiamos a un objeto para acceder por id

  const customIcon = L.icon({
    iconUrl: markerIconPng,
    iconSize: [25, 45],
    iconAnchor: [12, 41],
    tooltipAnchor: [16, -28],
  });

  useEffect(() => {
    if (!mapRef.current) {
      // Inicializar el mapa
      mapRef.current = L.map("map").setView([4.549078, -73.917113], 9);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(mapRef.current);
    }

    // Eliminar marcadores anteriores
    Object.values(markersRef.current).forEach((marker) => {
      mapRef.current.removeLayer(marker);
    });
    markersRef.current = {};

    if (points) {
      points.forEach((point) => {
        const marker = L.marker([point.latitude, point.longitude], {
          icon: customIcon,
        }).addTo(mapRef.current);

        marker.bindTooltip(point.namePlace, {
          permanent: false,
          direction: "top",
          offset: [0, -10],
        });

        marker.on("click", () => {
          onPlaceSelect(point.idPlace);
        });

        markersRef.current[point.idPlace] = marker;
      });
    }
  }, [points, onPlaceSelect]);

  // Efecto para enfocar en el marcador seleccionado
  useEffect(() => {
    if (selectedPlaceId && markersRef.current[selectedPlaceId]) {
      const marker = markersRef.current[selectedPlaceId];
      mapRef.current.setView(marker.getLatLng(), 13, {
        animate: true,
      });
      // Opcionalmente, puedes abrir el popup o resaltar el marcador
      marker.openPopup();
    }
  }, [selectedPlaceId]);

  return <div id="map" className={styles.map}></div>;
};

export default memo(Map);
