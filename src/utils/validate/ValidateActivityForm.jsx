export const ValidateActivityField = (fieldName, value) => {
  const errors = {};

  switch (fieldName) {
    case "nameActivity":
      if (!value) {
        errors.nameActivity = "Nombre es requerido";
      } else if (value.length < 3) {
        errors.nameActivity = "Nombre debe tener al menos 3 caracteres";
      } else if (value.length > 120) {
        errors.nameActivity = "Nombre debe tener menos de 120 caracteres";
      } else {
        errors.nameActivity = "";
      }
      break;

    case "urlIcon":
      if (!value) {
        errors.urlIcon = "Icono es requerido";
      } else if (value.length < 3) {
        errors.urlIcon = "Icono debe tener al menos 3 caracteres";
      } else if (value.length > 250) {
        errors.urlIcon = "Icono debe tener menos de 250 caracteres";
      } else {
        errors.urlIcon = "";
      }
      break;

    default:
      break;
  }

  return errors;
};

export const ValidateActivityForm = (data) => {
  const errors = {};

  Object.keys(data).forEach((fieldName) => {
    const fieldErrors = ValidateActivityField(fieldName, data[fieldName]);
    Object.assign(errors, fieldErrors);
  });

  return errors;
};
