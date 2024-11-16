import React, { useEffect, useRef, memo } from "react";
import styles from "./Map.module.css";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import markerIconPng from "../../assets/map/markerIcon.svg";
import selectedMarkerIconPng from "../../assets/map/selectedmarkerIcon.svg";

const Map = ({ points, selectedPlaceId, onPlaceSelect }) => {
  const mapRef = useRef(null);
  const markersRef = useRef({});
  const previousSelectedPlaceIdRef = useRef(null);
  const geojsonLayerRef = useRef(null);

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

  // useEffect para inicializar el mapa y cargar el GeoJSON solo una vez
  useEffect(() => {
    if (!mapRef.current) {
      // Inicializar el mapa
      mapRef.current = L.map("map", {
        center: [4.863333, -74.052778],
        zoom: 9,
        zoomControl: true,
      });

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(mapRef.current);
    }

    // Cargar el GeoJSON de forma dinámica con fetch y agregarlo solo una vez
    if (!geojsonLayerRef.current) {
      const fetchGeoJSON = async () => {
        try {
          const response = await fetch("/cundinamarca.geojson");
          if (!response.ok) {
            throw new Error("Error al cargar el archivo GeoJSON");
          }
          const geoJSONData = await response.json();

          // Agregar la capa GeoJSON de Cundinamarca al mapa
          geojsonLayerRef.current = L.geoJSON(geoJSONData, {
            style: {
              color: "#ff7800",
              weight: 2,
              opacity: 1,
              fillOpacity: 0.1,
              fillColor: "#fffc00",
            },
          }).addTo(mapRef.current);

          // Ajustar el mapa a los límites de la capa de Cundinamarca
          mapRef.current.fitBounds(geojsonLayerRef.current.getBounds());
        } catch (error) {
          console.error("Error al agregar GeoJSON al mapa:", error);
        }
      };

      fetchGeoJSON();
    }
  }, []);

  useEffect(() => {
    if (mapRef.current) {
      // Eliminar marcadores anteriores si existen
      Object.values(markersRef.current).forEach((marker) => {
        mapRef.current.removeLayer(marker);
      });
      markersRef.current = {};

      // Agregar nuevos marcadores para los puntos proporcionados
      if (points && points.length > 0) {
        points.forEach((point) => {
          const marker = L.marker([point.latitude, point.longitude], {
            icon: customIcon,
          }).addTo(mapRef.current);

          marker.bindTooltip(point.namePlace, {
            permanent: false,
            direction: "top",
            offset: [0, -10],
          });

          // Configurar el evento click para seleccionar el lugar
          marker.on("click", () => {
            onPlaceSelect(point.idPlace);
          });

          // Almacenar el marcador en referencia por su ID
          markersRef.current[point.idPlace] = marker;
        });
      }
    }
  }, [points, onPlaceSelect]);

  // useEffect para actualizar el marcador seleccionado sin re-renderizar todo el mapa
  useEffect(() => {
    if (mapRef.current) {
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
        marker.openPopup();
      }

      // Actualizar la referencia al lugar seleccionado
      previousSelectedPlaceIdRef.current = selectedPlaceId;
    }
  }, [selectedPlaceId]);

  return <div id="map" className={styles.map}></div>;
};

export default memo(Map);
