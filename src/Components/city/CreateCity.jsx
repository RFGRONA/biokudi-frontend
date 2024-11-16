import React from "react";
import Create from "../CRUD_Layout/Create";
import Header2 from "../header/Header2";
import Footer from "../footer/Footer";
import { useState } from "react";
import { useEffect } from "react";
import SuccessAlert from "../helpers/alerts/SuccessAlert";
import { useNavigate } from "react-router-dom";
import ErrorAlert from "../helpers/alerts/ErrorAlert";
import Loading from "../helpers/loading/Loading";
import { CityCreateMapping } from "../../utils/mapping/cityMapping";
import {
  ValidateCityField,
  ValidateCityForm,
} from "../../utils/validate/ValidateCityForm";
import { createCityApi } from "../../services/apiModel/CityApi";

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
      const cityMapping = await CityCreateMapping();
      setFields(cityMapping.fields);
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

    const fieldErrors = ValidateCityField(name, value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      ...fieldErrors,
    }));
  };

  /*Errors handle */
  const handleCreate = async (data) => {
    setLoading(true);

    // Validar todo el formulario
    const errors = ValidateCityForm(data);
    setErrors(errors);

    if (Object.keys(errors).some((key) => errors[key])) {
      setLoading(false);
      return;
    }

    try {
      const response = await createCityApi(data);
      if (response.status === 200) {
        console.log("Ciudad creada con éxito");
        setAlertMessage("Ciudad creada con éxito");
        setShowSuccessAlert(true);
      } else {
        console.log("Error al crear ciudad");
        setAlertMessage("Error al crear ciudad");
        setShowErrorAlert(true);
      }
    } catch (error) {
      setErrors({ general: "Error al crear ciudad" });
      setAlertMessage("Error al crear ciudad");
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
          onClose={() => (setShowSuccessAlert(false), navigate("/cities"))}
        />
      )}
      {showErrorAlert && (
        <ErrorAlert
          message={alertMessage}
          onClose={() => setShowErrorAlert(false)}
        />
      )}
      <Create
        title={"Ciudades"}
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
