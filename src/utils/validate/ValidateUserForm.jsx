export const ValidateUserField = (fieldName, value) => {
  const errors = {};

  switch (fieldName) {
    case "nameUser":
      if (!value) {
        errors.nameUser = "Nombre es requerido";
      } else if (value.length < 3) {
        errors.nameUser = "Nombre debe tener al menos 3 caracteres";
      } else if (value.length > 25) {
        errors.nameUser = "Nombre debe tener menos de 25 caracteres";
      } else {
        errors.nameUser = "";
      }
      break;

    case "emailUser":
      if (!value) {
        errors.emailUser = "Correo es requerido";
      } else {
        errors.emailUser = "";
      }
      break;

    case "stateId":
      if (!value) {
        errors.stateId = "Estado es requerido";
      } else {
        errors.stateId = "";
      }
      break;

    default:
      break;
  }

  return errors;
};

export const ValidateUserForm = (data) => {
  const errors = {};

  Object.keys(data).forEach((fieldName) => {
    const fieldErrors = ValidateUserField(fieldName, data[fieldName]);
    Object.assign(errors, fieldErrors);
  });

  return errors;
};

/* Profile Validator */
export const ValidateProfileField = (fieldName, value) => {
  const errors = {};

  switch (fieldName) {
    case "profilePicture":
      if (!value) {
        errors.profilePicture = "Imagen es requerida";
      }
      // Do not set errors.profilePicture when there's no error
      break;

    case "userName":
      if (!value) {
        errors.userName = "Nombre es requerido";
      } else if (value.length < 3) {
        errors.userName = "Nombre debe tener al menos 3 caracteres";
      } else if (value.length > 25) {
        errors.userName = "Nombre debe tener menos de 25 caracteres";
      }
      // Do not set errors.userName when there's no error
      break;

    case "email":
      if (!value) {
        errors.email = "Correo es requerido";
      }
      // Do not set errors.email when there's no error
      break;

    case "phoneNumber":
      if (!value) {
        errors.phoneNumber = "Teléfono es requerido";
      } else if (isNaN(value)) {
        errors.phoneNumber = "Teléfono debe ser un número";
      } else if (value.length < 10) {
        errors.phoneNumber = "Teléfono debe tener al menos 10 numeros";
      } else if (value.length > 10) {
        errors.phoneNumber = "Teléfono debe tener menos de 10 numeros";
      }
      // Do not set errors.phoneNumber when there's no error
      break;

    default:
      break;
  }

  return errors;
};

export const ValidateProfileForm = (data) => {
  const errors = {};

  Object.keys(data).forEach((fieldName) => {
    const fieldErrors = ValidateProfileField(fieldName, data[fieldName]);
    Object.assign(errors, fieldErrors);
  });

  return errors;
};
