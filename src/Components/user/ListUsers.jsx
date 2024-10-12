import React from "react";
import Header from "../header/Header2";
import Footer from "../footer/Footer";
import Read from "../CRUD_Layout/Read";
import { getUsersApi } from "../../services/apiModel/UserApi";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ErrorAlert from "../helpers/alerts/ErrorAlert";

const ListUsers = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  /*Api Call */
  useEffect(() => {
    const fetchFields = async () => {
      const listUsers = await getUsersApi();
      if (Array.isArray(listUsers)) {
        const transformedUsers = listUsers.map((user) => [
          user.idUser,
          user.userName,
          user.email,
          user.roleName,
          user.stateName,
        ]);

        setUsers(transformedUsers);
      } else {
        setUsers({ error: true, message: "Error obteniendo usuarios" });
      }
    };

    fetchFields();
  }, []);
  const subtitle = ["Id", "Nombre", "Correo", "Rol", "Estado"];

  return (
    <>
      <Header />
      <div className="mainContainer">
        {showErrorAlert && <ErrorAlert message={alertMessage} />}
        <Read title={"Usuarios"} subtitle={subtitle} data={users} />
      </div>
      <Footer />
    </>
  );
};

export default ListUsers;
