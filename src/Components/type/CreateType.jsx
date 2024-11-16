import React from "react";
import Create from "../CRUD_Layout/Create";
import Header2 from "../header/Header2";
import Footer from "../footer/Footer";
import {
  ValidateTypeForm,
  ValidateTypeField,
} from "../../utils/validate/ValidateTypeForm";
import { useState } from "react";
import { useEffect } from "react";
import SuccessAlert from "../helpers/alerts/SuccessAlert";
import { useNavigate } from "react-router-dom";
import ErrorAlert from "../helpers/alerts/ErrorAlert";
import { TypeCreateMapping } from "../../utils/mapping/typeMapping";
import Loading from "../helpers/loading/Loading";
import { createTypeApi } from "../../services/apiModel/TypeApi";

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
      const typeMapping = await TypeCreateMapping();
      setFields(typeMapping.fields);
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

    const fieldErrors = ValidateTypeField(name, value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      ...fieldErrors,
    }));
  };

  /*Errors handle */
  const handleCreate = async (data) => {
    setLoading(true);

    const errors = ValidateTypeForm(data);
    setErrors(errors);

    if (Object.keys(errors).some((key) => errors[key])) {
      setLoading(false);
      return;
    }

    try {
      const response = await createTypeApi(data);
      if (response.status === 200) {
        console.log("Tipo creado con éxito");
        setAlertMessage("Tipo creado con éxito");
        setShowSuccessAlert(true);
      } else {
        console.log("Error al crear Tipo");
        setAlertMessage("Error al crear Tipo");
        setShowErrorAlert(true);
      }
    } catch (error) {
      setErrors({ general: "Error al crear Tipo" });
      setAlertMessage("Error al crear Tipo");
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
          onClose={() => navigate("/types")}
        />
      )}
      {showErrorAlert && <ErrorAlert message={alertMessage} />}
      <Create
        title={"Tipos"}
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
