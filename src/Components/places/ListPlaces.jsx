import React from "react";
import Header from "../header/Header2";
import Footer from "../footer/Footer";
import Read from "../CRUD_Layout/Read";
import { getPlaceApi } from "../../services/apiModel/PlaceApi";
import { useEffect, useState } from "react";

const ListPlaces = () => {
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    const fetchFields = async () => {
      const listPlaces = await getPlaceApi();
      const transformedPlaces = listPlaces.map((place) => [
        place.idPlace,
        place.namePlace,
        place.link,
        place.cityName,
      ]);

      setPlaces(transformedPlaces);
    };

    fetchFields();
  }, []);

  const subtitle = ["Id", "Nombre", "Link", "Ciudad"];

  return (
    <>
      <Header />
      <Read title={"Lugares"} subtitle={subtitle} data={places} />
      <Footer />
    </>
  );
};

export default ListPlaces;
