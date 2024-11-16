import React from "react";
import Header from "../header/Header2.jsx";
import Footer from "../footer/Footer.jsx";
import Read from "../CRUD_Layout/Read.jsx";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getRolesApi } from "../../services/apiModel/RoleApi.js";

const ListRoles = () => {
  const [roles, setRoles] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchFields = async () => {
      const listRoles = await getRolesApi();
      if (Array.isArray(listRoles)) {
        const transformedRoles = listRoles.map((role) => [
          role.idRole,
          role.nameRole,
        ]);

        setRoles(transformedRoles);
      } else {
        setRoles({ error: true, message: "Error obteniendo roles" });
      }
    };

    fetchFields();
  }, []);

  const subtitle = ["Id", "Nombre"];
  const handleEdit = (index) => {
    navigate(`/EditRole/${index}`);
  };
  const handleCreate = () => {
    navigate("/CreateRole");
  };

  return (
    <>
      <Header />
      <div className="mainContainer">
        <Read
          title={"Roles"}
          subtitle={subtitle}
          data={roles}
          onEdit={handleEdit}
          onCreate={handleCreate}
        />
      </div>
      <Footer />
    </>
  );
};

export default ListRoles;
