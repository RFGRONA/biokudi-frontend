import React from "react";
import Header from "../header/Header2";
import Footer from "../footer/Footer";
import Read from "../CRUD_Layout/Read";
import { getPlacesApi } from "../../services/places/GetPlaces";

const ListPlaces = () => {
  const getPlaces = async () => {
    return await getPlacesApi();
  };

  const subtitle = [
    "Id",
    "Nombre",
    "Latitud",
    "Longitud",
    "Descripción",
    "Link",
    "Ciudad",
  ];

  const temporalPlaces = [
    ["Id1", "Nombre", "Latitud", "Longitud", "Descripción", "Link", "Ciudad"],
    ["Id2", "Nombre", "Latitud", "Longitud", "Descripción", "Link", "Ciudad"],
    ["Id2", "Nombre", "Latitud", "Longitud", "Descripción", "Link", "Ciudad"],
    ["Id2", "Nombre", "Latitud", "Longitud", "Descripción", "Link", "Ciudad"],
    ["Id2", "Nombre", "Latitud", "Longitud", "Descripción", "Link", "Ciudad"],
    ["Id2", "Nombre", "Latitud", "Longitud", "Descripción", "Link", "Ciudad"],
  ];
  return (
    <>
      <Header />
      <Read title={"Lugares"} subtitle={subtitle} data={temporalPlaces} />
      <Footer />
    </>
  );
};

export default ListPlaces;
