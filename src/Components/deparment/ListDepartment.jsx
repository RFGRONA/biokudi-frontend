import React from "react";
import Header from "../header/Header2.jsx";
import Footer from "../footer/Footer.jsx";
import Read from "../CRUD_Layout/Read.jsx";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDepartmentsApi } from "../../services/apiModel/DepartmentApi.js";

const ListDepartment = () => {
  const [departments, setDepartments] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchFields = async () => {
      const listDepartments = await getDepartmentsApi();
      if (Array.isArray(listDepartments)) {
        const transformedStates = listDepartments.map((department) => [
          department.idDepartment,
          department.nameDepartment,
        ]);

        setDepartments(transformedStates);
      } else {
        setDepartments({ error: true, message: "Error obteniendo ciudades" });
      }
    };

    fetchFields();
  }, []);

  const subtitle = ["Id", "Nombre"];
  const handleEdit = (index) => {
    navigate(`/EditDepartment/${index}`);
  };
  const handleCreate = () => {
    navigate("/CreateDepartment");
  };

  return (
    <>
      <Header />
      <div className="mainContainer">
        <Read
          title={"Departamentos"}
          subtitle={subtitle}
          data={departments}
          onEdit={handleEdit}
          onCreate={handleCreate}
        />
      </div>
      <Footer />
    </>
  );
};

export default ListDepartment;
