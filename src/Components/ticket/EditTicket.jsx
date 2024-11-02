import React, { useState, useEffect } from "react";
import Edit from "../CRUD_Layout/Edit";
import Header2 from "../header/Header2";
import Footer from "../footer/Footer";
import { placeEditMapping } from "../../utils/mapping/placeMapping";
import {
  ValidatePlaceForm,
  ValidatePlaceField,
} from "../../utils/validate/ValidatePlaceForm";
import { useNavigate, useParams } from "react-router-dom";
import { updatePlaceApi } from "../../services/apiModel/PlaceApi";
import Loading from "../helpers/loading/Loading";
import ErrorAlert from "../helpers/alerts/ErrorAlert";
import Success from "../helpers/alerts/SuccessAlert";
import { ticketEditMapping } from "../../utils/mapping/ticketMapping";
import {
  ValidateResponseTicketField,
  ValidateResponseTicketForm,
} from "../../utils/validate/ValidateTicketForm";
import { updateTicketApi } from "../../services/apiModel/TicketApi";
import { useAuth } from "../../context/AuthContext";

const EditTicket = () => {
  const { index } = useParams();
  const { user } = useAuth();
  const [fields, setFields] = useState([]);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    const fetchFields = async () => {
      const ticketMapping = await ticketEditMapping(index);
      if (ticketMapping.error) {
        setNotFound(true);
        return;
      }
      setFields(ticketMapping.fields);

      // Inicializar formData con los valores predeterminados de los campos
      const initialData = ticketMapping.fields.reduce((acc, field) => {
        acc[field.name] = field.defaultValue;
        return acc;
      }, {});
      setFormData(initialData);
    };

    fetchFields();
  }, [index]);

  const handleFieldChange = (e) => {
    const { name, value, type, options } = e.target;

    let newValue;
    if (type === "select-multiple") {
      const selectedOptions = Array.from(options)
        .filter((option) => option.selected)
        .map((option) => option.value);
      newValue = selectedOptions;
    } else if (type === "checkbox") {
      newValue = e.target.checked;
    } else {
      newValue = value;
    }

    // Actualizar formData
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: newValue,
    }));

    // Validar el campo específico
    const fieldErrors = ValidateResponseTicketField(name, newValue);
    setErrors((prevErrors) => ({
      ...prevErrors,
      ...fieldErrors,
    }));
  };

  const handleEdit = async (data) => {
    setLoading(true);

    // Validar todo el formulario
    const errors = ValidateResponseTicketForm(data);
    setErrors(errors);

    if (Object.keys(errors).some((key) => errors[key])) {
      setLoading(false);
      return;
    }

    try {
      data.answeredBy = user.name;
      const response = await updateTicketApi(index, data);
      if (response.status === 200) {
        setAlertMessage("Ticket respondido con éxito");
        setShowSuccessAlert(true);
      } else {
        setAlertMessage("Error al responder el ticket");
        setShowErrorAlert(true);
      }
    } catch (error) {
      console.error("Error al responder el ticket:", error);
      setErrors({ general: "Error al responder el ticket" });
      setAlertMessage("Error al responder el ticket");
      setShowErrorAlert(true);
    } finally {
      setLoading(false);
    }
  };

  if (notFound) {
    navigate("/error");
  }

  return (
    <>
      <Header2 />
      {showErrorAlert && <ErrorAlert message={alertMessage} />}
      {showSuccessAlert && (
        <Success message={alertMessage} redirect={navigate("/tickets")} />
      )}
      <div className="mainContainer">
        {loading ? (
          <Loading />
        ) : (
          <Edit
            title={"Tickets"}
            fields={fields}
            formData={formData}
            errors={errors}
            onFieldChange={handleFieldChange}
            onSubmit={handleEdit}
          />
        )}

        <Footer />
      </div>
    </>
  );
};

export default EditTicket;
