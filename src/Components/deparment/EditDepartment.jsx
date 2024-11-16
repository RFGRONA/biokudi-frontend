import React, { useState, useEffect } from "react";
import Edit from "../CRUD_Layout/Edit";
import Header2 from "../header/Header2";
import Footer from "../footer/Footer";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../helpers/loading/Loading";
import ErrorAlert from "../helpers/alerts/ErrorAlert";
import Success from "../helpers/alerts/SuccessAlert";
import { departmentEditMapping } from "../../utils/mapping/departmentMapping";
import { updateDepartmentApi } from "../../services/apiModel/DepartmentApi";
import {
  ValidateDepartmentField,
  ValidateDepartmentForm,
} from "../../utils/validate/ValidateDepartmentForm";

const EditDepartment = () => {
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
      const departmentMapping = await departmentEditMapping(index);
      if (departmentMapping.error) {
        setNotFound(true);
        return;
      }
      setFields(departmentMapping.fields);

      // Init the form with the default values
      const initialData = departmentMapping.fields.reduce((acc, field) => {
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
    const fieldErrors = ValidateDepartmentField(name, value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      ...fieldErrors,
    }));
  };

  const handleEdit = async (data) => {
    setLoading(true);
    const errors = await ValidateDepartmentForm(data);
    setLoading(false);
    setErrors(errors);

    if (Object.keys(errors).some((key) => errors[key])) {
      setLoading(false);
      return;
    }
    try {
      const response = await updateDepartmentApi(index, data);
      console.log(response);
      if (response.status === 200) {
        setAlertMessage("Departamento actualizado correctamente");
        setShowSuccessAlert(true);
      } else {
        setAlertMessage("Error updating department");
        setShowErrorAlert(true);
      }
    } catch (error) {
      console.error("Error updating department:", error);
      setErrors({ general: "Error updating department" });
      setAlertMessage("Error updating department");
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
        <Success
          message={alertMessage}
          onClose={() => navigate("/Departments")}
        />
      )}
      {loading && <Loading />}
      {showErrorAlert && (
        <ErrorAlert
          message={alertMessage}
          onClose={() => navigate("/Departments")}
        />
      )}
      {showErrorAlert && <ErrorAlert message={alertMessage} />}
      <div className="mainContainer">
        <Edit
          title={"Departamentos"}
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

export default EditDepartment;
