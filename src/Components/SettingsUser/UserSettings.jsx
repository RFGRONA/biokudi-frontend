import React, { useState } from "react";
import styles from "./UserSettings.module.css"; // Cambia a tu archivo .css
import Header from "../header/Header2";
import Footer from "../footer/Footer";
import { useAuth } from "../../context/AuthContext";

const UserSettings = () => {
  const { user } = useAuth();
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [popupNotifications, setPopupNotifications] = useState(false);

  const handleEmailNotificationChange = () => {
    setEmailNotifications(!emailNotifications);
  };

  const handlePopupNotificationChange = () => {
    setPopupNotifications(!popupNotifications);
  };

  const handleDeactivateAccount = () => {
    if (window.confirm("¿Estás seguro de que quieres desactivar tu cuenta?")) {
      // Lógica para desactivar cuenta
      alert("Cuenta desactivada");
    }
  };

  const handleDeleteAccount = () => {
    if (
      window.confirm(
        "¿Estás seguro de que quieres eliminar tu cuenta? Esta acción es irreversible."
      )
    ) {
      // Lógica para eliminar cuenta
      alert("Cuenta eliminada");
    }
  };

  return (
    <div>
      <Header />
      <div className={"mainContainer"}>
        <div className={styles.settingsContainer}>
          <h1 className={styles.title}>Mi configuración</h1>

          {/* Información personal */}
          <div className={styles.personalInfo}>
            <div className={styles.userImageContainer}>
              <img
                src={user ? user.photo : ""}
                alt="Foto de perfil"
                className={styles.userImage}
              />
            </div>
            <div className={styles.info}>
              <div className={styles.data}>
                <p>
                  <strong>Nombre: </strong>
                  {user ? user.name : ""}
                </p>
                <img alt="Editar" />
              </div>
              <div className={styles.data}>
                <p>
                  <strong>Correo: </strong>
                  {user ? user.email : ""}
                </p>
                <img alt="Editar" />
              </div>
              <div className={styles.data}>
                <p>
                  <strong>Teléfono: </strong>
                  {user ? user.phone : ""}
                </p>
                <img alt="Editar" />
              </div>
              <div className={styles.data}>
                <p>
                  <strong>Contraseña:</strong> ************
                </p>
                <img alt="Editar" />
              </div>
            </div>
            <div className={styles.actions}>
              <button
                className={styles.deactivateButton}
                onClick={handleDeactivateAccount}
              >
                Desactivar cuenta
              </button>
              <button
                className={styles.deleteButton}
                onClick={handleDeleteAccount}
              >
                Eliminar cuenta
              </button>
            </div>
          </div>

          {/* Notificaciones */}
          <div className={styles.notifications}>
            <h2>Notificaciones</h2>

            <div className={styles.checkboxCon}>
              <input
                id="emailNotifications"
                type="checkbox"
                checked={emailNotifications}
                onChange={handleEmailNotificationChange}
              />
              <span
                className={styles.switchSlider}
                onChange={handleEmailNotificationChange}
              ></span>
              <label htmlFor="emailNotifications">
                Notificaciones por correo electrónico
              </label>
            </div>

            <div className={styles.checkboxCon}>
              <input
                id="popupNotifications"
                type="checkbox"
                checked={popupNotifications}
                onChange={handlePopupNotificationChange}
              />
              <span
                className={styles.switchSlider}
                onClick={handlePopupNotificationChange}
              ></span>
              <label htmlFor="popupNotifications">
                Notificaciones por POP-UP
              </label>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UserSettings;
