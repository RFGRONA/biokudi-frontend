export const ValidateRoleField = (fieldName, value) => {
  const errors = {};

  switch (fieldName) {
    case "nameRole":
      if (!value) {
        errors.nameRole = "Nombre es requerido";
      } else if (value.length < 3) {
        errors.nameRole = "Nombre debe tener al menos 3 caracteres";
      } else if (value.length > 40) {
        errors.nameRole = "Nombre debe tener menos de 40 caracteres";
      } else if (!/^[a-zA-Z]+$/.test(value)) {
        errors.nameRole = "Nombre debe contener solo letras";
      } else {
        errors.nameRole = "";
      }
      break;

    default:
      break;
  }

  return errors;
};

export const ValidateRoleForm = (data) => {
  const errors = {};

  Object.keys(data).forEach((fieldName) => {
    const fieldErrors = ValidateRoleField(fieldName, data[fieldName]);
    Object.assign(errors, fieldErrors);
  });

  return errors;
};
