export const ValidateDepartmentField = (fieldName, value) => {
  const errors = {};

  switch (fieldName) {
    case "nameDepartment":
      if (!value) {
        errors.nameDepartment = "Nombre es requerido";
      } else if (value.length < 3) {
        errors.nameDepartment = "Nombre debe tener al menos 3 caracteres";
      } else if (value.length > 40) {
        errors.nameDepartment = "Nombre debe tener menos de 40 caracteres";
      } else {
        errors.nameDepartment = "";
      }
      break;

    default:
      break;
  }

  return errors;
};

export const ValidateDepartmentForm = (data) => {
  const errors = {};

  Object.keys(data).forEach((fieldName) => {
    const fieldErrors = ValidateDepartmentField(fieldName, data[fieldName]);
    Object.assign(errors, fieldErrors);
  });

  return errors;
};
