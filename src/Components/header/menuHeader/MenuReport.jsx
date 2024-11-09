import React from "react";
import styles from "./MenuManag.module.css";
import { useAuth } from "../../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const MenuManag = ({ closeMenu }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const goToReportPlaces = () => {
    navigate("/ReportPlace");
  };

  const goToReportActivities = () => {
    navigate("/ReportActivity");
  };

  const goToReportStates = () => {
    navigate("/ReportState");
  };

  const goToReportUsers = () => {
    navigate("/ReportUser");
  };

  const goToReportRoles = () => {
    navigate("/ReportRole");
  };

  const goToReportPictures = () => {
    navigate("/ReportPicture");
  };

  const goToReportReviews = () => {
    navigate("/ReportReview");
  };

  const goToReportTickets = () => {
    navigate("/ReportTicket");
  };

  const goToReportAudit = () => {
    navigate("/ReportAudit");
  };

  const goToReportCity = () => {
    navigate("/ReportCity");
  };

  const goToReportDepartment = () => {
    navigate("/ReportDepartment");
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.menuManagContainer}>
        <button className={styles.closeBtn} onClick={closeMenu}>
          &times;
        </button>
        <h2 className={styles.h2}>Reportes</h2>
        <ul className={styles.menuList}>
          <li onClick={goToReportAudit}>AUDITORÍA</li>
          <li onClick={goToReportPlaces}>LUGARES</li>
          <li onClick={goToReportActivities}>ACTIVIDADES</li>
          <li onClick={goToReportStates}>ESTADOS</li>
          <li onClick={goToReportUsers}>USUARIOS</li>
          <li onClick={goToReportRoles}>ROLES</li>
          <li onClick={goToReportPictures}>IMÁGENES</li>
          <li onClick={goToReportReviews}>RESEÑAS</li>
          <li onClick={goToReportTickets}>TICKETS</li>
          <li onClick={goToReportCity}>CIUDADES</li>
          <li onClick={goToReportDepartment}>DEPARTAMENTOS</li>
        </ul>
      </div>
    </div>
  );
};

export default MenuManag;
