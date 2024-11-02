import React from "react";
import Layout from "./Layout";
import Icon from "../../assets/policies/contact.svg";
import ContactForm from "./ContactForm";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ticketCreateMapping } from "../../utils/mapping/ticketMapping";
import { ValidateTicketField } from "../../utils/validate/ValidateTicketForm";
import { ValidateTicketForm } from "../../utils/validate/ValidateTicketForm";
import { createTicketApi } from "../../services/apiModel/TicketApi";
import ErrorAlert from "../helpers/alerts/ErrorAlert";
import Success from "../helpers/alerts/SuccessAlert";
import Loading from "../helpers/loading/Loading";
import { useAuth } from "../../context/AuthContext";
import Error from "../error/Error";

const Contact = () => {
  const [fields, setFields] = useState([]);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [notFound, setNotFound] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const { user } = useAuth();

  useEffect(() => {
    const fetchFields = async () => {
      const ticketMapping = await ticketCreateMapping();
      if (ticketMapping.error) {
        setNotFound(true);
        return;
      }
      setFields(ticketMapping.fields);
    };

    fetchFields();
  }, []);

  const handleFieldChange = (e) => {
    const { name, value } = e.target;

    // Actualizar formData
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

    // Validar el campo específico
    const fieldErrors = ValidateTicketField(name, value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      ...fieldErrors,
    }));
  };

  const handleCreate = async (data) => {
    setLoading(true);

    //Validate form data
    const errors = ValidateTicketForm(data);
    setErrors(errors);

    if (Object.keys(errors).some((key) => errors[key])) {
      setLoading(false);
      return;
    }

    //Create ticket
    try {
      data.personId = user.id;
      data.email = user.email;
      const response = await createTicketApi(data);
      if (response.status === 200) {
        setAlertMessage("Ticket creado correctamente");
        setShowSuccessAlert(true);
      } else {
        setShowErrorAlert(true);
        setAlertMessage("Error creando ticket");
      }
    } catch (error) {
      setErrors({ general: "Error creando ticket" });
      setAlertMessage("Error creando ticket");
      setShowErrorAlert(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {notFound ? (
        <Error
          errorCode={404}
          errorMessage={"No es posible cargar el formulario"}
        />
      ) : (
        <Layout icon={Icon} title="Contacto">
          {showErrorAlert && <ErrorAlert message={alertMessage} />}
          {showSuccessAlert && (
            <Success message={alertMessage} redirect={navigate("/")} />
          )}
          {loading ? (
            <Loading />
          ) : (
            <ContactForm
              fields={fields}
              formData={formData}
              errors={errors}
              onFieldChange={handleFieldChange}
              onSubmit={handleCreate}
            />
          )}
        </Layout>
      )}
    </>
  );
};

export default Contact;
