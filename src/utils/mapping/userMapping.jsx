import { getRoles } from "@testing-library/react";
import { getStatesApi } from "../../services/apiModel/StateApi";
import { getUserById } from "../../services/apiModel/UserApi";
import { getRolesApi } from "../../services/apiModel/RoleApi";

export const userEditMapping = async (id) => {
  const roles = await getRolesApi();
  const data = await getUserById(id);

  if (data.error) {
    return { error: true, message: "Error al obtener el usuario" };
  }
  if (!Array.isArray(roles)) {
    return { error: "Error al obtener los roles" };
  }

  const editUser = {
    title: "Editar usuario",
    fields: [
      {
        name: "nameUser",
        label: "Nombre",
        type: "text",
        defaultValue: data.nameUser || "",
      },
      {
        name: "emailUser",
        label: "Correo",
        type: "text",
        defaultValue: data.email || 0,
      },
      {
        name: "roleId",
        label: "Rol",
        type: "select",
        options: roles.map((role) => ({
          value: role.idRole,
          label: role.nameRole,
        })),
        defaultValue: data.roleId ? data.roleId : "",
      },
    ],
  };
  return editUser;
};
