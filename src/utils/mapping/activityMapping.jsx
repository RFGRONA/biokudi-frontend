import { getActivityById } from "../../services/apiModel/ActivityApi";
export const ActivityCreateMapping = async () => {
  const createPlace = {
    title: "Crear Actividad",
    fields: [
      {
        name: "nameActivity",
        label: "Nombre",
        type: "text",
      },
      {
        name: "urlIcon",
        label: "Icono URL",
        type: "textarea",
      },
    ],
  };
  return createPlace;
};

export const ActivityEditMapping = async (id) => {
  const data = await getActivityById(id);

  if (data.error) {
    return { error: true, message: "Error al obtener el lugar" };
  }

  const editActivity = {
    title: "Editar Actividad",
    fields: [
      {
        name: "nameActivity",
        label: "Nombre",
        type: "text",
        defaultValue: data.nameActivity || "",
      },
      {
        name: "urlIcon",
        label: "Icono URL",
        type: "textarea",
        defaultValue: data.urlIcon || "",
      },
    ],
  };

  return editActivity;
};
