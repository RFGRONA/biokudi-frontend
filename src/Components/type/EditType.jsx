import React, { useState, useEffect } from "react";
import Edit from "../CRUD_Layout/Edit";
import Header2 from "../header/Header2";
import Footer from "../footer/Footer";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../helpers/loading/Loading";
import ErrorAlert from "../helpers/alerts/ErrorAlert";
import Success from "../helpers/alerts/SuccessAlert";
import { TypeEditMapping } from "../../utils/mapping/typeMapping";
import {
  ValidateTypeForm,
  ValidateTypeField,
} from "../../utils/validate/ValidateTypeForm";
import { updateTypeApi } from "../../services/apiModel/TypeApi";

const EditType = () => {
  const { index } = useParams();
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
      const typeMapping = await TypeEditMapping(index);
      if (typeMapping.error) {
        setNotFound(true);
        return;
      }
      setFields(typeMapping.fields);

      // Init the form with the default values
      const initialData = typeMapping.fields.reduce((acc, field) => {
        acc[field.name] = field.defaultValue;
        return acc;
      }, {});
      setFormData(initialData);
    };

    fetchFields();
  }, [index]);

  const handleFieldChange = (e) => {
    const { name, value } = e.target;

    // Update FormData
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

    // Validate specific field
    const fieldErrors = ValidateTypeField(name, value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      ...fieldErrors,
    }));
  };

  const handleEdit = async (data) => {
    setLoading(true);
    const errors = await ValidateTypeForm(data);
    setLoading(false);
    setErrors(errors);

    if (Object.keys(errors).some((key) => errors[key])) {
      setLoading(false);
      return;
    }
    try {
      const response = await updateTypeApi(index, data);
      if (response.status === 200) {
        setAlertMessage("Tipo actualizado correctamente");
        setShowSuccessAlert(true);
      } else {
        setAlertMessage("Error updating type");
        setShowErrorAlert(true);
      }
    } catch (error) {
      console.error("Error updating type:", error);
      setErrors({ general: "Error updating type" });
      setAlertMessage("Error updating type");
      setShowErrorAlert(true);
    }
  };

  if (notFound) {
    navigate("/*");
  }

  return (
    <>
      <Header2 />
      {showSuccessAlert && (
        <Success message={alertMessage} onClose={() => navigate("/Types")} />
      )}
      {loading && <Loading />}
      {showErrorAlert && (
        <ErrorAlert message={alertMessage} onClose={() => navigate("/Types")} />
      )}
      {showErrorAlert && <ErrorAlert message={alertMessage} />}
      <div className="mainContainer">
        <Edit
          title={"Tipos"}
          fields={fields}
          formData={formData}
          onFieldChange={handleFieldChange}
          onSubmit={handleEdit}
          errors={errors}
        />

        <Footer />
      </div>
    </>
  );
};

export default EditType;
