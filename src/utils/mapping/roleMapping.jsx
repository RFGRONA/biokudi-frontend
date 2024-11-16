import { getRoleById } from "../../services/apiModel/RoleApi";
export const RoleCreateMapping = async () => {
  const createRole = {
    title: "Crear Role",
    fields: [
      {
        name: "nameRole",
        label: "Nombre",
        type: "text",
        required: true,
      },
    ],
  };
  return createRole;
};

export const RoleEditMapping = async (id) => {
  const data = await getRoleById(id);

  if (data.error) {
    return { error: true, message: "Error al obtener el rol" };
  }

  const editRole = {
    title: "Editar Role",
    fields: [
      {
        name: "nameRole",
        label: "Nombre",
        type: "text",
        required: true,
        defaultValue: data.nameRole || "",
      },
    ],
  };

  return editRole;
};
