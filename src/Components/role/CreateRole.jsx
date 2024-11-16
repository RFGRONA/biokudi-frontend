import React, { useState, useEffect } from "react";
import Create from "../CRUD_Layout/Create";
import Header2 from "../header/Header2";
import Footer from "../footer/Footer";
import {
  ValidateRoleForm,
  ValidateRoleField,
} from "../../utils/validate/ValidateRoleForm";
import { useNavigate } from "react-router-dom";
import ErrorAlert from "../helpers/alerts/ErrorAlert";
import Success from "../helpers/alerts/SuccessAlert";
import { createRoleApi } from "../../services/apiModel/RoleApi";
import { RoleCreateMapping } from "../../utils/mapping/roleMapping";
import Loading from "../helpers/loading/Loading";

const CreateRole = () => {
  const [fields, setFields] = useState([]);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    const fetchFields = async () => {
      const roleMapping = await RoleCreateMapping();
      setFields(roleMapping.fields);
    };

    fetchFields();
  }, []);

  const handleFieldChange = (e) => {
    const { name, value } = e.target;

    // Update formData
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

    // Validate specific field
    const fieldErrors = ValidateRoleField(name, value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      ...fieldErrors,
    }));
  };

  const handleCreate = async (data) => {
    setLoading(true);

    // Validate all fields
    const errors = ValidateRoleForm(data);
    setErrors(errors);

    if (Object.keys(errors).some((key) => errors[key])) {
      setLoading(false);
      return;
    }

    try {
      const response = await createRoleApi(data);
      if (response.status === 200) {
        setAlertMessage("Rol creado correctamente");
        setShowSuccess(true);
      } else {
        setAlertMessage("Error al crear rol");
        setShowErrorAlert(true);
      }
    } catch (error) {
      setErrors({ general: "Error al crear rol" });
      setAlertMessage("Error al crear rol");
      setShowErrorAlert(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header2 />
      {showSuccess && (
        <Success message={alertMessage} onClose={() => navigate("/roles")} />
      )}
      {showErrorAlert && <ErrorAlert message={alertMessage} redirect={""} />}
      {loading ? (
        <Loading />
      ) : (
        <Create
          title={"Roles"}
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

export default CreateRole;
