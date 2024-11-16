import React, { useState, useEffect } from "react";
import Edit from "../CRUD_Layout/Edit";
import Header2 from "../header/Header2";
import Footer from "../footer/Footer";
import { RoleEditMapping } from "../../utils/mapping/roleMapping";
import {
  ValidateRoleForm,
  ValidateRoleField,
} from "../../utils/validate/ValidateRoleForm";
import { useNavigate, useParams } from "react-router-dom";
import { updateRoleApi } from "../../services/apiModel/RoleApi";
import Loading from "../helpers/loading/Loading";
import { useAuth } from "../../context/AuthContext";
import ErrorAlert from "../helpers/alerts/ErrorAlert";
import Success from "../helpers/alerts/SuccessAlert";

const EditRole = () => {
  const { index } = useParams();
  const [fields, setFields] = useState([]);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    const fetchFields = async () => {
      const roleMapping = await RoleEditMapping(index);
      if (roleMapping.error) {
        setNotFound(true);
        return;
      }
      setFields(roleMapping.fields);

      // Inicializar formData con los valores predeterminados de los campos
      const initialData = roleMapping.fields.reduce((acc, field) => {
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
    const fieldErrors = ValidateRoleField(name, value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      ...fieldErrors,
    }));
  };

  const handleEdit = async (data) => {
    setLoading(true);

    // Validate all fields
    const errors = ValidateRoleForm(data);
    setErrors(errors);

    if (Object.keys(errors).some((key) => errors[key])) {
      setLoading(false);
      return;
    }
    try {
      const response = await updateRoleApi(index, data);
      if (response.status === 200) {
        console.log("Role updated successfully");
        setAlertMessage("Rol actualizado correctamente");
        setShowSuccess(true);
      } else {
        setAlertMessage("Error al actualizar el rol");
        setShowErrorAlert(true);
      }
    } catch (error) {
      console.error("Error al actualizar el rol:", error);
      setErrors({ general: "Error al actualizar el rol" });
      setAlertMessage("Error al actualizar el rol");
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
      {showErrorAlert && <ErrorAlert message={alertMessage} />}
      <div className="mainContainer">
        {loading ? (
          <Loading />
        ) : (
          <Edit
            title={"Roles"}
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

export default EditRole;
