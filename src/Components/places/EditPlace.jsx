import React from "react";
import Edit from "../CRUD_Layout/Edit";
import Header2 from "../header/Header2";
import Footer from "../footer/Footer";
import { placeEditMapping } from "../../utils/mapping/placeMapping";
import { ValidatePlaceForm } from "../../utils/validate/ValidatePlaceForm";
import { useState } from "react";
import { useEffect } from "react";

const EditPlace = (index) => {
  const [fields, setFields] = useState([]);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({});
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const fetchFields = async () => {
      const placeMapping = await placeEditMapping(1);
      if (placeMapping.error) {
        setNotFound(true);
        return;
      }
      setFields(placeMapping.fields); // save data in fields

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
  const handleCreate = (data) => {
    const errors = ValidatePlaceForm(data);
    setErrors(errors);
    if (Object.keys(errors).length > 0) {
      return;
    }
    /*TODO: Send data to API */
    console.log("Data", data);
  };

  if (notFound) {
    return <h1>Place not found</h1>; //TODO: LUGAR NO ENCONTRADO
  }
  return (
    <>
      <Header2 />
      <div className="mainContainer">
        <Edit
          title={"Lugares"}
          fields={fields}
          onSubmit={handleCreate}
          errors={errors}
          initialFormData={formData} // Pasamos el formData inicial
        />
        <Footer />
      </div>
    </>
  );
};

export default EditPlace;
