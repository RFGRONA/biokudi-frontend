import React from "react";
import Create from "../CRUD_Layout/Create";
import Header2 from "../header/Header2";
import Footer from "../footer/Footer";
import {
  ValidateStateForm,
  ValidateStateField,
} from "../../utils/validate/ValidateStateForm";
import { useState } from "react";
import { useEffect } from "react";
import SuccessAlert from "../helpers/alerts/SuccessAlert";
import { useNavigate } from "react-router-dom";
import ErrorAlert from "../helpers/alerts/ErrorAlert";
import { createStateApi } from "../../services/apiModel/StateApi";
import { StateCreateMapping } from "../../utils/mapping/stateMapping";
import Loading from "../helpers/loading/Loading";

const CreateState = () => {
  const [fields, setFields] = useState([]);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchFields = async () => {
      const stateMapping = await StateCreateMapping();
      setFields(stateMapping.fields);
    };

    fetchFields();
  }, []);

  /*Fields change */
  const handleFieldChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

    const fieldErrors = ValidateStateField(name, value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      ...fieldErrors,
    }));
  };

  /*Errors handle */
  const handleCreate = async (data) => {
    setLoading(true);

    // Validar todo el formulario
    const errors = ValidateStateForm(data);
    setErrors(errors);

    if (Object.keys(errors).some((key) => errors[key])) {
      setLoading(false);
      return;
    }

    try {
      const response = await createStateApi(data);
      if (response.status === 200) {
        console.log("Estado creado con éxito");
        setAlertMessage("Estado creado con éxito");
        setShowSuccessAlert(true);
      } else {
        console.log("Error al crear estado");
        setAlertMessage("Error al crear estado");
        setShowErrorAlert(true);
      }
    } catch (error) {
      setErrors({ general: "Error al crear estado" });
      setAlertMessage("Error al crear estado");
      setShowErrorAlert(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header2 />
      {loading && <Loading />}
      {showSuccessAlert && (
        <SuccessAlert
          message={alertMessage}
          onClose={() => navigate("/states")}
        />
      )}
      {showErrorAlert && <ErrorAlert message={alertMessage} />}
      <Create
        title={"Estados"}
        fields={fields}
        formData={formData}
        onFieldChange={handleFieldChange}
        onSubmit={handleCreate}
        errors={errors}
      />
      <Footer />
    </>
  );
};

export default CreateState;
