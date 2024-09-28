import { getCitiesApi } from "../../services/apiModel/CityApi";
import { getStatesApi } from "../../services/apiModel/StateApi";
const placeCreateMapping = async () => {
  const cities = await getCitiesApi();
  if (!Array.isArray(cities)) {
    return { error: "Error al obtener las ciudades" };
  }
  // const states = getStatesApi();

  const states = [
    {
      id: 1,
      name: "Activo",
    },
    {
      id: 2,
      name: "Inactivo",
    },
  ];

  const createPlace = {
    title: "Crear Lugar",
    fields: [
      {
        name: "name",

        label: "Nombre",
        type: "text",
      },
      {
        name: "latitude",
        label: "Latitud",
        type: "number",
      },
      {
        name: "longitude",
        label: "Longitud",
        type: "number",
      },
      {
        name: "description",
        label: "Descripción",
        type: "textarea",
      },
      {
        name: "link",
        label: "Link",
        type: "textarea",
      },
      {
        name: "city",
        label: "Ciudad",
        type: "select",
        options: cities.map((city) => ({
          value: city.idCity,
          label: city.nameCity,
        })),
      },
      {
        name: "state",
        label: "Estado",
        type: "select",
        options: states.map((states) => ({
          value: states.id,
          label: states.name,
        })),
      },
    ],
  };
  return createPlace;
};
export default placeCreateMapping;
