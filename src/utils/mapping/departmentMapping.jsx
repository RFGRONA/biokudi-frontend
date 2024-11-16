import {
  getDepartmentById,
  getDepartmentsApi,
} from "../../services/apiModel/DepartmentApi";
import { getStateById } from "../../services/apiModel/StateApi";
import { getTablesApi } from "../../services/apiModel/TableApi";

export const DepartmentCreateMapping = async () => {
  try {
    const departments = await getDepartmentsApi();

    if (departments.error) {
      return {
        title: "Crear Departamento",
        fields: [
          {
            name: "nameDepartment",
            label: "Nombre departamento",
            type: "text",
            required: true,
          },
        ],
      };
    }
    const createDepartment = {
      title: "Crear Departamento",
      fields: [
        {
          name: "nameDepartment",
          label: "Nombre departamento",
          type: "text",
          required: true,
        },
      ],
    };
    return createDepartment;
  } catch (error) {
    console.log("Error obteniendo departamentos", error);
    return {
      title: "Crear Departamento",
      fields: [
        {
          name: "nameDepartment",
          label: "Nombre departamento",
          type: "text",
          required: true,
        },
      ],
    };
  }
};

export const departmentEditMapping = async (id) => {
  const departments = await getDepartmentsApi();
  const data = await getDepartmentById(id);

  if (!Array.isArray(departments)) {
    return { error: "Error al obtener los departamentos" };
  }

  const editState = {
    title: "Editar Departamento",
    fields: [
      {
        name: "nameDepartment",
        label: "Nombre departamento",
        type: "text",
        required: true,
        defaultValue: data.nameDepartment,
      },
    ],
  };

  return editState;
};
