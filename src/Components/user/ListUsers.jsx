import React from "react";
import Header from "../header/Header2";
import Footer from "../footer/Footer";
import Read from "../CRUD_Layout/Read";
// import { getPlacesApi } from "../../services/places/GetPlaces";

const ListUsers = () => {
  //   const users = async () => {
  //     return await getUsersApi();
  //   };

  const subtitle = ["Id", "Nombre"];

  const temporalUsers = [
    ["Id", "Raul"],
    ["Id", "Raul"],
    ["Id", "Raul"],
    ["Id", "Raul"],
    ["Id", "Raul"],
    ["Id", "Raul"],
    ["Id", "Raul"],
  ];

  return (
    <>
      <Header />
      <Read title={"Usuarios"} subtitle={subtitle} data={temporalUsers} />
      <Footer />
    </>
  );
};

export default ListUsers;
