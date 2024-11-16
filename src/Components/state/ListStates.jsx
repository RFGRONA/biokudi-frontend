import React from "react";
import Header from "../header/Header2.jsx";
import Footer from "../footer/Footer.jsx";
import Read from "../CRUD_Layout/Read.jsx";
import { getStatesApi } from "../../services/apiModel/StateApi.js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ListStates = () => {
  const [states, setStates] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchFields = async () => {
      const listStates = await getStatesApi();
      if (Array.isArray(listStates)) {
        const transformedStates = listStates.map((state) => [
          state.idState,
          state.nameState,
          state.tableRelation,
        ]);

        setStates(transformedStates);
      } else {
        setStates({ error: true, message: "Error obteniendo estados" });
      }
    };

    fetchFields();
  }, []);

  const subtitle = ["Id", "Nombre", "Tabla"];
  const handleEdit = (index) => {
    navigate(`/EditState/${index}`);
  };
  const handleCreate = () => {
    navigate("/CreateState");
  };

  return (
    <>
      <Header />
      <div className="mainContainer">
        <Read
          title={"Estados"}
          subtitle={subtitle}
          data={states}
          onEdit={handleEdit}
          onCreate={handleCreate}
        />
      </div>
      <Footer />
    </>
  );
};

export default ListStates;
