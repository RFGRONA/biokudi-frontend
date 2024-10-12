import React, { useState } from "react";
import styles from "./UserSettings.module.css";
import Header from "../header/Header2";
import Footer from "../footer/Footer";
import { useAuth } from "../../context/AuthContext";

const UserSettings = () => {
  const { user } = useAuth();
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [popupNotifications, setPopupNotifications] = useState(false);

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});

  const handleEmailNotificationChange = () => {
    setEmailNotifications(!emailNotifications);
  };

  const handlePopupNotificationChange = () => {
    setPopupNotifications(!popupNotifications);
  };

  const handleDesactivateAccount = () => {
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

  const handleEdit = () => {
    setIsEditing(true);
    setFormData({
      name: user ? user.name : "",
      email: user ? user.email : "",
      phone: user ? user.phone : "",
      photo: user ? user.photo : "",
    });
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    // Aquí enviarías formData al backend
    console.log("Datos guardados:", formData);

    setIsEditing(false);
    // Actualizar el usuario con los nuevos datos si es necesario
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
              {isEditing ? (
                <input
                  type="text"
                  name="photo"
                  value={formData.photo}
                  onChange={handleInputChange}
                  placeholder="URL de la foto"
                  className={styles.userImageInput}
                />
              ) : (
                <img
                  src={user ? user.photo : ""}
                  alt="Foto de perfil"
                  className={styles.userImage}
                />
              )}
            </div>
            <div className={styles.info}>
              <div className={styles.data}>
                <label>
                  <strong>Nombre:</strong>
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Nombre"
                    className={styles.inputField}
                  />
                ) : (
                  <span>{user ? user.name : ""}</span>
                )}
              </div>
              <div className={styles.data}>
                <label>
                  <strong>Correo:</strong>
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Correo"
                    className={styles.inputField}
                  />
                ) : (
                  <span>{user ? user.email : ""}</span>
                )}
              </div>
              <div className={styles.data}>
                <label>
                  <strong>Teléfono:</strong>
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Teléfono"
                    className={styles.inputField}
                  />
                ) : (
                  <span>{user ? user.phone : ""}</span>
                )}
              </div>
              <div className={styles.data}>
                <label>
                  <strong>Contraseña:</strong>
                </label>
                <span>************</span>
              </div>
            </div>
            <div className={styles.actions}>
              {isEditing ? (
                <button className={styles.saveButton} onClick={handleSave}>
                  Guardar
                </button>
              ) : (
                <button className={styles.editButton} onClick={handleEdit}>
                  Editar
                </button>
              )}
              <button
                className={styles.desactivateButton}
                onClick={handleDesactivateAccount}
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
              <span className={styles.switchSlider}></span>
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
              <span className={styles.switchSlider}></span>
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
