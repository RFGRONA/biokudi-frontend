import React from "react";
import Create from "../CRUD_Layout/Create";
import Header2 from "../header/Header2";
import Footer from "../footer/Footer";

const CreatePlace = () => {
  //TODO: Llamado a la api
  const handleCreate = (data) => {
    console.log("Datos del formulario:", data);
    // Lógica para enviar los datos al backend
  };

  //Ejemplo de campos
  const fields = [
    { name: "nombre", label: "Nombre", type: "textarea" },
    {
      name: "estado",
      label: "Estado",
      type: "select",
      options: [
        { value: true, label: "Activo" },
        { value: false, label: "Inactivo" },
      ],
    },
    { name: "descripcion", label: "Descripción", type: "textarea" },
  ];
  return (
    <>
      <Header2 />
      <Create title={"Lugares"} fields={fields} onSubmit={handleCreate} />
      <Footer />
    </>
  );
};

export default CreatePlace;
