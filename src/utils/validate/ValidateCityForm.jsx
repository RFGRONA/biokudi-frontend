export const ValidateCityField = (fieldName, value) => {
  const errors = {};

  switch (fieldName) {
    case "nameCity":
      if (!value) {
        errors.nameCity = "Nombre es requerido";
      } else if (value.length < 3) {
        errors.nameCity = "Nombre debe tener al menos 3 caracteres";
      } else if (value.length > 25) {
        errors.nameCity = "Nombre debe tener menos de 25 caracteres";
      } else {
        errors.nameCity = "";
      }
      break;

    case "idDepartment":
      if (!value || value === "0") {
        errors.idDepartment = "Departamento es requerido";
      } else {
        errors.idDepartment = "";
      }
      break;

    default:
      break;
  }

  return errors;
};

export const ValidateCityForm = (data) => {
  const errors = {};

  Object.keys(data).forEach((fieldName) => {
    const fieldErrors = ValidateCityField(fieldName, data[fieldName]);
    Object.assign(errors, fieldErrors);
  });

  return errors;
};
