import React from "react";
import styles from "./Read.module.css";
import choose from "../../assets/CRUD/choose.svg";
import order from "../../assets/CRUD/order.svg";
import report from "../../assets/CRUD/report.svg";
import create from "../../assets/CRUD/create.svg";
import details from "../../assets/CRUD/details.svg";
import edit from "../../assets/CRUD/edit.svg";
import drop from "../../assets/CRUD/drop.svg";

const Read = ({ title, subtitle, data }) => {
  console.log(data);
  const numColumns = subtitle.length + 1;
  const gridTemplateColumns = `repeat(${numColumns}, 1fr)`;

  return (
    <div className={"mainContainer"}>
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
            <div className={styles.buttonCreate}>
              Crear lugar
              <img src={create} alt="Crear" />
            </div>
          </div>
        </div>

        <div className={styles.gridContainer} style={{ gridTemplateColumns }}>
          {/* Headers */}
          {subtitle.map((sub, index) => (
            <div key={`header-${index}`} className={styles.gridHeaderCell}>
              {sub}
            </div>
          ))}
          <div className={styles.gridHeaderCell}>Acciones</div>

          {/* Filas de datos */}
          {data.map((row, rowIndex) => (
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
                <button>
                  <img src={details} alt="details" />
                </button>
                <button>
                  {" "}
                  <img src={edit} alt="edit" />
                </button>
                <button>
                  {" "}
                  <img src={drop} alt="drop" />
                </button>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Read;
