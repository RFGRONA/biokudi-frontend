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
import DecisionAlert from "../helpers/alerts/DecisionAlert";
import { deletePlaceApi } from "../../services/apiModel/PlaceApi";
import { deleteActivityApi } from "../../services/apiModel/ActivityApi";
import { deleteStateApi } from "../../services/apiModel/StateApi";
import { deletePictureApi } from "../../services/apiModel/pictureApi";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { deleteUserApi } from "../../services/apiModel/UserApi";
import Decision from "../helpers/alerts/DecisionAlert";

const Read = ({ title, subtitle, data, onEdit, onCreate }) => {
  const { loading, setLoading } = useAuth();
  const [error, setError] = useState();
  const [decisionData, setDecisionData] = useState(null);

  const navigate = useNavigate();
  const numColumns = subtitle.length + 1;
  const gridTemplateColumns = `repeat(${numColumns}, 1fr)`;

  if (!Array.isArray(data)) {
    return <ErrorAlert message={`Error al obtener ${title}`} redirect={""} />;
  }
  if (data.length === 0) {
    return <Loading />;
  }

  const apiMap = {
    Lugares: deletePlaceApi,
    Actividades: deleteActivityApi,
    Estados: deleteStateApi,
    Usuarios: deleteUserApi,
    Imagenes: deletePictureApi,
    // Agrega aquí más títulos con sus respectivas funciones
  };

  const singular = {
    Lugares: "lugar",
    Actividades: "Actividad",
    Estados: "Estado",
    Usuarios: "Usuario",
    Imagenes: "Imagen",
    // Agrega aquí más títulos con sus respectivas funciones
  };

  const redirect = {
    Lugares: "places",
    Actividades: "activities",
    Estados: "states",
    Usuarios: "users",
    Imagenes: "pictures",
    // Agrega aquí más títulos con sus respectivas funciones
  };

  const onDelete = async (index) => {
    const deleteApi = apiMap[title];
    if (!deleteApi) {
      console.error("No se encontró una API para el título proporcionado");
      return;
    }
    setLoading(true);
    try {
      const response = await deleteApi(index);
      if (response.status === 200) {
        console.log("Deleted successfully");
        window.location.reload();
      } else {
        throw new Error("Error al eliminar");
      }
    } catch (error) {
      console.error("Error deleting:", error);
      setLoading(false);
      setError(true);
    }
  };

  return (
    <div className={"mainContainer"}>
      {loading ? (
        <Loading />
      ) : error ? (
        <ErrorAlert
          message={`Error al eliminar ${singular[title]}`}
          reload={true}
        />
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
                <div className={styles.buttonRep}>
                  Generar Reporte
                  <img src={report} alt="Reporte" />
                </div>
                {title !== "Usuarios" && title !== "Imagenes" ? (
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
              {data.map((row, rowIndex) => {
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
                      {title !== "Actividades" &&
                      title !== "Estados" &&
                      title !== "Usuarios" &&
                      title !== "Imagenes" ? (
                        <button>
                          <img src={details} alt="details" />
                        </button>
                      ) : (
                        ""
                      )}

                      {title !== "Usuarios" && title !== "Imagenes" ? (
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
