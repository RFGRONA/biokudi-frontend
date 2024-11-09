import {
  getCitiesApi,
  getCityApi,
  getCityById,
} from "../../services/apiModel/CityApi";
import { getDepartmentsApi } from "../../services/apiModel/DepartmentApi";
import { getStateById } from "../../services/apiModel/StateApi";
import { getTablesApi } from "../../services/apiModel/TableApi";

export const CityCreateMapping = async () => {
  try {
    const departments = await getDepartmentsApi();

    if (departments.error) {
      return {
        title: "Crear Ciudad",
        fields: [
          {
            name: "nameCity",
            label: "Nombre",
            type: "text",
            required: true,
          },
          {
            name: "idDepartment",
            label: "Departamento",
            type: "select",
            required: true,
            options: departments.map((department) => ({
              value: department.idDepartment,
              label: department.nameDepartment,
            })),
          },
        ],
      };
    }
    const createCity = {
      title: "Crear Ciudad",
      fields: [
        {
          name: "nameCity",
          label: "Nombre",
          type: "text",
          required: true,
        },
        {
          name: "idDepartment",
          label: "Departamento",
          type: "select",
          required: true,
          options: departments.map((department) => ({
            value: department.idDepartment,
            label: department.nameDepartment,
          })),
        },
      ],
    };
    return createCity;
  } catch (error) {
    console.log("Error obteniendo departamentos", error);
    return {
      title: "Crear Ciudad",
      fields: [
        {
          name: "nameCity",
          label: "Nombre",
          type: "text",
          required: true,
        },
        {
          name: "idDepartment",
          label: "Departamento",
          type: "select",
          required: true,
          options: [],
        },
      ],
    };
  }
};

export const cityEditMapping = async (id) => {
  const departments = await getDepartmentsApi();
  const data = await getCityById(id);

  if (!Array.isArray(departments)) {
    return { error: "Error al obtener los departamentos" };
  }

  const editState = {
    title: "Editar Ciudad",
    fields: [
      {
        name: "nameCity",
        label: "Nombre",
        type: "text",
        required: true,
        defaultValue: data.nameCity,
      },
      {
        name: "idDepartment",
        label: "Tabla",
        type: "select",
        required: true,
        options: departments.map((department) => ({
          value: department.idDepartment,
          label: department.nameDepartment,
        })),
        defaultValue: data.idDepartment ? data.idDepartment : "",
      },
    ],
  };

  return editState;
};
