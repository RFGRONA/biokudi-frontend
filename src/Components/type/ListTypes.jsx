import React from "react";
import Header from "../header/Header2.jsx";
import Footer from "../footer/Footer.jsx";
import Read from "../CRUD_Layout/Read.jsx";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getTypesApi } from "../../services/apiModel/TypeApi.js";

const ListTypes = () => {
  const [types, setTypes] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchFields = async () => {
      const listTypes = await getTypesApi();
      if (Array.isArray(listTypes)) {
        const transformedStates = listTypes.map((type) => [
          type.idType,
          type.nameType,
          type.tableRelation,
        ]);

        setTypes(transformedStates);
      } else {
        setTypes({ error: true, message: "Error obteniendo tipos" });
      }
    };

    fetchFields();
  }, []);

  const subtitle = ["Id", "Nombre", "Tabla"];
  const handleEdit = (index) => {
    navigate(`/EditType/${index}`);
  };
  const handleCreate = () => {
    navigate("/CreateType");
  };

  return (
    <>
      <Header />
      <div className="mainContainer">
        <Read
          title={"Tipos"}
          subtitle={subtitle}
          data={types}
          onEdit={handleEdit}
          onCreate={handleCreate}
        />
      </div>
      <Footer />
    </>
  );
};

export default ListTypes;
