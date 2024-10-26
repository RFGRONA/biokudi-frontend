import React, { useEffect, useRef, useState } from "react";
import styles from "./UserSettings.module.css";
import Header from "../header/Header2";
import Footer from "../footer/Footer";
import {
  ValidateProfileField,
  ValidateProfileForm,
} from "../../utils/validate/ValidateUserForm";
import {
  getProfileApi,
  getUserById,
  updateProfileApi,
  updateUserApi,
} from "../../services/apiModel/UserApi";
import { convertToBase64Service } from "../../utils/convert/convertToBase64";
import Decision from "../helpers/alerts/DecisionAlert";
import Loading from "../helpers/loading/Loading";
import Error from "../helpers/alerts/ErrorAlert";
import Success from "../helpers/alerts/SuccessAlert";
import { useNavigate } from "react-router-dom";

const UserSettings = () => {
  const [emailNotification, setEmailNotification] = useState(false);
  const [emailPost, setEmailPost] = useState(false);
  const [userData, setUserData] = useState({});
  const [decisionAction, setDecisionAction] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  /* File states */
  const [fileName, setFileName] = useState("");
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const base64 = await convertToBase64Service(file);
        setFormData((prevFormData) => ({
          ...prevFormData,
          photo: base64,
        }));
        setFileName(file.name);
      } catch (error) {
        console.error("Error al convertir el archivo a Base64:", error);
      }
    }
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      try {
        const base64 = await convertToBase64Service(file);
        setFormData((prevFormData) => ({
          ...prevFormData,
          photo: base64,
        }));
        setFileName(file.name);
      } catch (error) {
        console.error("Error al convertir el archivo a Base64:", error);
      }
    }
  };

  const handleEmailNotificationChange = (e) => {
    const { checked } = e.target;
    setFormData({
      ...formData,
      emailNotification: checked,
    });
  };

  const handleEmailPostChange = (e) => {
    const { checked } = e.target;
    setFormData({
      ...formData,
      emailPost: checked,
    });
  };

  const handleDesactivateAccount = () => {
    if (window.confirm("Esta función esta en desarrollo")) {
      // TODO: Lógica para desactivar cuenta
    }
  };

  const handleDeleteAccount = () => {
    if (window.confirm("Esta función esta en desarrollo")) {
      // TODO: Lógica para eliminar cuenta
    }
  };
  /* Get user */
  const fetchData = async () => {
    try {
      const user = await getProfileApi();
      setUserData(user);
      setEmailNotification(user.emailNotification);
      setEmailPost(user.emailPost);
    } catch (error) {
      console.error("Error obteniendo usuario", error);
      setErrorMessage("Error al obtener los datos del usuario");
      setShowErrorAlert(true);
      navigate("/");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleEdit = () => {
    setIsEditing(true);
    setFormData({
      userName: userData.userName || "",
      email: userData.email || "",
      phoneNumber: userData.phoneNumber || "",
      profilePicture: userData.profilePicture || "",
      emailNotification: userData.emailNotification || false,
      emailPost: userData.emailPost || false,
    });
  };

  const handleInputChange = (e) => {
    setErrors({});
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setFormData({
      ...formData,
      [name]: newValue,
    });

    // Validate the field
    const fieldErrors = ValidateProfileField(name, newValue);
    setErrors((prevErrors) => ({
      ...prevErrors,
      ...fieldErrors,
    }));
  };

  /* Save and Cancel functions */
  const handleSave = () => {
    setDecisionAction("save");
  };

  const handleCancelEditing = () => {
    setDecisionAction("cancel");
  };

  const handleConfirmSave = async () => {
    const validationErrors = ValidateProfileForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setDecisionAction("");
      return;
    }

    setIsLoading(true);

    /*Send to api */
    try {
      const response = await updateProfileApi(formData);
      if (response.status === 200) {
        setSuccessMessage("Datos guardados correctamente");
        setShowSuccessAlert(true);
        await fetchData();
        setIsEditing(false);
      } else {
        throw new Error("Error al guardar los datos");
      }
    } catch (error) {
      console.error("Error al guardar los datos:", error);
      setErrorMessage("Error al guardar los datos");
      setShowErrorAlert(true);
    } finally {
      setIsLoading(false);
      setIsEditing(false);
      setDecisionAction("");
    }
  };

  const handleCancelSave = () => {
    setDecisionAction("");
  };

  const handleConfirmCancel = () => {
    // Reset formData to userData
    setFormData({
      userName: userData.userName || "",
      email: userData.email || "",
      phoneNumber: userData.phoneNumber || "",
      profilePicture: userData.profilePicture || "",
      emailNotification: userData.emailNotification || false,
      emailPost: userData.emailPost || false,
    });
    setIsEditing(false);
    setDecisionAction("");
  };

  const handleCancelCancel = () => {
    setDecisionAction("");
  };

  return (
    <div>
      {decisionAction === "save" && (
        <Decision
          title1="Confirmar guardado"
          message="¿Estás seguro de que deseas guardar los cambios?"
          cancelText="Cancelar"
          onConfirm={handleConfirmSave}
          onCancel={handleCancelSave}
        />
      )}

      {decisionAction === "cancel" && (
        <Decision
          title1="Confirmar cancelación"
          message="¿Estás seguro de que deseas cancelar la edición?"
          cancelText="Continuar editando"
          onConfirm={handleConfirmCancel}
          onCancel={handleCancelCancel}
        />
      )}

      {showErrorAlert && (
        <Error
          message={errorMessage}
          onClose={() => setShowErrorAlert(false)}
        />
      )}

      {showSuccessAlert && (
        <Success
          message={successMessage}
          onClose={() => setShowSuccessAlert(false)}
        />
      )}

      <Header />
      {isLoading ? (
        <Loading />
      ) : (
        <div className={"mainContainer"}>
          <div className={styles.userContainer}>
            <div className={styles.settingsContainer}>
              <h1 className={styles.title}>Mi configuración</h1>

              {/* Información personal */}
              <div className={styles.personalInfo}>
                <div className={styles.userImageContainer}>
                  {isEditing ? (
                    <div
                      className={styles.fileInputContainer}
                      onDrop={handleDrop}
                      onDragOver={handleDragOver}
                      onClick={() => fileInputRef.current.click()}
                    >
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className={styles.fileInput}
                        ref={fileInputRef}
                      />
                      {formData.profilePicture || userData.profilePicture ? (
                        <img
                          src={
                            formData.profilePicture || userData.profilePicture
                          }
                          alt="Vista previa"
                          className={styles.previewImage}
                        />
                      ) : (
                        <label className={styles.fileInputLabel}>
                          Arrastra y suelta una imagen aquí, o haz clic para
                          seleccionar una.
                        </label>
                      )}
                      {errors.profilePicture && (
                        <span className={styles.error}>
                          {errors.profilePicture}
                        </span>
                      )}
                    </div>
                  ) : (
                    <img
                      src={userData ? userData.profilePicture : ""}
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
                      <div className={styles.groupField}>
                        <input
                          type="text"
                          name="userName"
                          value={formData.userName}
                          onChange={handleInputChange}
                          placeholder="Nombre"
                          className={styles.inputField}
                        />
                        <br></br>
                        {errors.userName && (
                          <span className={styles.error}>
                            {errors.userName}
                          </span>
                        )}
                      </div>
                    ) : (
                      <span>{userData ? userData.userName : ""}</span>
                    )}
                  </div>
                  <div className={styles.data}>
                    <label>
                      <strong>Correo:</strong>
                    </label>
                    {isEditing ? (
                      <div className={styles.groupField}>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="Correo"
                          className={styles.inputField}
                        />
                        <br></br>
                        {errors.email && (
                          <span className={styles.error}>{errors.email}</span>
                        )}
                      </div>
                    ) : (
                      <span>{userData ? userData.email : ""}</span>
                    )}
                  </div>
                  <div className={styles.data}>
                    <label>
                      <strong>Teléfono:</strong>
                    </label>
                    {isEditing ? (
                      <div className={styles.groupField}>
                        <input
                          type="text"
                          name="phoneNumber"
                          value={formData.phoneNumber}
                          onChange={handleInputChange}
                          placeholder="Teléfono"
                          className={styles.inputField}
                        />
                        <br></br>
                        {errors.phoneNumber && (
                          <span className={styles.error}>
                            {errors.phoneNumber}
                          </span>
                        )}
                      </div>
                    ) : (
                      <span>{userData ? userData.phoneNumber : ""}</span>
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
                    <>
                      <button
                        className={styles.saveButton}
                        onClick={handleSave}
                      >
                        Guardar
                      </button>
                      <button
                        className={styles.cancelButton}
                        onClick={handleCancelEditing}
                      >
                        Cancelar
                      </button>
                    </>
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
                  {isEditing ? (
                    <label className={styles.switchLabel}>
                      <input
                        id="emailNotification"
                        type="checkbox"
                        checked={formData.emailNotification}
                        onChange={handleEmailNotificationChange}
                      />
                      <span className={styles.switchSlider}></span>
                      Notificaciones por correo electrónico
                    </label>
                  ) : (
                    <label className={styles.switchLabel}>
                      <input
                        id="emailNotification"
                        type="checkbox"
                        checked={emailNotification}
                        onChange={() => {}}
                        disabled
                      />
                      <span className={styles.switchSlider}></span>
                      Notificaciones por correo electrónico
                    </label>
                  )}
                </div>

                <div className={styles.checkboxCon}>
                  {isEditing ? (
                    <label className={styles.switchLabel}>
                      <input
                        id="emailPost"
                        type="checkbox"
                        checked={formData.emailPost}
                        onChange={handleEmailPostChange}
                      />
                      <span className={styles.switchSlider}></span>
                      Notificaciones de lugares favoritos
                    </label>
                  ) : (
                    <label className={styles.switchLabel}>
                      <input
                        id="emailPost"
                        type="checkbox"
                        checked={emailPost}
                        onChange={() => {}}
                        disabled
                      />
                      <span className={styles.switchSlider}></span>
                      Notificaciones de lugares favoritos
                    </label>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default UserSettings;
