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
import { useAuth } from "../../context/AuthContext";
import ErrorAlert from "../helpers/alerts/ErrorAlert";

const EditActivity = () => {
  const { index } = useParams();
  const [fields, setFields] = useState([]);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [notFound, setNotFound] = useState(false);
  const { loading, setLoading } = useAuth();
  const navigate = useNavigate();
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    const fetchFields = async () => {
      const activityMapping = await ActivityEditMapping(index);
      if (activityMapping.error) {
        setNotFound(true);
        return;
      }
      setFields(activityMapping.fields);

      // Init the form with the default values
      const initialData = activityMapping.fields.reduce((acc, field) => {
        acc[field.name] = field.defaultValue || "";
        return acc;
      }, {});
      setFormData(initialData);
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
    setLoading(false);
    setErrors(errors);
    if (Object.keys(errors).length > 0) {
      return;
    }
    try {
      const response = await updateActivityApi(index, data);
      if (response.status === 200) {
        console.log("Activity updated successfully");
        navigate("/activities");
      } else {
        setAlertMessage("Error updating Activity");
        setShowErrorAlert(true);
      }
    } catch (error) {
      console.error("Error updating Activity:", error);
      setErrors({ general: "Error updating Activity" });
      setAlertMessage("Error updating Activity");
      setShowErrorAlert(true);
    }
  };

  if (notFound) {
    navigate("/*");
  }

  return (
    <>
      <Header2 />
      {loading && <Loading />}
      {showErrorAlert && <ErrorAlert message={alertMessage} />}
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
    </>
  );
};

export default EditActivity;
