import React, { useState } from "react";
import Header from "../header/Header2";
import Footer from "../footer/Footer";
import Loading from "../helpers/loading/Loading";
import Success from "../helpers/alerts/SuccessAlert";
import Error from "../helpers/alerts/ErrorAlert";
import styles from "./RecoveryPassword.module.css";
import {
  requestResetPasswordApi,
  updatePasswordApi,
} from "../../services/authService";
import { ValidateRegister } from "../../utils/validate/ValidateChangePasswordForm";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    email: "",
  });
  const [formErrors, setFormErrors] = useState({});

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    const updatedValues = { ...formValues, [name]: value };
    setFormValues(updatedValues);

    // Validate the input on change
    const validationErrors = ValidateRegister(updatedValues);
    setFormErrors(validationErrors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    setSuccess(false);

    const validationErrors = ValidateRegister(formValues);
    setFormErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await requestResetPasswordApi(formValues.email);

        if (response.status === 200) {
          setMessage("Se ha enviado un token a tu correo electrónico.");
          setSuccess(true);
        } else {
          setMessage("Error al enviar el correo de recuperación.");
          setError(true);
        }
      } catch (err) {
        setMessage("Error al enviar el correo de recuperación.");
        setError(true);
      } finally {
        setLoading(false);
      }
    } else {
      setLoading(false);
      console.log("Validation errors:", validationErrors);
    }
  };

  return (
    <div className={styles.container}>
      {loading && <Loading />}
      {error && <Error message={message} />}
      {success && (
        <Success
          message={message}
          onClose={() => navigate("/reset-password")}
        />
      )}
      <Header />
      <div className={`mainContainer ${styles.mainContent}`}>
        <h1 className={styles.title}>Recuperar Contraseña</h1>
        <p className={styles.instructions}>
          Por favor, introduce tu dirección de correo electrónico para recuperar
          tu cuenta.
        </p>
        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Correo electrónico"
            className={`${styles.input} ${
              formErrors.email ? styles.inputError : ""
            }`}
            value={formValues.email}
            onChange={handleFieldChange}
            required
          />
          {formErrors.email && (
            <p id="email-error" className={styles.errorMessage}>
              {formErrors.email}
            </p>
          )}

          <button
            type="submit"
            className={styles.button}
            disabled={!!formErrors.email || !formValues.email.trim()}
          >
            Enviar
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default ChangePassword;
