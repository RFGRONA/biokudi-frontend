import React from "react";
import Create from "../CRUD_Layout/Create";
import Header2 from "../header/Header2";
import Footer from "../footer/Footer";
import { placeCreateMapping } from "../../utils/mapping/placeMapping";
import { ValidatePlaceForm } from "../../utils/validate/ValidatePlaceForm";
import { useState } from "react";
import { useEffect } from "react";

const CreatePlace = () => {
  const [fields, setFields] = useState([]);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchFields = async () => {
      const placeMapping = await placeCreateMapping();
      setFields(placeMapping.fields);
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
    /*TODO: Send data to api */
    console.log("Data", data);
  };

  return (
    <>
      <Header2 />
      <Create
        title={"Lugares"}
        fields={fields}
        onSubmit={handleCreate}
        errors={errors}
      />
      <Footer />
    </>
  );
};

export default CreatePlace;
