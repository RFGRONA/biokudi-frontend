import React from "react";
import Edit from "../CRUD_Layout/Edit";
import Header2 from "../header/Header2";
import Footer from "../footer/Footer";
import { placeEditMapping } from "../../utils/mapping/placeMapping";
import { ValidatePlaceForm } from "../../utils/validate/ValidatePlaceForm";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { updatePlaceApi } from "../../services/apiModel/PlaceApi";
import Loading from "../helpers/loading/Loading";
import { useAuth } from "../../context/AuthContext";

const EditPlace = () => {
  const { index } = useParams();
  const [fields, setFields] = useState([]);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({});
  const [notFound, setNotFound] = useState(false);
  const { loading, setLoading } = useAuth();

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
      console.log(initialData);
      setFormData(initialData);
    };

    fetchFields();
  }, []);

  /*Errors handle */
  const handleEdit = async (data) => {
    setLoading(true);
    const errors = ValidatePlaceForm(data);
    setLoading(false);
    setErrors(errors);
    if (Object.keys(errors).length > 0) {
      console.log(errors);
      return;
    }
    /*TODO: Send data to API */
    const response = await updatePlaceApi(index, data);
    console.log(response);
  };

  if (notFound) {
    return <h1>Place not found</h1>;
  }
  return (
    <>
      <Header2 />
      <div className="mainContainer">
        <Edit
          title={"Lugares"}
          fields={fields}
          onSubmit={handleEdit}
          errors={errors}
          initialFormData={formData} // Pasamos el formData inicial
        />
        <Footer />
      </div>
    </>
  );
};

export default EditPlace;
