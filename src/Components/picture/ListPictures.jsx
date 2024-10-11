import React from "react";
import Header from "../header/Header2";
import Footer from "../footer/Footer";
import Read from "../CRUD_Layout/Read";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ErrorAlert from "../helpers/alerts/ErrorAlert";
import { getPictureApi } from "../../services/apiModel/pictureApi";

const ListPictures = () => {
  const [pictures, setPictures] = useState([]);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    const fetchFields = async () => {
      const listPictures = await getPictureApi();
      if (Array.isArray(listPictures)) {
        const transformedPictures = listPictures.map((picture) => [
          picture.idPicture,
          picture.name,
          picture.typeName,
          picture.url,
        ]);

        setPictures(transformedPictures);
      } else {
        setPictures({ error: true, message: "Error obteniendo imagenes" });
      }
    };

    fetchFields();
  }, []);

  const subtitle = ["Id", "Nombre", "Tipo", "Url"];

  return (
    <>
      <Header />
      <div className="mainContainer">
        {showErrorAlert && <ErrorAlert message={alertMessage} />}
        <Read title={"Imagenes"} subtitle={subtitle} data={pictures} />
      </div>
      <Footer />
    </>
  );
};

export default ListPictures;
