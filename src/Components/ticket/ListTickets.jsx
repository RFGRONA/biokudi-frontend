import React from "react";
import Header from "../header/Header2";
import Footer from "../footer/Footer";
import Read from "../CRUD_Layout/Read";
import { getPlaceApi, deletePlaceApi } from "../../services/apiModel/PlaceApi";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ErrorAlert from "../helpers/alerts/ErrorAlert";
import { getTicketsApi } from "../../services/apiModel/TicketApi";

const ListTickets = () => {
  const [tickets, setTickets] = useState([]);
  const navigate = useNavigate();
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    const fetchFields = async () => {
      const listTickets = await getTicketsApi();
      if (Array.isArray(listTickets)) {
        const transformedPlaces = listTickets.map((ticket) => [
          ticket.idTicket,
          ticket.affair,
          ticket.dateCreated,
          ticket.dateAnswered,
          ticket.answeredBy,
          ticket.scalpAdmin ? "Si" : "No",
          ticket.personName,
          ticket.personEmail,
          ticket.stateName,
          ticket.typeName,
        ]);

        setTickets(transformedPlaces);
      } else {
        setTickets({ error: true, message: "Error obteniendo lugares" });
      }
    };

    fetchFields();
  }, []);

  const subtitle = [
    "Id",
    "Asunto",
    "Creado en",
    "Respondido en",
    "Respondido por",
    "Escalado a admin",
    "Nombre de la persona",
    "Correo de la persona",
    "Estado",
    "Tipo",
  ];

  const handleEdit = (index) => {
    navigate(`/EditTicket/${index}`);
  };

  return (
    <>
      <Header />
      <div className="mainContainer">
        {showErrorAlert && <ErrorAlert message={alertMessage} />}
        <Read
          title={"Tickets"}
          subtitle={subtitle}
          data={tickets}
          onEdit={handleEdit}
        />
      </div>
      <Footer />
    </>
  );
};

export default ListTickets;
