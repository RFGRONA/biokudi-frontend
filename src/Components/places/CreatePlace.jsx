import React, { useState, useEffect } from "react";
import Create from "../CRUD_Layout/Create";
import Header2 from "../header/Header2";
import Footer from "../footer/Footer";
import { placeCreateMapping } from "../../utils/mapping/placeMapping";
import {
  ValidatePlaceForm,
  ValidatePlaceField,
} from "../../utils/validate/ValidatePlaceForm";
import { createPlaceApi } from "../../services/apiModel/PlaceApi";
import ErrorAlert from "../helpers/alerts/ErrorAlert";
import Success from "../helpers/alerts/SuccessAlert";
import Loading from "../helpers/loading/Loading";
import { useNavigate } from "react-router-dom";

const CreatePlace = () => {
  const [fields, setFields] = useState([]);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    const fetchFields = async () => {
      const placeMapping = await placeCreateMapping();
      setFields(placeMapping.fields);
    };

    fetchFields();
  }, []);

  const handleFieldChange = (e) => {
    const { name, value, type, options } = e.target;

    let newValue;
    if (type === "select-multiple") {
      const selectedOptions = Array.from(options)
        .filter((option) => option.selected)
        .map((option) => ({ idActivity: parseInt(option.value) }));
      newValue = selectedOptions.length > 0 ? selectedOptions : null;
    } else {
      newValue = value !== "" ? value : null;
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

  const handleCreate = async (data) => {
    setLoading(true);

    // Validar todo el formulario
    const errors = ValidatePlaceForm(data);
    setErrors(errors);

    if (Object.keys(errors).some((key) => errors[key])) {
      setLoading(false);
      return;
    }

    try {
      const response = await createPlaceApi(data);
      if (response.status === 200) {
        setAlertMessage("Lugar creado con éxito");
        setShowSuccessAlert(true);
      } else {
        setAlertMessage("Error al crear lugar");
        setShowErrorAlert(true);
      }
    } catch (error) {
      setErrors({ general: "Error al crear lugar" });
      setAlertMessage("Error al crear lugar");
      setShowErrorAlert(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header2 />
      {showErrorAlert && <ErrorAlert message={alertMessage} />}
      {showSuccessAlert && (
        <Success message={alertMessage} redirect={navigate("/places")} />
      )}
      {loading ? (
        <Loading />
      ) : (
        <Create
          title={"Lugares"}
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

export default CreatePlace;
