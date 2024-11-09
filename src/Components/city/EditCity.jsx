import React, { useState, useEffect } from "react";
import Edit from "../CRUD_Layout/Edit";
import Header2 from "../header/Header2";
import Footer from "../footer/Footer";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../helpers/loading/Loading";
import ErrorAlert from "../helpers/alerts/ErrorAlert";
import Success from "../helpers/alerts/SuccessAlert";
import { cityEditMapping } from "../../utils/mapping/cityMapping";
import {
  ValidateCityForm,
  ValidateCityField,
} from "../../utils/validate/ValidateCityForm";
import { updateCityApi } from "../../services/apiModel/CityApi";

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
      const cityMapping = await cityEditMapping(index);
      if (cityMapping.error) {
        setNotFound(true);
        return;
      }
      setFields(cityMapping.fields);

      // Init the form with the default values
      const initialData = cityMapping.fields.reduce((acc, field) => {
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
    const fieldErrors = ValidateCityField(name, value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      ...fieldErrors,
    }));
  };

  const handleEdit = async (data) => {
    setLoading(true);
    const errors = await ValidateCityForm(data);
    setLoading(false);
    setErrors(errors);

    if (Object.keys(errors).some((key) => errors[key])) {
      setLoading(false);
      return;
    }
    try {
      const response = await updateCityApi(index, data);
      console.log(response);
      if (response.status === 200) {
        setAlertMessage("Ciudad actualizada correctamente");
        setShowSuccessAlert(true);
      } else {
        setAlertMessage("Error updating city");
        setShowErrorAlert(true);
      }
    } catch (error) {
      console.error("Error updating city:", error);
      setErrors({ general: "Error updating city" });
      setAlertMessage("Error updating city");
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
        <Success message={alertMessage} onClose={() => navigate("/Cities")} />
      )}
      {loading && <Loading />}
      {showErrorAlert && (
        <ErrorAlert
          message={alertMessage}
          onClose={() => navigate("/Cities")}
        />
      )}
      {showErrorAlert && <ErrorAlert message={alertMessage} />}
      <div className="mainContainer">
        <Edit
          title={"Ciudades"}
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

export default EditPlace;
