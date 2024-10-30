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

const EditPlace = () => {
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
      const placeMapping = await placeEditMapping(index);
      if (placeMapping.error) {
        setNotFound(true);
        return;
      }
      setFields(placeMapping.fields);

      // Inicializar formData con los valores predeterminados de los campos
      const initialData = placeMapping.fields.reduce((acc, field) => {
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
    const fieldErrors = ValidatePlaceField(name, newValue);
    setErrors((prevErrors) => ({
      ...prevErrors,
      ...fieldErrors,
    }));
  };

  const handleEdit = async (data) => {
    setLoading(true);

    // Validar todo el formulario
    const errors = ValidatePlaceForm(data);
    setErrors(errors);

    if (Object.keys(errors).some((key) => errors[key])) {
      setLoading(false);
      return;
    }

    try {
      if (Array.isArray(data.activities)) {
        data.activities = data.activities.map((id) => ({ idActivity: id }));
      }

      const response = await updatePlaceApi(index, data);
      if (response.status === 200) {
        setAlertMessage("Lugar actualizado con éxito");
        setShowSuccessAlert(true);
      } else {
        setAlertMessage("Error al actualizar el lugar");
        setShowErrorAlert(true);
      }
    } catch (error) {
      console.error("Error al actualizar el lugar:", error);
      setErrors({ general: "Error al actualizar el lugar" });
      setAlertMessage("Error al actualizar el lugar");
      setShowErrorAlert(true);
    } finally {
      setLoading(false);
    }
  };

  if (notFound) {
    navigate("/*");
  }

  return (
    <>
      <Header2 />
      {showErrorAlert && <ErrorAlert message={alertMessage} />}
      {showSuccessAlert && (
        <Success message={alertMessage} redirect={navigate("/places")} />
      )}
      <div className="mainContainer">
        {loading ? (
          <Loading />
        ) : (
          <Edit
            title={"Lugares"}
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

export default EditPlace;
