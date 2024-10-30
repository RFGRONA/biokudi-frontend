import React, { useState, useEffect } from "react";
import Edit from "../CRUD_Layout/Edit";
import Header2 from "../header/Header2";
import Footer from "../footer/Footer";
import { ActivityEditMapping } from "../../utils/mapping/activityMapping";
import {
  ValidateActivityField,
  ValidateActivityForm,
} from "../../utils/validate/ValidateActivityForm";
import { useNavigate, useParams } from "react-router-dom";
import { updateActivityApi } from "../../services/apiModel/ActivityApi";
import Loading from "../helpers/loading/Loading";
import ErrorAlert from "../helpers/alerts/ErrorAlert";
import Success from "../helpers/alerts/SuccessAlert";

const EditActivity = () => {
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
      setLoading(true);
      const activityMapping = await ActivityEditMapping(index);
      if (activityMapping.error) {
        setNotFound(true);
        setLoading(false);
        return;
      }
      setFields(activityMapping.fields);

      // Inicializar formData con los valores predeterminados de los campos
      const initialData = activityMapping.fields.reduce((acc, field) => {
        acc[field.name] = field.defaultValue || "";
        return acc;
      }, {});
      setFormData(initialData);
      setLoading(false);
    };

    fetchFields();
  }, [index]);

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

  const handleEdit = async (data) => {
    setLoading(true);

    const errors = await ValidateActivityForm(data);
    console.log(errors);
    setErrors(errors);

    if (Object.keys(errors).some((key) => errors[key])) {
      setLoading(false);
      return;
    }

    try {
      const response = await updateActivityApi(index, data);
      console.log(response);
      if (response.status === 200 || response.status === 204) {
        setAlertMessage("Actividad actualizada correctamente");
        setShowSuccessAlert(true);
      } else {
        setAlertMessage("Error al actualizar la actividad");
        setShowErrorAlert(true);
      }
    } catch (error) {
      console.error("Error al actualizar la actividad:", error);
      setErrors({ general: "Error al actualizar la actividad" });
      setAlertMessage("Error al actualizar la actividad");
      setShowErrorAlert(true);
    } finally {
      setLoading(false);
    }
  };

  if (notFound) {
    navigate("/*");
    return null;
  }

  return (
    <>
      <Header2 />
      {showSuccessAlert && (
        <Success
          message={alertMessage}
          onClose={() => {
            navigate("/activities");
          }}
        />
      )}
      {showErrorAlert && <ErrorAlert message={alertMessage} />}
      {loading ? (
        <Loading />
      ) : (
        <div className="mainContainer">
          <Edit
            title={"Actividades"}
            fields={fields}
            formData={formData}
            onFieldChange={handleFieldChange}
            onSubmit={handleEdit}
            errors={errors}
          />
          <Footer />
        </div>
      )}
    </>
  );
};

export default EditActivity;
