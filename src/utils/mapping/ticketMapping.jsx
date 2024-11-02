import { getTypesApi } from "../../services/apiModel/TypeApi";
import { getTicketById } from "../../services/apiModel/TicketApi";
import { getStatesApi } from "../../services/apiModel/StateApi";

export const ticketCreateMapping = async () => {
  const getTypes = await getTypesApi();
  const types =
    Array.isArray(getTypes) &&
    getTypes.filter((type) => type.tableRelation === "TICKET");

  if (!Array.isArray(types)) {
    return { error: "Error al obtener los tipos" };
  }

  const createTicket = {
    title: "Crear Ticket",
    fields: [
      {
        name: "typeId",
        label: "Tipo",
        type: "select",
        options: types.map((type) => ({
          value: type.idType,
          label: type.nameType,
        })),
      },
      {
        name: "affair",
        label: "Asunto",
        type: "textarea",
      },
    ],
  };

  return createTicket;
};

export const ticketEditMapping = async (id) => {
  const getTypes = await getTypesApi();
  const types = getTypes.filter((type) => type.tableRelation === "TICKET");
  const ticket = await getTicketById(id);
  const getStates = await getStatesApi();
  const states = getStates.filter((state) => state.tableRelation === "TICKET");

  if (ticket.error) {
    return { error: true, message: "Error al obtener el ticket" };
  }

  if (!Array.isArray(states)) {
    return { error: "Error al obtener los estados" };
  }

  if (!Array.isArray(types)) {
    return { error: "Error al obtener los tipos" };
  }

  const editTicket = {
    title: "Editar Ticket",
    fields: [
      {
        name: "typeId",
        label: "Tipo",
        type: "select",
        blocked: true,
        options: types.map((type) => ({
          value: type.idType,
          label: type.nameType,
        })),
        defaultValue: ticket.typeId,
      },
      {
        name: "affair",
        label: "Asunto",
        type: "textarea",
        blocked: true,
        defaultValue: ticket.affair,
      },
      {
        name: "dateCreated",
        label: "Fecha de Creación",
        type: "text",
        blocked: true,
        defaultValue: ticket.dateCreated,
      },

      {
        name: "dateAnswered",
        label: "Resuelto",
        type: "text",
        blocked: true,
        defaultValue: ticket.dateAnswered,
      },
      {
        name: "stateId",
        label: "Estado",
        type: "select",
        options: states.map((state) => ({
          value: state.idState,
          label: state.nameState,
        })),
        defaultValue: ticket.stateId,
      },
      {
        name: "response",
        label: "Respuesta",
        type: "textarea",
        defaultValue: ticket.response,
      },
      {
        name: "email",
        label: "Correo de respuesta",
        type: "text",
      },
    ],
  };

  return editTicket;
};
