import React from "react";
import styles from "./MenuManag.module.css";
import { useAuth } from "../../../context/AuthContext";
import { Navigate } from "react-router-dom";

const MenuManag = ({ closeMenu }) => {
  const { user } = useAuth();
  const goToPlaces = () => {
    Navigate("/places");
  };
  const goToActivities = () => {
    Navigate("/activities");
  };
  const goToUsers = () => {
    Navigate("/users");
  };
  const goToTickets = () => {
    Navigate("/tickets");
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.menuManagContainer}>
        <button className={styles.closeBtn} onClick={closeMenu}>
          &times;
        </button>
        <h2 className={styles.h2}>Gestión</h2>
        <ul className={styles.menuList}>
          <li>LISTAR LUGARES</li>
          <li>LISTAR ACTIVIDADES</li>
          <li>LISTAR USUARIOS</li>
          <li>LISTAR TICKETS</li>
        </ul>
      </div>
    </div>
  );
};

export default MenuManag;
