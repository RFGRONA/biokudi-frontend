import React, { useRef, useState } from "react";
import Decision from "../helpers/alerts/DecisionAlert";
import styles from "./ReportLayout.module.css";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Loading from "../helpers/loading/Loading";
import SuccessAlert from "../helpers/alerts/SuccessAlert";
import ErrorAlert from "../helpers/alerts/ErrorAlert";
import html2pdf from "html2pdf.js";
import { useAuth } from "../../context/AuthContext";

const ReportLayout = ({ title, data, sendEmail }) => {
  const { totalRecords, actionCounts, auditRecords, weeklyActivityData } =
    data || {};
  const [desicion, setDesicion] = useState(false);
  const [pdfBase64, setPdfBase64] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const { user } = useAuth();

  /*Ref Use*/
  const reportRef = useRef();

  /*PDF Generator*/
  const generatePDF = () => {
    const input = reportRef.current;
    const opt = {
      margin: [10, 10, 10, 10],
      filename: `${title}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a4", orientation: "landscape" },
    };

    setLoading(true);
    return html2pdf()
      .from(input)
      .set(opt)
      .toPdf()
      .output("datauristring")
      .then((pdfDataUri) => {
        setLoading(false);
        const base64Pdf = pdfDataUri.split(",")[1];
        setPdfBase64(base64Pdf);
        return pdfDataUri;
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error generando el PDF:", error);
        setMessage("Error generando el PDF.");
        setError(true);
        throw error;
      });
  };

  /* Generate PDF in base 64 */
  const generatePdfBase64 = () => {
    return generatePDF()
      .then((pdfDataUri) => {
        if (!pdfDataUri) {
          console.error("No se pudo generar el PDF correctamente.");
          return null;
        }
        const base64Pdf = pdfDataUri.split(",")[1];
        setPdfBase64(base64Pdf);
        return base64Pdf;
      })
      .catch((error) => {
        console.error("Error generando el PDF:", error);
        setMessage("Error generando el PDF.");
        setError(true);
        return null;
      });
  };

  const generatePDFhandler = () => {
    setDesicion(true);
  };

  const confirmDownload = () => {
    setDesicion(false);
    generatePdfBase64().then((base64Pdf) => {
      if (base64Pdf) {
        downloadPdf(base64Pdf);
        setMessage("PDF generado y descargado correctamente.");
        setSuccess(true);
      } else {
        console.error("No se pudo generar el PDF para descargar.");
      }
    });
  };

  const downloadPdf = (base64Pdf) => {
    const linkSource = `data:application/pdf;base64,${base64Pdf}`;
    const downloadLink = document.createElement("a");
    const fileName = `${title}.pdf`;

    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
  };

  const chartData = weeklyActivityData
    ? weeklyActivityData
        .slice()
        .reverse()
        .map((item) => ({
          date: new Date(item.date).toLocaleDateString("es-ES", {
            weekday: "short",
            day: "numeric",
            month: "short",
          }),
          insertCount: item.insertCount,
          updateCount: item.updateCount,
          deleteCount: item.deleteCount,
        }))
    : [];

  const handleSendAttachment = async () => {
    try {
      let base64Pdf = pdfBase64;
      if (!base64Pdf) {
        base64Pdf = await generatePdfBase64();
        if (!base64Pdf) {
          console.error("No se pudo generar el PDF para enviar.");
          return;
        }
      }

      const recipientEmail = user.email;
      setLoading(true);
      await sendEmail(recipientEmail, base64Pdf)
        .then(() => {
          setLoading(false);
          setMessage("Correo enviado correctamente.");
          setSuccess(true);
        })
        .catch((error) => {
          setLoading(false);
          console.error("Error enviando el correo:", error);
          setMessage("Error enviando el correo.");
          setError(true);
        });
    } catch (error) {
      setLoading(false);
      console.error("Error enviando el correo:", error);
      setMessage("Error enviando el correo.");
      setError(true);
    }
  };

  return (
    <div className={styles.main}>
      {desicion && (
        <Decision
          title1="¿Descargar el reporte?"
          message="¿Estas seguro de descargar este reporte?"
          cancelText="Cancelar"
          onConfirm={confirmDownload}
          onCancel={() => setDesicion(false)}
        />
      )}
      {success && (
        <SuccessAlert message={message} onClose={() => setSuccess(false)} />
      )}

      {error && (
        <ErrorAlert message={message} onClose={() => setError(false)} />
      )}

      {loading ? (
        <Loading />
      ) : (
        <>
          <div className={styles.titleContainer}>
            <button
              className={[styles.button, styles.adjunto].join(" ")}
              onClick={handleSendAttachment}
            >
              Enviar Adjunto
            </button>
            <button
              className={[styles.button, styles.download].join(" ")}
              onClick={generatePDFhandler}
            >
              Descargar
            </button>
          </div>
          <div ref={reportRef} className={styles.pdfContent}>
            <div className={styles.mainBody}>
              <div className={styles.bodyTitle}>
                <h2>{title}</h2>
              </div>
              <div className={styles.statsInfo}>
                <div className={styles.stats}>
                  <div className={styles.titleStats}>ESTADÍSTICAS</div>
                  <div className={styles.minStats}>
                    Total de registros:
                    <div className={styles.numberStats}>{totalRecords}</div>
                  </div>
                  {actionCounts &&
                    Object.entries(actionCounts).map(([key, value]) => (
                      <div className={styles.minStats} key={key}>
                        {key}:<div className={styles.numberStats}>{value}</div>
                      </div>
                    ))}
                </div>
                <div className={styles.bodyTitle}>
                  <h2>Comportamiento de ultima semana</h2>
                </div>
                <div className={styles.graph}>
                  {chartData.length > 0 ? (
                    <ResponsiveContainer width={800} height={400}>
                      <LineChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="insertCount"
                          stroke="#8884d8"
                          name="Inserciones"
                        />
                        <Line
                          type="monotone"
                          dataKey="updateCount"
                          stroke="#82ca9d"
                          name="Actualizaciones"
                        />
                        <Line
                          type="monotone"
                          dataKey="deleteCount"
                          stroke="#ff7300"
                          name="Eliminaciones"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  ) : (
                    <p>No hay datos para mostrar en la gráfica.</p>
                  )}
                </div>
              </div>
              <div className={styles.tableContainer}>
                <table className={`${styles.myTable} no-break`}>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>ACCIÓN</th>
                      <th>FECHA</th>
                      <th>VALOR ANTIGUO</th>
                      <th>VALOR NUEVO</th>
                    </tr>
                  </thead>
                  <tbody>
                    {auditRecords && auditRecords.length > 0 ? (
                      auditRecords.map((item) => (
                        <tr key={item.idAudit}>
                          <td>{item.idAudit}</td>
                          <td>{item.action}</td>
                          <td>{new Date(item.date).toLocaleDateString()}</td>
                          <td>{item.oldValue}</td>
                          <td>{item.postValue}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="6">No hay datos disponibles</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ReportLayout;
