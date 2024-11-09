import React from "react";
import styles from "./MenuManag.module.css";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const MenuManag = ({ closeMenu }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const goToPlaces = () => {
    navigate("/places");
  };

  const goToActivities = () => {
    navigate("/activities");
  };

  const goToUsers = () => {
    navigate("/users");
  };

  const goToTickets = () => {
    navigate("/tickets");
  };

  const goToStates = () => {
    navigate("/States");
  };

  const goToPictures = () => {
    navigate("/Pictures");
  };

  const goToRoles = () => {
    navigate("/roles");
  };

  const goToReviews = () => {
    navigate("/reviews");
  };

  const goToCities = () => {
    navigate("/cities");
  };

  const goToDepartments = () => {
    navigate("/departments");
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.menuManagContainer}>
        <button className={styles.closeBtn} onClick={closeMenu}>
          &times;
        </button>
        <h2 className={styles.h2}>Gestión</h2>
        <ul className={styles.menuList}>
          <li onClick={goToPlaces}>LISTAR LUGARES</li>
          <li onClick={goToActivities}>LISTAR ACTIVIDADES</li>
          {user.role !== "Editor" ? (
            <li onClick={goToStates}>LISTAR ESTADOS</li>
          ) : (
            ""
          )}
          {user.role !== "Editor" ? (
            <li onClick={goToUsers}>LISTAR USUARIOS</li>
          ) : (
            ""
          )}
          {user.role !== "Editor" ? (
            <li onClick={goToRoles}>LISTAR ROLES</li>
          ) : (
            ""
          )}
          {user.role !== "Editor" ? (
            <li onClick={goToPictures}>LISTAR IMAGENES</li>
          ) : (
            ""
          )}
          {user.role !== "Editor" ? (
            <li onClick={goToCities}>LISTAR CIUDADES</li>
          ) : (
            ""
          )}
          {user.role !== "Editor" ? (
            <li onClick={goToDepartments}>LISTAR DEPARTAMENTOS</li>
          ) : (
            ""
          )}

          <li onClick={goToReviews}>LISTAR RESEÑAS</li>
          <li onClick={goToTickets}>LISTAR TICKETS</li>
        </ul>
      </div>
    </div>
  );
};

export default MenuManag;
