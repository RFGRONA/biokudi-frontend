import React, { useEffect, useState } from "react";
import ReportLayout from "../reportLayout/ReportLayout";
import {
  getPlaceReport,
  sendReportByEmail,
} from "../../services/apiModel/ReportApi";
import Header from "../header/Header2";
import Footer from "../footer/Footer";
import Loading from "../helpers/loading/Loading";

const ReportPlace = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInformation = async () => {
      try {
        const response = await getPlaceReport();
        if (response.error) {
          console.log("Error obteniendo reporte", response.error);
          setError(response.error);
        } else {
          setData(response);
        }
      } catch (err) {
        console.log("Error en la solicitud:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchInformation();
  }, []);

  const sendEmail = async (email, fileBase64) => {
    console.log(email, fileBase64);
    try {
      const response = await sendReportByEmail(email, "PLACE", fileBase64);
      console.log("Respuesta de envío de correo:", response);
      if (response.status === 200) {
        console.log("Correo enviado correctamente");
      } else {
        throw new Error("Error al enviar el correo");
      }
    } catch (err) {
      console.error("Error enviando el correo:", err);
      throw new Error("Error al enviar el correo");
    }
  };

  return (
    <>
      <Header />
      <div className="mainContainer">
        {loading ? (
          <Loading />
        ) : error ? (
          <p>Error al cargar los datos: {error.message}</p>
        ) : (
          <ReportLayout
            title="Reporte de lugares"
            data={data}
            sendEmail={sendEmail}
          />
        )}
      </div>
      <Footer />
    </>
  );
};

export default ReportPlace;