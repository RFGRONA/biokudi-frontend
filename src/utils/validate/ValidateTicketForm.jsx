export const ValidateTicketField = (fieldName, value) => {
  const errors = {};

  switch (fieldName) {
    case "affair":
      if (!value) {
        errors.affair = "Asunto es requerido";
      } else if (value.length < 10) {
        errors.affair = "Asunto debe tener al menos 10 caracteres";
      } else if (value.length > 1000) {
        errors.affair = "Asunto debe tener menos de 1000 caracteres";
      } else {
        errors.affair = "";
      }
      break;

    case "typeId":
      if (!value) {
        errors.stateId = "Tipo es requerido";
      } else {
        errors.stateId = "";
      }
      break;

    default:
      break;
  }

  return errors;
};

export const ValidateTicketForm = (data) => {
  const errors = {};

  Object.keys(data).forEach((fieldName) => {
    const fieldErrors = ValidateTicketField(fieldName, data[fieldName]);
    Object.assign(errors, fieldErrors);
  });

  return errors;
};

export const ValidateResponseTicketField = (fieldName, value) => {
  const errors = {};

  switch (fieldName) {
    case "response":
      if (!value) {
        errors.response = "Respuesta es requerida";
      } else if (value.length < 10) {
        errors.response = "Respuesta debe tener al menos 10 caracteres";
      } else if (value.length > 1000) {
        errors.response = "Respuesta debe tener menos de 1000 caracteres";
      } else {
        errors.response = "";
      }
      break;

    case "stateId":
      if (!value) {
        errors.stateId = "Estado es requerido";
      } else {
        errors.stateId = "";
      }
      break;

    case "email":
      if (!value) {
        errors.email = "Email es requerido";
      } else {
        errors.email = "";
      }
      break;

    default:
      break;
  }

  return errors;
};

export const ValidateResponseTicketForm = (data) => {
  const errors = {};

  Object.keys(data).forEach((fieldName) => {
    const fieldErrors = ValidateResponseTicketField(fieldName, data[fieldName]);
    Object.assign(errors, fieldErrors);
  });

  return errors;
};
