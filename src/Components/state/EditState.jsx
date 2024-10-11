import React, { useState, useEffect } from "react";
import Edit from "../CRUD_Layout/Edit";
import Header2 from "../header/Header2";
import Footer from "../footer/Footer";
import { placeEditMapping } from "../../utils/mapping/placeMapping";
import { ValidatePlaceForm } from "../../utils/validate/ValidatePlaceForm";
import { useNavigate, useParams } from "react-router-dom";
import { updatePlaceApi } from "../../services/apiModel/PlaceApi";
import Loading from "../helpers/loading/Loading";
import { useAuth } from "../../context/AuthContext";
import ErrorAlert from "../helpers/alerts/ErrorAlert";
import { stateEditMapping } from "../../utils/mapping/stateMapping";
import { ValidateStateForm } from "../../utils/validate/ValidateStateForm";
import { updateStateApi } from "../../services/apiModel/StateApi";

const EditPlace = () => {
  const { index } = useParams();
  const [fields, setFields] = useState([]);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({});
  const [notFound, setNotFound] = useState(false);
  const { loading, setLoading } = useAuth();
  const navigate = useNavigate();
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    const fetchFields = async () => {
      const stateMapping = await stateEditMapping(index);
      if (stateMapping.error) {
        setNotFound(true);
        return;
      }
      setFields(stateMapping.fields);

      // Init the form with the default values
      const initialData = stateMapping.fields.reduce((acc, field) => {
        acc[field.name] = field.defaultValue;
        return acc;
      }, {});
      setFormData(initialData);
    };

    fetchFields();
  }, [index]);

  const handleEdit = async (data) => {
    setLoading(true);
    const errors = await ValidateStateForm(data);
    setLoading(false);
    setErrors(errors);
    if (Object.keys(errors).length > 0) {
      return;
    }
    try {
      const response = await updateStateApi(index, data);
      if (response.status === 200) {
        console.log("Place updated successfully");
        navigate("/states");
      } else {
        setAlertMessage("Error updating state");
        setShowErrorAlert(true);
      }
    } catch (error) {
      console.error("Error updating state:", error);
      setErrors({ general: "Error updating state" });
      setAlertMessage("Error updating state");
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
          title={"Estados"}
          fields={fields}
          onSubmit={handleEdit}
          errors={errors}
          initialFormData={formData}
        />
        <Footer />
      </div>
    </>
  );
};

export default EditPlace;
