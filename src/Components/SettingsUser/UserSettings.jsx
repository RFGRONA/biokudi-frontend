import React, { useState } from "react";
import styles from "./UserSettings.module.css"; // Cambia a tu archivo .css
import Header from "../header/Header2";
import Footer from "../footer/Footer";

const UserSettings = () => {
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
      <div className={styles.mainContainer}>
        <div className={styles.settingsContainer}>
          <h1 className={styles.title}>Mi configuración</h1>

          {/* Información personal */}
          <div className={styles.personalInfo}>
            <div className={styles.userImageContainer}>
              <img
                src="https://via.placeholder.com/150"
                alt="Foto de perfil"
                className={styles.userImage}
              />
            </div>
            <div className={styles.info}>
              <div className={styles.data}>
                <p>
                  <strong>Nombre:</strong> Jose Antonio Perez
                </p>
                <img alt="Editar" />
              </div>
              <div className={styles.data}>
                <p>
                  <strong>Correo:</strong> thisisafakemail@domain.com
                </p>
                <img alt="Editar" />
              </div>
              <p>
                <strong>Teléfono:</strong> 3405988700
              </p>
              <p>
                <strong>Contraseña:</strong> ************
              </p>
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

            <div>
              <div
                className={styles.checkboxCon}
                onClick={handleEmailNotificationChange}
              >
                <input
                  id="emailNotifications"
                  type="checkbox"
                  checked={emailNotifications}
                />
                <span className={styles.switchSlider}></span>
                <label htmlFor="emailNotifications">
                  Notificaciones por correo electrónico
                </label>
              </div>
            </div>
            <div>
            <div
              className={styles.checkboxCon}
              onClick={handlePopupNotificationChange}
            >
              <input
                id="popupNotifications"
                type="checkbox"
                checked={popupNotifications}
              />
              <span className={styles.switchSlider}></span>
              <label htmlFor="popupNotifications">
                Notificaciones por POP-UP
              </label>
            
            </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UserSettings;
