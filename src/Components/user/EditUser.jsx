import React, { useState, useEffect } from "react";
import Edit from "../CRUD_Layout/Edit";
import Header2 from "../header/Header2";
import Footer from "../footer/Footer";
import { userEditMapping } from "../../utils/mapping/userMapping";
import {
  ValidateUserForm,
  ValidateUserField,
} from "../../utils/validate/ValidateUserForm";
import { useNavigate, useParams } from "react-router-dom";
import { updateUserApi } from "../../services/apiModel/UserApi";
import Loading from "../helpers/loading/Loading";
import { useAuth } from "../../context/AuthContext";
import ErrorAlert from "../helpers/alerts/ErrorAlert";

const EditUser = () => {
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
      const userMapping = await userEditMapping(index);
      if (userMapping.error) {
        setNotFound(true);
        return;
      }
      setFields(userMapping.fields);

      // Init the form with the default values
      const initialData = userMapping.fields.reduce((acc, field) => {
        acc[field.name] = field.defaultValue || "";
        return acc;
      }, {});
      setFormData(initialData);
    };

    fetchFields();
  }, [index]);

  const handleFieldChange = (e) => {
    const { name, value } = e.target;

    // Update formData
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

    // Validate specific field
    const fieldErrors = ValidateUserField(name, value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      ...fieldErrors,
    }));
  };

  const handleEdit = async (data) => {
    setLoading(true);
    const errors = ValidateUserForm(data);
    setErrors(errors);
    if (Object.keys(errors).some((key) => errors[key])) {
      setLoading(false);
      return;
    }
    try {
      const response = await updateUserApi(index, data);
      if (response.status === 200) {
        navigate("/users");
      } else {
        setAlertMessage("Error al actualizar el usuario");
        setShowErrorAlert(true);
      }
    } catch (error) {
      console.error("Error al actualizar el usuario:", error);
      setErrors({ general: "Error al actualizar el usuario" });
      setAlertMessage("Error al actualizar el usuario");
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
      {loading && <Loading />}
      {showErrorAlert && <ErrorAlert message={alertMessage} />}
      <div className="mainContainer">
        <Edit
          title={"Usuario"}
          fields={fields}
          formData={formData}
          errors={errors}
          onFieldChange={handleFieldChange}
          onSubmit={handleEdit}
        />
        <Footer />
      </div>
    </>
  );
};

export default EditUser;
