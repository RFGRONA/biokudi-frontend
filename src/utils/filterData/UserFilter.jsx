// place filter functions
export const getUserOrderAttributes = () => {
  return ["Id", "Nombre", "Correo", "Rol", "Estado"];
};

export const sortUsers = (dataState, attribute, subtitle) => {
  const attributeIndexInSubtitle = subtitle.indexOf(attribute);
  if (attributeIndexInSubtitle === -1) {
    throw new Error(
      `El atributo ${attribute} no se encontró en los subtítulos`
    );
  }
  const dataAttributeIndex = attributeIndexInSubtitle;

  const sortedData = [...dataState].sort((a, b) => {
    const valA = a[dataAttributeIndex];
    const valB = b[dataAttributeIndex];
    if (typeof valA === "number" && typeof valB === "number") {
      return valA - valB;
    } else {
      return String(valA).localeCompare(String(valB));
    }
  });
  return sortedData;
};