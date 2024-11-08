import React, { useState } from "react";
import styles from "./Read.module.css";
import choose from "../../assets/CRUD/choose.svg";
import order from "../../assets/CRUD/order.svg";
import report from "../../assets/CRUD/report.svg";
import create from "../../assets/CRUD/create.svg";
import details from "../../assets/CRUD/details.svg";
import edit from "../../assets/CRUD/edit.svg";
import drop from "../../assets/CRUD/drop.svg";
import Loading from "../helpers/loading/Loading";
import ErrorAlert from "../helpers/alerts/ErrorAlert";
import { deletePlaceApi } from "../../services/apiModel/PlaceApi";
import { deleteActivityApi } from "../../services/apiModel/ActivityApi";
import { deleteStateApi } from "../../services/apiModel/StateApi";
import { deletePictureApi } from "../../services/apiModel/pictureApi";
import { useAuth } from "../../context/AuthContext";
import { deleteUserApi } from "../../services/apiModel/UserApi";
import Decision from "../helpers/alerts/DecisionAlert";
import { deleteRoleApi } from "../../services/apiModel/RoleApi";
import { deleteReviewApi } from "../../services/apiModel/ReviewApi";
import Success from "../helpers/alerts/SuccessAlert";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  deleteTicketApi,
  scaleTicketApi,
} from "../../services/apiModel/TicketApi";
import scale from "../../assets/CRUD/scale.svg";

const Read = ({ title, subtitle, data, onEdit, onCreate }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [decisionData, setDecisionData] = useState(null);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [dataState, setDataState] = useState(data);
  const navigate = useNavigate();
  const { user } = useAuth();
  useEffect(() => {
    setDataState(data);
  }, [data]);

  const numColumns = subtitle.length + 1;
  const gridTemplateColumns = `repeat(${numColumns}, 1fr)`;

  if (!Array.isArray(data)) {
    return <ErrorAlert message={`Error al obtener ${title}`} redirect={""} />;
  }
  if (data.length === 0) {
    return <Loading />;
  }

  const goToReport = () => {
    navigate(`/${reportView[title]}`);
  };

  const apiMap = {
    Lugares: deletePlaceApi,
    Actividades: deleteActivityApi,
    Estados: deleteStateApi,
    Usuarios: deleteUserApi,
    Imagenes: deletePictureApi,
    Roles: deleteRoleApi,
    Reseñas: deleteReviewApi,
    Tickets: deleteTicketApi,
    // Agrega aquí más títulos con sus respectivas funciones
  };

  const reportView = {
    Lugares: "reportPlace",
    Actividades: "reportActivity",
    Estados: "reportState",
    Usuarios: "reportUser",
    Imagenes: "reportPicture",
    Roles: "reportRole",
    Reseñas: "reportReview",
    Tickets: "reportTicket",
    // Agrega aquí más títulos con sus respectivas funciones
  };

  const singular = {
    Lugares: "lugar",
    Actividades: "Actividad",
    Estados: "Estado",
    Usuarios: "Usuario",
    Imagenes: "Imagen",
    Roles: "Rol",
    Reseñas: "Reseña",
    Tickets: "Ticket",
    // Agrega aquí más títulos con sus respectivas funciones
  };

  const redirect = {
    Lugares: "places",
    Actividades: "activities",
    Estados: "states",
    Usuarios: "users",
    Imagenes: "pictures",
    Roles: "roles",
    Reseñas: "reviews",
    Tickets: "tickets",
    // Agrega aquí más títulos con sus respectivas funciones
  };

  /*Scale Action */
  const onScale = async (index) => {
    setLoading(true);
    try {
      const response = await scaleTicketApi(index);
      if (response.status === 200) {
        console.log("Scaled successfully");
        setAlertMessage(`Ticket escalado correctamente`);
        setLoading(false);
        setShowSuccessAlert(true);
      } else {
        throw new Error("Error al escalar");
      }
    } catch (error) {
      console.error("Error scaling:", error);
      setAlertMessage(`Error al escalar Ticket`);
      setLoading(false);
      setError(true);
    }
  };
  /* Delete Action */
  const onDelete = async (index) => {
    const deleteApi = apiMap[title];
    try {
      if (!deleteApi) {
        console.error("No se encontró una API para el título proporcionado");
        throw new Error("Error al eliminar");
      }
      setLoading(true);
      const response = await deleteApi(index);
      if (response.status === 200) {
        console.log("Deleted successfully");
        // Update local data
        const updatedData = dataState.filter((row) => row[0] !== index);
        setDataState(updatedData);
        setAlertMessage(`${singular[title]} eliminado correctamente`);
        setLoading(false);
        setShowSuccessAlert(true); // Muestra el mensaje de éxito
      } else {
        throw new Error("Error al eliminar");
      }
    } catch (error) {
      console.error("Error deleting:", error);
      setAlertMessage(`Error al eliminar ${singular[title]}`);
      setLoading(false);
      setError(true);
    }
  };

  return (
    <div className={"mainContainer"}>
      {loading ? (
        <Loading />
      ) : error ? (
        <ErrorAlert message={alertMessage} reload={true} />
      ) : (
        <>
          {decisionData && (
            <Decision
              title1="¿Está seguro?"
              message={`${singular[
                title
              ].toLowerCase()} será eliminado permanentemente`}
              cancelText="Cancelar"
              onConfirm={() => {
                onDelete(decisionData);
                setDecisionData(null);
              }}
              onCancel={() => setDecisionData(null)}
            />
          )}
          {showSuccessAlert && (
            <Success
              message={alertMessage}
              onClose={() => {
                setTimeout(() => {
                  window.location.reload();
                }, 1000);
              }}
            />
          )}

          <div className={styles.bodyContainer}>
            <div className={styles.titleContainer}>
              <h1 className={styles.title}>{title}</h1>
              <div className={styles.buttonActions}>
                <div className={styles.buttonOrd}>
                  Ordenar
                  <img src={order} alt="Ordenar" />
                </div>
                <div className={styles.buttonEsc}>
                  Escoger
                  <img src={choose} alt="Escoger" />
                </div>
                <div className={styles.buttonRep} onClick={goToReport}>
                  Generar Reporte
                  <img src={report} alt="Reporte" />
                </div>
                {(title !== "Actividades" || user.role !== "Editor") &&
                title !== "Usuarios" &&
                title !== "Tickets" &&
                title !== "Imagenes" &&
                title !== "Reseñas" ? (
                  <div className={styles.buttonCreate} onClick={onCreate}>
                    Crear {singular[title]}
                    <img src={create} alt="Crear" />
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>

            <div
              className={styles.gridContainer}
              style={{ gridTemplateColumns }}
            >
              {/* Headers */}
              {subtitle.map((sub, index) => (
                <div key={`header-${index}`} className={styles.gridHeaderCell}>
                  {sub}
                </div>
              ))}
              <div className={styles.gridHeaderCell}>Acciones</div>

              {/* Filas de datos */}
              {dataState.map((row, rowIndex) => {
                const index = row[0];
                return (
                  <React.Fragment key={`row-${rowIndex}`}>
                    {row.map((cell, cellIndex) => (
                      <div
                        key={`cell-${rowIndex}-${cellIndex}`}
                        className={`${styles.gridCell} ${
                          rowIndex % 2 === 0 ? styles.evenRow : styles.oddRow
                        }`}
                      >
                        {cell}
                      </div>
                    ))}
                    <div
                      className={`${styles.gridCell} ${styles.actions} ${
                        rowIndex % 2 === 0 ? styles.evenRow : styles.oddRow
                      }`}
                    >
                      {title === "Tickets" ? (
                        <button onClick={() => onScale(index)}>
                          <img src={scale} alt="Scale" />
                        </button>
                      ) : (
                        ""
                      )}
                      {title !== "Actividades" &&
                      title !== "Estados" &&
                      title !== "Usuarios" &&
                      title !== "Imagenes" &&
                      title !== "Roles" &&
                      title !== "Tickets" &&
                      title !== "Reseñas" ? (
                        <button>
                          <img src={details} alt="details" />
                        </button>
                      ) : (
                        ""
                      )}

                      {(title === "Actividades" && user.role !== "Editor") ||
                      (title !== "Imagenes" &&
                        title !== "Reseñas" &&
                        title !== "Actividades") ? (
                        <button onClick={() => onEdit(index)}>
                          <img src={edit} alt="edit" />
                        </button>
                      ) : (
                        ""
                      )}
                      <button onClick={() => setDecisionData(index)}>
                        <img src={drop} alt="drop" />
                      </button>
                    </div>
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Read;
