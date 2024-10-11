export const ValidateStateForm = (data) => {
  const errors = {};
  if (!data.nameState) {
    errors.nameState = "Nombre es requerido";
  } else if (data.nameState.length < 3) {
    errors.nameState = "Nombre debe tener al menos 3 caracteres";
  } else if (data.nameState.length > 25) {
    errors.nameState = "Nombre debe tener menos de 25 caracteres";
  }

  if (!data.tableRelation) {
    errors.tableRelation = "Tabla es requerida";
  } else if (data.tableRelation === "0") {
    errors.tableRelation = "Tabla es requerida";
  }

  if (Object.keys(errors).length === 0) {
    return {};
  } else {
    return errors;
  }
};
