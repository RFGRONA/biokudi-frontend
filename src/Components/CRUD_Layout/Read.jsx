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
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Read = ({ title, subtitle, data, onEdit, onCreate }) => {
  const { loading, setLoading } = useAuth();
  const [alert, setAlert] = useState();
  const navigate = useNavigate();
  const numColumns = subtitle.length + 1;
  const gridTemplateColumns = `repeat(${numColumns}, 1fr)`;

  if (!Array.isArray(data)) {
    return <ErrorAlert />;
  }
  if (data.length === 0) {
    return <Loading />;
  }

  const apiMap = {
    Lugares: deletePlaceApi,
    Actividades: deleteActivityApi,
    Estados: deleteStateApi,
    // Agrega aquí más títulos con sus respectivas funciones
  };

  const createBtn = {
    Lugares: "lugar",
    Actividades: "Actividad",
    Estados: "Estado",
    Usuarios: "Usuario",
    // Agrega aquí más títulos con sus respectivas funciones
  };

  const onDelete = async (index) => {
    // Determinamos la API correcta según el título
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
      // TODO: Mostrar alerta de error
    }
  };

  return (
    <div className={"mainContainer"}>
      {loading ? (
        <Loading />
      ) : (
        <>
          {alert ? <DecisionAlert /> : ""}
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
                <div className={styles.buttonCreate} onClick={onCreate}>
                  Crear {createBtn[title]}
                  <img src={create} alt="Crear" />
                </div>
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
                      {title !== "Actividades" ? (
                        <button>
                          <img src={details} alt="details" />
                        </button>
                      ) : (
                        ""
                      )}

                      <button onClick={() => onEdit(index)}>
                        <img src={edit} alt="edit" />
                      </button>
                      <button onClick={() => onDelete(index)}>
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
