import React, { useState, useEffect } from "react";
import Create from "../CRUD_Layout/Create";
import Header2 from "../header/Header2";
import Footer from "../footer/Footer";
import {
  ValidateActivityForm,
  ValidateActivityField,
} from "../../utils/validate/ValidateActivityForm";
import { useNavigate } from "react-router-dom";
import ErrorAlert from "../helpers/alerts/ErrorAlert";
import { createActivityApi } from "../../services/apiModel/ActivityApi";
import { ActivityCreateMapping } from "../../utils/mapping/activityMapping";
import Loading from "../helpers/loading/Loading";

const CreateActivity = () => {
  const [fields, setFields] = useState([]);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    const fetchFields = async () => {
      const activityMapping = await ActivityCreateMapping();
      setFields(activityMapping.fields);
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
    const fieldErrors = ValidateActivityField(name, value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      ...fieldErrors,
    }));
  };

  const handleCreate = async (data) => {
    setLoading(true);

    // Validar todo el formulario
    const errors = ValidateActivityForm(data);
    setErrors(errors);

    if (Object.keys(errors).some((key) => errors[key])) {
      setLoading(false);
      return;
    }

    try {
      const response = await createActivityApi(data);
      if (response.status === 200) {
        navigate("/activities");
      } else {
        setAlertMessage("Error al crear actividad");
        setShowErrorAlert(true);
      }
    } catch (error) {
      setErrors({ general: "Error al crear actividad" });
      setAlertMessage("Error al crear actividad");
      setShowErrorAlert(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header2 />
      {showErrorAlert && <ErrorAlert message={alertMessage} redirect={""} />}
      {loading ? (
        <Loading />
      ) : (
        <Create
          title={"Actividades"}
          fields={fields}
          formData={formData}
          errors={errors}
          onFieldChange={handleFieldChange}
          onSubmit={handleCreate}
        />
      )}
      <Footer />
    </>
  );
};

export default CreateActivity;
