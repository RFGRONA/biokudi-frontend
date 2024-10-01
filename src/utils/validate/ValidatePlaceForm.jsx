import { useState } from "react";

export const ValidatePlaceForm = (data) => {
  const errors = {};

  if (!data.namePlace) {
    errors.namePlace = "Nombre es requerido";
  } else if (data.namePlace.length < 3) {
    errors.namePlace = "Nombre debe tener al menos 3 caracteres";
  } else if (data.namePlace.length > 80) {
    errors.namePlace = "Nombre debe tener menos de 80 caracteres";
  }

  if (!data.latitude) {
    errors.latitude = "Latitud es requerida";
  } else if (data.latitude < -90 || data.latitude > 90) {
    errors.latitude = "Latitud debe estar entre -90 y 90";
  }

  if (!data.longitude) {
    errors.longitude = "Longitud es requerida";
  } else if (data.longitude < -180 || data.longitude > 180) {
    errors.longitude = "Longitud debe estar entre -180 y 180";
  }

  if (!data.description) {
    errors.description = "Descripción es requerida";
  } else if (data.description.length < 5) {
    errors.description = "Descripción debe tener al menos 5 caracteres";
  } else if (data.description.length > 550) {
    errors.description = "Descripción debe tener menos de 550 caracteres";
  }

  if (!data.link) {
    errors.link = "Link es requerido";
  } else if (data.link.length < 5) {
    errors.link = "Link debe tener al menos 5 caracteres";
  } else if (data.link.length > 250) {
    errors.link = "Link debe tener menos de 250 caracteres";
  }

  if (!data.city) {
    errors.city = "Ciudad es requerida";
  } else if (data.city === "0") {
    errors.city = "Ciudad es requerida";
  }

  if (!data.state) {
    errors.state = "Estado es requerido";
  } else if (data.state === "0") {
    errors.state = "Estado es requerido";
  }

  if (Object.keys(errors).length === 0) {
    return {};
  } else {
    return errors;
  }
};
