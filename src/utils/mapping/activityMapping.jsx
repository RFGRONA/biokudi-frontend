import { getActivityById } from "../../services/apiModel/ActivityApi";
export const ActivityCreateMapping = async () => {
  const createPlace = {
    title: "Crear Actividad",
    fields: [
      {
        name: "nameActivity",
        label: "Nombre",
        type: "text",
        required: true,
      },
      {
        name: "urlIcon",
        label: "Icono URL",
        type: "textarea",
        required: true,
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
        required: true,
        defaultValue: data.nameActivity || "",
      },
      {
        name: "urlIcon",
        label: "Icono URL",
        type: "textarea",
        required: true,
        defaultValue: data.urlIcon || "",
      },
    ],
  };

  return editActivity;
};
