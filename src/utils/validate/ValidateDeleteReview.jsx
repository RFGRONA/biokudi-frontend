export const ValidateDeleteReviewField = (fieldName, value) => {
  const errors = {};

  switch (fieldName) {
    case "reason":
      if (!value) {
        errors.reason = "Razón es requerida";
      } else if (value.length > 20) {
        errors.reason = "Razón debe tener menos de 20 caracteres";
      } else {
        errors.reason = "";
      }
      break;

    case "comment":
      if (!value) {
        errors.comment = "Comentario es requerido";
      } else if (value.length > 100) {
        errors.comment = "Comentario debe tener menos de 100 caracteres";
      } else {
        errors.comment = "";
      }
      break;

    case "personEmail":
      if (!value) {
        errors.personEmail = "Correo de usuario es requerido";
      } else {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
          errors.personEmail = "Correo de usuario no es válido";
        } else {
          errors.userpersonEmailEmail = "";
        }
      }
      break;

    default:
      break;
  }

  return errors;
};

export const ValidateDeleteReviewForm = (data) => {
  const errors = {};

  Object.keys(data).forEach((fieldName) => {
    const fieldErrors = ValidateDeleteReviewField(fieldName, data[fieldName]);
    Object.assign(errors, fieldErrors);
  });

  return errors;
};
