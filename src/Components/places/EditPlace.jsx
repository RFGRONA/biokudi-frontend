import React from "react";
import Edit from "../CRUD_Layout/Edit";
import Header2 from "../header/Header2";
import Footer from "../footer/Footer";
import { placeEditMapping } from "../../utils/mapping/placeMapping";
import { ValidatePlaceForm } from "../../utils/validate/ValidatePlaceForm";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { updatePlaceApi } from "../../services/apiModel/PlaceApi";
import Loading from "../helpers/loading/Loading";
import { useAuth } from "../../context/AuthContext";
import ErrorAlert from "../helpers/alerts/ErrorAlert";

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
      const placeMapping = await placeEditMapping(index);
      if (placeMapping.error) {
        setNotFound(true);
        return;
      }
      setFields(placeMapping.fields);

      // Init the form with the default values
      const initialData = placeMapping.fields.reduce((acc, field) => {
        acc[field.name] = field.defaultValue || "";
        return acc;
      }, {});
      setFormData(initialData);
    };

    fetchFields();
  }, []);

  /*Errors handle */
  const handleEdit = async (data) => {
    setLoading(true);
    const errors = await ValidatePlaceForm(data);
    setLoading(false);
    setErrors(errors);
    if (Object.keys(errors).length > 0) {
      return;
    }
    try {
      const response = await updatePlaceApi(index, data);
      if (response.status === 200) {
        console.log("Lugar actualizado exitosamente");
        navigate("/places");
      } else {
        setAlertMessage("Error al actualizar lugar");
        setShowErrorAlert(true);
      }
    } catch (error) {
      setErrors({ general: "Error al actualizar lugar" });
      setAlertMessage("Error al actualizar lugar");
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
          title={"Lugares"}
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
