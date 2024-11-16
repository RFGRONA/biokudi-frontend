import { getTablesApi } from "../../services/apiModel/TableApi";
import { getTypeById } from "../../services/apiModel/TypeApi";

export const TypeCreateMapping = async () => {
  try {
    const tables = await getTablesApi();

    if (tables.error) {
      return {
        title: "Crear Tipo",
        fields: [
          {
            name: "nameType",
            label: "Nombre",
            type: "text",
            required: true,
          },
          {
            name: "tableRelation",
            label: "Tabla",
            type: "select",
            required: true,
            options: [],
          },
        ],
      };
    }
    const createType = {
      title: "Crear Tipo",
      fields: [
        {
          name: "nameType",
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
    return createType;
  } catch (error) {
    console.log("Error obteniendo tablas", error);
    return {
      title: "Crear Tipo",
      fields: [
        {
          name: "nameType",
          label: "Nombre",
          type: "text",
          required: true,
        },
        {
          name: "tableRelation",
          label: "Tabla",
          type: "select",
          required: true,
          options: [],
        },
      ],
    };
  }
};

export const TypeEditMapping = async (id) => {
  const tables = await getTablesApi();
  const data = await getTypeById(id);

  if (!Array.isArray(tables)) {
    return { error: "Error al obtener las tablas" };
  }

  const editType = {
    title: "Editar Tipo",
    fields: [
      {
        name: "nameType",
        label: "Nombre",
        type: "text",
        required: true,
        defaultValue: data.nameType,
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

  return editType;
};
