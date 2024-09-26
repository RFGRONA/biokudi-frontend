import React, { useState } from "react";
import styles from "./UserSettings.module.css";
import Header from "../header/Header2";
import Footer from "../footer/Footer";


const UserSettings = () => {
  const [emailNotifications, setEmailNotifications] = useState(true);
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
    if (window.confirm("¿Estás seguro de que quieres eliminar tu cuenta? Esta acción es irreversible.")) {
      // Lógica para eliminar cuenta
      alert("Cuenta eliminada");
    }
  };

  return (
    <div className="mainContainer">
      <Header />
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
            <p><strong>Nombre:</strong> Jose Antonio Perez</p>
            <p><strong>Correo:</strong> thisisafakemail@domain.com</p>
            <p><strong>Teléfono:</strong> 3405988700</p>
            <p><strong>Contraseña:</strong> ************</p>
          </div>
          <div className={styles.actions}>
            <button className={styles.deactivateButton} onClick={handleDeactivateAccount}>Desactivar cuenta</button>
            <button className={styles.deleteButton} onClick={handleDeleteAccount}>Eliminar cuenta</button>
          </div>
        </div>

        {/* Notificaciones */}
        <div className={styles.notifications}>
          <h2>Notificaciones</h2>
          <div className={styles.notificationItem}>
            <label htmlFor="emailNotifications">Notificaciones por correo electrónico</label>
            <input
              type="checkbox"
              id="emailNotifications"
              checked={emailNotifications}
              onChange={handleEmailNotificationChange}
            />
          </div>
          <div className={styles.notificationItem}>
            <label htmlFor="popupNotifications">Notificaciones por POP-UP</label>
            <input
              type="checkbox"
              id="popupNotifications"
              checked={popupNotifications}
              onChange={handlePopupNotificationChange}
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default UserSettings;
