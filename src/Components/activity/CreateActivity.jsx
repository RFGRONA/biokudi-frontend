import React from "react";
import Create from "../CRUD_Layout/Create";
import Header2 from "../header/Header2";
import Footer from "../footer/Footer";
import { ValidateActivityForm } from "../../utils/validate/ValidateActivityForm";
import { useState } from "react";
import { useEffect } from "react";
import SuccessAlert from "../helpers/alerts/SuccessAlert";
import { useNavigate } from "react-router-dom";
import ErrorAlert from "../helpers/alerts/ErrorAlert";
import { createActivityApi } from "../../services/apiModel/ActivityApi";
import { ActivityCreateMapping } from "../../utils/mapping/activityMapping";

const CreateActivity = () => {
  const [fields, setFields] = useState([]);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    const fetchFields = async () => {
      const activityMapping = await ActivityCreateMapping();
      setFields(activityMapping.fields);
    };

    fetchFields();
  }, []);

  /*Errors handle */
  const handleCreate = async (data) => {
    const errors = await ValidateActivityForm(data);
    setErrors(errors);
    if (Object.keys(errors).length > 0) {
      return;
    }
    try {
      const response = await createActivityApi(data);
      if (response.status === 200) {
        {
          /*TODO: Sucessfull screen */
        }

        navigate("/activities");
      } else {
        setAlertMessage("Error al crear actividad");
        setShowErrorAlert(true);
      }
    } catch (error) {
      setErrors({ general: "Error al crear actividad" });
      setAlertMessage("Error al crear actividad");
      setShowErrorAlert(true);
    }
  };

  return (
    <>
      <Header2 />
      {showErrorAlert && <ErrorAlert message={alertMessage} redirect={""} />}
      <Create
        title={"Actividades"}
        fields={fields}
        onSubmit={handleCreate}
        errors={errors}
      />
      <Footer />
    </>
  );
};

export default CreateActivity;
