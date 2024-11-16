export const ValidateTypeField = (fieldName, value) => {
  const errors = {};
  switch (fieldName) {
    case "nameType":
      if (!value) {
        errors.nameType = "Nombre es requerido";
      } else if (value.length < 3) {
        errors.nameType = "Nombre debe tener al menos 3 caracteres";
      } else if (value.length > 25) {
        errors.nameType = "Nombre debe tener menos de 25 caracteres";
      } else {
        errors.nameType = "";
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

export const ValidateTypeForm = (data) => {
  const errors = {};

  Object.keys(data).forEach((fieldName) => {
    const fieldErrors = ValidateTypeField(fieldName, data[fieldName]);
    Object.assign(errors, fieldErrors);
  });

  return errors;
};
