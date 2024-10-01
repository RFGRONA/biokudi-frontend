import React from "react";
import Header from "../header/Header2";
import Footer from "../footer/Footer";
import Read from "../CRUD_Layout/Read";
import { getActivitiesApi } from "../../services/apiModel/ActivityApi.js";
import { useEffect, useState } from "react";

const ListActivities = () => {
  const [activities, setActivities] = useState([]);
  useEffect(() => {
    const fetchFields = async () => {
      const listActivities = await getActivitiesApi();
      if (Array.isArray(listActivities)) {
        const transformedActivities = listActivities.map((place) => [
          place.idActivity,
          place.nameActivity,
          place.urlIcon,
        ]);

        setActivities(transformedActivities);
      } else {
        setActivities({ error: true, message: "Error obteniendo actividades" });
      }
    };

    fetchFields();
  }, []);

  const subtitle = ["Id", "Nombre", "UrlIcon"];

  return (
    <>
      <Header />
      <div className="mainContainer">
        <Read title={"Actividades"} subtitle={subtitle} data={activities} />
      </div>
      <Footer />
    </>
  );
};

export default ListActivities;
