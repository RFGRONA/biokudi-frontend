import { getStateById } from "../../services/apiModel/StateApi";
import { getTablesApi } from "../../services/apiModel/TableApi";

export const StateCreateMapping = async () => {
  try {
    const tables = await getTablesApi();

    if (tables.error) {
      return {
        title: "Crear Actividad",
        fields: [
          {
            name: "nameState",
            label: "Nombre",
            type: "text",
            required: true,
          },
          {
            name: "tableId",
            label: "Tabla",
            type: "select",
            required: true,
            options: [], // Array vacío cuando hay error
          },
        ],
      };
    }
    const createState = {
      title: "Crear Actividad",
      fields: [
        {
          name: "nameState",
          label: "Nombre",
          type: "text",
          required: true,
        },
        {
          name: "tableRelation",
          label: "Tabla",
          type: "select",
          required: true,
          options: tables.map((table) => ({
            value: table.idTableRelation,
            label: table.tableRelation,
          })),
        },
      ],
    };
    return createState;
  } catch (error) {
    console.log("Error obteniendo tablas", error);
    return {
      title: "Crear Actividad",
      fields: [
        {
          name: "nameState",
          label: "Nombre",
          type: "text",
          required: true,
        },
        {
          name: "tableId",
          label: "Tabla",
          type: "select",
          required: true,
          options: [], // Array vacío cuando hay error
        },
      ],
    };
  }
};

export const stateEditMapping = async (id) => {
  const tables = await getTablesApi();
  const data = await getStateById(id);

  if (!Array.isArray(tables)) {
    return { error: "Error al obtener las tablas" };
  }

  const editState = {
    title: "Editar Estado",
    fields: [
      {
        name: "nameState",
        label: "Nombre",
        type: "text",
        required: true,
        defaultValue: data.nameState,
      },
      {
        name: "tableRelation",
        label: "Tabla",
        type: "select",
        required: true,
        options: tables.map((table) => ({
          value: table.idTableRelation,
          label: table.tableRelation,
        })),
        defaultValue: data.tableRelation,
      },
    ],
  };

  return editState;
};
