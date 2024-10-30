import React, { useEffect, useRef, memo } from "react";
import styles from "./Map.module.css";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import markerIconPng from "../../assets/map/markerIcon.svg";
import selectedMarkerIconPng from "../../assets/map/selectedmarkerIcon.svg"; // Asegúrate de tener este archivo

const Map = ({ points, selectedPlaceId, onPlaceSelect }) => {
  const mapRef = useRef(null);
  const markersRef = useRef({}); // Para acceder a los marcadores por ID
  const previousSelectedPlaceIdRef = useRef(null);

  // Definir los iconos dentro del componente
  const customIcon = L.icon({
    iconUrl: markerIconPng,
    iconSize: [25, 45],
    iconAnchor: [12, 41],
    tooltipAnchor: [16, -28],
  });

  const selectedIcon = L.icon({
    iconUrl: selectedMarkerIconPng,
    iconSize: [25, 45],
    iconAnchor: [12, 41],
    tooltipAnchor: [16, -28],
  });

  // useEffect para inicializar el mapa y agregar marcadores
  useEffect(() => {
    if (!mapRef.current) {
      // Inicializar el mapa
      mapRef.current = L.map("map").setView([4.863333, -74.052778], 9);
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

    // Agregar marcadores nuevos
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

    // Si hay un marcador seleccionado inicialmente, resaltarlo
    if (selectedPlaceId && markersRef.current[selectedPlaceId]) {
      markersRef.current[selectedPlaceId].setIcon(selectedIcon);
      previousSelectedPlaceIdRef.current = selectedPlaceId;
    }
  }, [points, onPlaceSelect, selectedPlaceId]);

  // useEffect para actualizar el marcador seleccionado
  useEffect(() => {
    // Deseleccionar el marcador anterior
    if (
      previousSelectedPlaceIdRef.current &&
      markersRef.current[previousSelectedPlaceIdRef.current]
    ) {
      const previousMarker =
        markersRef.current[previousSelectedPlaceIdRef.current];
      previousMarker.setIcon(customIcon);
    }

    // Seleccionar el nuevo marcador
    if (selectedPlaceId && markersRef.current[selectedPlaceId]) {
      const marker = markersRef.current[selectedPlaceId];
      marker.setIcon(selectedIcon);
      mapRef.current.setView(marker.getLatLng(), 13, {
        animate: true,
      });
      // Opcionalmente, puedes abrir el popup
      marker.openPopup();
    }

    // Actualizar la referencia
    previousSelectedPlaceIdRef.current = selectedPlaceId;
  }, [selectedPlaceId]);

  return <div id="map" className={styles.map}></div>;
};

export default memo(Map);
