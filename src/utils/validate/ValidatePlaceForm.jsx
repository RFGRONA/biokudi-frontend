export const ValidatePlaceField = (fieldName, value) => {
  const errors = {};

  switch (fieldName) {
    case "namePlace":
      if (!value) {
        errors.namePlace = "Nombre es requerido";
      } else if (value.length < 3) {
        errors.namePlace = "Nombre debe tener al menos 3 caracteres";
      } else if (value.length > 80) {
        errors.namePlace = "Nombre debe tener menos de 80 caracteres";
      } else {
        errors.namePlace = "";
      }
      break;

    case "latitude":
      if (value === null || value === undefined || value === "") {
        errors.latitude = "Latitud es requerida";
      } else if (value < -90 || value > 90) {
        errors.latitude = "Latitud debe estar entre -90 y 90";
      } else {
        errors.latitude = "";
      }
      break;

    case "longitude":
      if (value === null || value === undefined || value === "") {
        errors.longitude = "Longitud es requerida";
      } else if (value < -180 || value > 180) {
        errors.longitude = "Longitud debe estar entre -180 y 180";
      } else {
        errors.longitude = "";
      }
      break;

    case "description":
      if (!value) {
        errors.description = "Descripción es requerida";
      } else if (value.length < 5) {
        errors.description = "Descripción debe tener al menos 5 caracteres";
      } else if (value.length > 550) {
        errors.description = "Descripción debe tener menos de 550 caracteres";
      } else {
        errors.description = "";
      }
      break;

    case "address":
      if (!value) {
        errors.address = "Dirección es requerida";
      } else if (value.length < 5) {
        errors.address = "Dirección debe tener al menos 5 caracteres";
      } else if (value.length > 250) {
        errors.address = "Dirección debe tener menos de 250 caracteres";
      } else {
        errors.address = "";
      }
      break;

    case "link":
      if (!value) {
        errors.link = "Link es requerido";
      } else if (value.length < 5) {
        errors.link = "Link debe tener al menos 5 caracteres";
      } else if (value.length > 250) {
        errors.link = "Link debe tener menos de 250 caracteres";
      } else {
        errors.link = "";
      }
      break;

    case "stateId":
      if (!value) {
        errors.stateId = "Estado es requerido";
      } else {
        errors.stateId = "";
      }
      break;

    case "cityId":
      if (!value) {
        errors.cityId = "Ciudad es requerida";
      } else {
        errors.cityId = "";
      }
      break;

    default:
      break;
  }

  return errors;
};

export const ValidatePlaceForm = (data) => {
  const errors = {};

  Object.keys(data).forEach((fieldName) => {
    const fieldErrors = ValidatePlaceField(fieldName, data[fieldName]);
    Object.assign(errors, fieldErrors);
  });

  return errors;
};
