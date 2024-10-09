export const ValidateStateForm = (data) => {
  const errors = {};
  if (!data.nameState) {
    errors.nameState = "Nombre es requerido";
  } else if (data.nameState.length < 3) {
    errors.nameState = "Nombre debe tener al menos 3 caracteres";
  } else if (data.nameState.length > 25) {
    errors.nameState = "Nombre debe tener menos de 25 caracteres";
  }

  if (!data.tableId) {
    errors.tableId = "Tabla es requerida";
  } else if (data.tableId === "0") {
    errors.tableId = "Tabla es requerida";
  }

  if (Object.keys(errors).length === 0) {
    return {};
  } else {
    return errors;
  }
};
