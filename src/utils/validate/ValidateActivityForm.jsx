export const ValidateActivityForm = (data) => {
  const errors = {};

  if (!data.nameActivity) {
    errors.nameActivity = "Nombre es requerido";
  } else if (data.nameActivity.length < 3) {
    errors.nameActivity = "Nombre debe tener al menos 3 caracteres";
  } else if (data.nameActivity.length > 120) {
    errors.nameActivity = "Nombre debe tener menos de 120 caracteres";
  }

  if (!data.urlIcon) {
    errors.urlIcon = "Nombre es requerido";
  } else if (data.urlIcon.length < 3) {
    errors.urlIcon = "Nombre debe tener al menos 3 caracteres";
  } else if (data.urlIcon.length > 250) {
    errors.urlIcon = "Nombre debe tener menos de 250 caracteres";
  }

  if (Object.keys(errors).length === 0) {
    return {};
  } else {
    return errors;
  }
};
