import { getCitiesApi } from "../../services/apiModel/CityApi";
import { getStatesApi } from "../../services/apiModel/StateApi";
import { getPlaceById } from "../../services/apiModel/PlaceApi";
import { getActivitiesApi } from "../../services/apiModel/ActivityApi";

export const placeCreateMapping = async () => {
  const cities = await getCitiesApi();
  const states = await getStatesApi();
  const activities = await getActivitiesApi();
  const createPlace = {
    title: "Crear Lugar",
    fields: [
      {
        name: "namePlace",
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
        name: "address",
        label: "Dirección",
        type: "textarea",
      },
      {
        name: "link",
        label: "Link",
        type: "textarea",
      },
      {
        name: "cityId",
        label: "Ciudad",
        type: "select",
        options: cities.map((city) => ({
          value: city.idCity,
          label: city.nameCity,
        })),
      },
      {
        name: "stateId",
        label: "Estado",
        type: "select",
        options: states.map((states) => ({
          value: states.idState,
          label: states.nameState,
        })),
      },
      {
        name: "activities",
        label: "Actividades",
        type: "select",
        multiple: true,
        options: activities.map((activity) => ({
          value: activity.idActivity,
          label: activity.nameActivity,
        })),
      },
      {
        name: "picture",
        label: "Imagen",
        type: "file",
        accept: "image/jpeg, image/png",
        require: false,
      },
    ],
  };
  return createPlace;
};

export const placeEditMapping = async (id) => {
  const cities = await getCitiesApi();
  const states = await getStatesApi();
  const activities = await getActivitiesApi();
  const data = await getPlaceById(id);

  if (data.error) {
    return { error: true, message: "Error al obtener el lugar" };
  }
  if (!Array.isArray(cities)) {
    return { error: "Error al obtener las ciudades" };
  }
  if (!Array.isArray(states)) {
    return { error: "Error al obtener los estados" };
  }

  const editPlace = {
    title: "Editar lugar",
    fields: [
      {
        name: "namePlace",
        label: "Nombre",
        type: "text",
        defaultValue: data.namePlace || "",
      },
      {
        name: "latitude",
        label: "Latitud",
        type: "number",
        defaultValue: data.latitude || 0,
      },
      {
        name: "longitude",
        label: "Longitud",
        type: "number",
        defaultValue: data.longitude || 0,
      },
      {
        name: "description",
        label: "Descripción",
        type: "textarea",
        defaultValue: data.description || "",
      },
      {
        name: "address",
        label: "Dirección",
        type: "textarea",
        defaultValue: data.address || "",
      },
      {
        name: "link",
        label: "Link",
        type: "textarea",
        defaultValue: data.link || "",
      },
      {
        name: "cityId",
        label: "Ciudad",
        type: "select",
        options: cities.map((city) => ({
          value: city.idCity,
          label: city.nameCity,
        })),
        defaultValue: data.idCity ? data.idCity : "",
      },
      {
        name: "stateId",
        label: "Estado",
        type: "select",
        options: states.map((state) => ({
          value: state.idState,
          label: state.nameState,
        })),
        defaultValue: data.idState ? data.idState : "",
      },
      {
        name: "activities",
        label: "Actividades",
        type: "select",
        multiple: true,
        options: activities.map((activity) => ({
          value: activity.idActivity,
          label: activity.nameActivity,
        })),
        defaultValue: data.activities
          ? data.activities.map((activity) => activity.idActivity)
          : [],
      },
      {
        name: "picture",
        label: "Imagen",
        type: "file",
        accept: "image/jpeg, image/png",
        require: false,
      },
    ],
  };

  return editPlace;
};
