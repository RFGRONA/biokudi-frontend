export const StateCreateMapping = async () => {
  const TABLES = [
    {
      idTable: 1,
      nameTable: "Test",
    },
    {
      idTable: 2,
      nameTable: "Test",
    },
    {
      idTable: 3,
      nameTable: "Test",
    },
    {
      idTable: 4,
      nameTable: "Test",
    },
  ];

  const createState = {
    title: "Crear Actividad",
    fields: [
      {
        name: "nameState",
        label: "Nombre",
        type: "text",
      },
      {
        name: "tableId",
        label: "Tabla",
        type: "select",
        options: TABLES.map((table) => ({
          value: table.idTable,
          label: table.nameTable,
        })),
      },
    ],
  };
  return createState;
};
