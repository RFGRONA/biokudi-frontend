export const ValidateStateField = (fieldName, value) => {
  const errors = {};

  switch (fieldName) {
    case "nameState":
      if (!value) {
        errors.nameState = "Nombre es requerido";
      } else if (value.length < 3) {
        errors.nameState = "Nombre debe tener al menos 3 caracteres";
      } else if (value.length > 25) {
        errors.nameState = "Nombre debe tener menos de 25 caracteres";
      } else {
        errors.nameState = "";
      }
      break;

    case "tableRelation":
      if (!value || value === "0") {
        errors.tableRelation = "Tabla es requerida";
      } else {
        errors.tableRelation = "";
      }
      break;

    default:
      break;
  }

  return errors;
};

export const ValidateStateForm = (data) => {
  const errors = {};

  Object.keys(data).forEach((fieldName) => {
    const fieldErrors = ValidateStateField(fieldName, data[fieldName]);
    Object.assign(errors, fieldErrors);
  });

  return errors;
};
