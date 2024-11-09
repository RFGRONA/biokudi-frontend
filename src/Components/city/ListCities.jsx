import React from "react";
import Header from "../header/Header2.jsx";
import Footer from "../footer/Footer.jsx";
import Read from "../CRUD_Layout/Read.jsx";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCitiesApi } from "../../services/apiModel/CityApi.js";

const ListStates = () => {
  const [cities, setCities] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchFields = async () => {
      const listCities = await getCitiesApi();
      if (Array.isArray(listCities)) {
        const transformedStates = listCities.map((city) => [
          city.idCity,
          city.nameCity,
          city.departmentCity,
        ]);

        setCities(transformedStates);
      } else {
        setCities({ error: true, message: "Error obteniendo ciudades" });
      }
    };

    fetchFields();
  }, []);

  const subtitle = ["Id", "Nombre", "Departamento"];
  const handleEdit = (index) => {
    navigate(`/EditCity/${index}`);
  };
  const handleCreate = () => {
    navigate("/CreateCity");
  };

  return (
    <>
      <Header />
      <div className="mainContainer">
        <Read
          title={"Ciudades"}
          subtitle={subtitle}
          data={cities}
          onEdit={handleEdit}
          onCreate={handleCreate}
        />
      </div>
      <Footer />
    </>
  );
};

export default ListStates;
