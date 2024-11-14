import React, { useState } from "react";
import styles from "./ResetPassword.module.css";
import Header from "../header/Header2";
import Footer from "../footer/Footer";
import Loading from "../helpers/loading/Loading";
import Success from "../helpers/alerts/SuccessAlert";
import ErrorAlert from "../helpers/alerts/ErrorAlert";
import Decision from "../helpers/alerts/DecisionAlert";
import {
  validateResetPasswordForm,
  validateResetPasswordField,
} from "../../utils/validate/ValidateResetPasswordForms";
import {
  resetPasswordApi,
  verifyResetPassword,
} from "../../services/authService";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [formValues, setFormValues] = useState({
    email: "",
    newPassword: "",
    confirmNewPassword: "",
    token: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [decision, setDecision] = useState(false);

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    const updatedValues = { ...formValues, [name]: value };
    setFormValues(updatedValues);

    // Validate the specific field
    const fieldErrors = validateResetPasswordField(name, value, updatedValues);
    setFormErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      if (fieldErrors[name]) {
        // There is an error
        newErrors[name] = fieldErrors[name];
      } else {
        // No error, remove the field from errors
        delete newErrors[name];
      }
      return newErrors;
    });
  };

  const handleDecision = (e) => {
    e.preventDefault(); // Prevent form submission
    setDecision(true);
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    setIsSubmitting(true);
    setLoading(true);

    // Validate the entire form
    const validationErrors = validateResetPasswordForm(formValues);
    setFormErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await verifyResetPassword({
          email: formValues.email,
          newPassword: formValues.newPassword,
          token: formValues.token,
        });

        if (response.status === 200) {
          setMessage("Contraseña restablecida con éxito.");
          setSuccess(true);
        } else {
          setMessage(response.message || "Error al restablecer la contraseña.");
          setError(true);
        }
      } catch (error) {
        console.error("Error during password reset:", error);
        setMessage("Error al restablecer la contraseña.");
        setError(true);
      } finally {
        setLoading(false);
        setIsSubmitting(false);
      }
    } else {
      setLoading(false);
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.container}>
      <Header />
      <div className={`mainContainer ${styles.mainContent}`}>
        {decision && (
          <Decision
            message="¿Estás seguro que deseas restablecer tu contraseña?"
            onConfirm={() => {
              handleSubmit();
              setDecision(false);
            }}
            cancelText={"Cancelar"}
            onCancel={() => setDecision(false)}
          />
        )}

        {error && (
          <ErrorAlert message={message} onClose={() => setError(false)} />
        )}
        {success && (
          <Success
            message={message}
            onClose={() => {
              setSuccess(false);
              navigate("/login");
            }}
          />
        )}
        {loading ? (
          <Loading />
        ) : (
          <>
            <h1 className={styles.title}>Restablecer Contraseña</h1>
            <form className={styles.form} onSubmit={handleDecision}>
              {/* Email */}
              <div className={styles.formGroup}>
                <label htmlFor="email" className={styles.label}>
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Ingresa tu correo electrónico"
                  className={`${styles.input} ${
                    formErrors.email ? styles.inputError : ""
                  }`}
                  value={formValues.email}
                  onChange={handleFieldChange}
                  required
                  aria-invalid={!!formErrors.email}
                  aria-describedby="email-error"
                />
                {formErrors.email && (
                  <p id="email-error" className={styles.errorMessage}>
                    {formErrors.email}
                  </p>
                )}
              </div>

              {/* Token */}
              <div className={styles.formGroup}>
                <label htmlFor="token" className={styles.label}>
                  Token
                </label>
                <input
                  type="text"
                  name="token"
                  id="token"
                  placeholder="Ingresa el token recibido"
                  className={`${styles.input} ${
                    formErrors.token ? styles.inputError : ""
                  }`}
                  value={formValues.token}
                  onChange={handleFieldChange}
                  required
                  aria-invalid={!!formErrors.token}
                  aria-describedby="token-error"
                />
                {formErrors.token && (
                  <p id="token-error" className={styles.errorMessage}>
                    {formErrors.token}
                  </p>
                )}
              </div>

              {/* New Password */}
              <div className={styles.formGroup}>
                <label htmlFor="newPassword" className={styles.label}>
                  Nueva Contraseña
                </label>
                <input
                  type="password"
                  name="newPassword"
                  id="newPassword"
                  placeholder="Ingresa tu nueva contraseña"
                  className={`${styles.input} ${
                    formErrors.newPassword ? styles.inputError : ""
                  }`}
                  value={formValues.newPassword}
                  onChange={handleFieldChange}
                  required
                  aria-invalid={!!formErrors.newPassword}
                  aria-describedby="new-password-error"
                />
                {formErrors.newPassword && (
                  <p id="new-password-error" className={styles.errorMessage}>
                    {formErrors.newPassword}
                  </p>
                )}
              </div>

              {/* Confirm New Password */}
              <div className={styles.formGroup}>
                <label htmlFor="confirmNewPassword" className={styles.label}>
                  Confirmar Nueva Contraseña
                </label>
                <input
                  type="password"
                  name="confirmNewPassword"
                  id="confirmNewPassword"
                  placeholder="Confirma tu nueva contraseña"
                  className={`${styles.input} ${
                    formErrors.confirmNewPassword ? styles.inputError : ""
                  }`}
                  value={formValues.confirmNewPassword}
                  onChange={handleFieldChange}
                  required
                  aria-invalid={!!formErrors.confirmNewPassword}
                  aria-describedby="confirm-new-password-error"
                />
                {formErrors.confirmNewPassword && (
                  <p
                    id="confirm-new-password-error"
                    className={styles.errorMessage}
                  >
                    {formErrors.confirmNewPassword}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className={styles.button}
                disabled={
                  isSubmitting ||
                  Object.keys(formErrors).length > 0 ||
                  !formValues.email ||
                  !formValues.newPassword ||
                  !formValues.confirmNewPassword ||
                  !formValues.token
                }
              >
                {isSubmitting ? "Enviando..." : "Restablecer Contraseña"}
              </button>
            </form>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ResetPassword;
