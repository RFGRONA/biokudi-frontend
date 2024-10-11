import React from "react";
import Create from "../CRUD_Layout/Create";
import Header2 from "../header/Header2";
import Footer from "../footer/Footer";
import { ValidateStateForm } from "../../utils/validate/ValidateStateForm";
import { useState } from "react";
import { useEffect } from "react";
import SuccessAlert from "../helpers/alerts/SuccessAlert";
import { useNavigate } from "react-router-dom";
import ErrorAlert from "../helpers/alerts/ErrorAlert";
import { createStateApi } from "../../services/apiModel/StateApi";
import { StateCreateMapping } from "../../utils/mapping/stateMapping";

const CreateState = () => {
  const [fields, setFields] = useState([]);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    const fetchFields = async () => {
      const stateMapping = await StateCreateMapping();
      setFields(stateMapping.fields);
    };

    fetchFields();
  }, []);

  /*Errors handle */
  const handleCreate = async (data) => {
    const errors = await ValidateStateForm(data);
    setErrors(errors);
    if (Object.keys(errors).length > 0) {
      return;
    }
    try {
      const response = await createStateApi(data);
      if (response.status === 200) {
        {
          /*TODO: Sucessfull screen */
        }

        navigate("/States");
      } else {
        setAlertMessage("Error al crear estado");
        setShowErrorAlert(true);
      }
    } catch (error) {
      setErrors({ general: "Error al crear estado" });
      setAlertMessage("Error al crear estado");
      setShowErrorAlert(true);
    }
  };

  return (
    <>
      <Header2 />
      {showErrorAlert && <ErrorAlert message={alertMessage} />}
      <Create
        title={"Estados"}
        fields={fields}
        onSubmit={handleCreate}
        errors={errors}
      />
      <Footer />
    </>
  );
};

export default CreateState;
