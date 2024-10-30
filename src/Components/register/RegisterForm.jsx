import React from "react";
import styles from "./RegisterForm.module.css";
import ReCAPTCHA from "react-google-recaptcha";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ValidateRegister } from "../../utils/validate/ValidateRegister";
import { registerApi } from "../../services/registerService";
import Success from "../helpers/alerts/SuccessAlert";
import ErrorAlert from "../helpers/alerts/ErrorAlert";
import Loading from "../helpers/loading/Loading";

const RegisterForm = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  /*Captcha token */
  const [captchaToken, setCaptchaToken] = useState("");
  const [captcha, setCaptcha] = useState(false);
  const onChange = (token) => {
    setCaptcha(true);
    setCaptchaToken(token);
  };

  const [errors, setErrors] = useState({
    name: {},
    email: {},
    password: {},
    confirmPassword: {},
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updatedValues = { ...formValues, [name]: value };
    setFormValues(updatedValues);
  };

  /**HandleSubmit */
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const validationErrors = ValidateRegister(formValues);
    setErrors(validationErrors);

    if (
      Object.keys(validationErrors).every(
        (key) => !Object.keys(validationErrors[key]).length
      )
    ) {
      try {
        const response = await registerApi(
          formValues.email,
          formValues.password,
          formValues.name,
          captchaToken
        );
        if (response.error) {
          setErrors({ captcha: { error: response.error } });
          throw new Error("Error en el registro");
        }
        if (response.status === 204) {
          console.log("Usuario registrado con éxito", response.data);
          setSuccess(true);
        } else {
          console.log("Error en el registro", response.data);
          throw new Error("Error en el registro");
        }
      } catch (error) {
        console.log("Error en el registro", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    } else {
      console.log("Errores en el formulario", validationErrors);
      setLoading(false);
    }
  };

  /*Button Handle */
  const navigate = useNavigate();
  const goToLogin = (e) => {
    navigate("/login");
  };

  /**Captcha handle */
  return (
    <div className={styles.main}>
      {success && (
        <Success message="Usuario registrado con éxito" onClose={goToLogin} />
      )}
      {error === "error" && <ErrorAlert message="Error en el registro" />}
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className={styles.leftContainer}>
            <form className={styles.form}>
              <div className={styles.formGroup}>
                <div className={styles.inputGroup}>
                  <label htmlFor="name" className={styles.label}>
                    Nombre
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="John Doe"
                    className={styles.inputField}
                    onChange={handleInputChange}
                    value={formValues.name}
                  />
                  {/* errors handle */}
                  <div className={styles.errors}>
                    <ul>
                      <li>
                        {errors.name.required && (
                          <span className={styles.error}>
                            {errors.name.required}
                          </span>
                        )}
                      </li>
                      <li>
                        {errors.name.length && (
                          <span className={styles.error}>
                            {errors.name.length}
                          </span>
                        )}
                      </li>
                      <li>
                        {errors.name.invalid && (
                          <span className={styles.error}>
                            {errors.name.invalid}
                          </span>
                        )}
                      </li>
                    </ul>
                  </div>
                </div>

                <div className={styles.inputGroup}>
                  <label htmlFor="email" className={styles.label}>
                    Correo electrónico
                  </label>
                  <div className={styles.passwordContainer}>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="example@dominio.com"
                      className={styles.inputField}
                      onChange={handleInputChange}
                      value={formValues.email}
                    />

                    {/* errors handle */}
                    <div className={styles.errors}>
                      <ul>
                        <li>
                          {errors.email.required && (
                            <span className={styles.error}>
                              {errors.email.required}
                            </span>
                          )}
                        </li>
                        <li>
                          {errors.email.invalid && (
                            <span className={styles.error}>
                              {errors.email.invalid}
                            </span>
                          )}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Api errors */}
                <ul>
                  <li>
                    {errors.error && (
                      <span className={styles.error}>{errors.error}</span>
                    )}
                  </li>
                </ul>
              </div>

              <div className={styles.formGroup}>
                <div className={styles.inputGroup}>
                  <label htmlFor="password1" className={styles.label}>
                    Contraseña
                  </label>
                  <input
                    id="password1"
                    placeholder="*************"
                    type="password"
                    className={styles.inputField}
                    onChange={handleInputChange}
                    value={formValues.password}
                    name="password"
                  />

                  {/* errors handle */}
                  <div className={styles.errors}>
                    <ul>
                      <li>
                        {errors.password.required && (
                          <span className={styles.error}>
                            {errors.password.required}
                          </span>
                        )}
                      </li>
                      <li>
                        {errors.password.length && (
                          <span className={styles.error}>
                            {errors.password.length}
                          </span>
                        )}
                      </li>
                      <li>
                        {errors.password.lowercase && (
                          <span className={styles.error}>
                            {errors.password.lowercase}
                          </span>
                        )}
                      </li>
                    </ul>
                  </div>
                </div>
                <div className={styles.inputGroup}>
                  <label htmlFor="conPassword" className={styles.label}>
                    Confirmar contraseña
                  </label>
                  <div className={styles.passwordContainer}>
                    <input
                      id="conPassword"
                      type="password"
                      placeholder="*************"
                      className={styles.inputField}
                      onChange={handleInputChange}
                      value={formValues.confirmPassword}
                      name="confirmPassword"
                    />

                    {/* errors handle */}
                    <div className={styles.errors}>
                      <ul>
                        <li>
                          {errors.confirmPassword.required && (
                            <span className={styles.error}>
                              {errors.confirmPassword.required}
                            </span>
                          )}
                        </li>
                        <li>
                          {errors.confirmPassword.match && (
                            <span className={styles.error}>
                              {errors.confirmPassword.match}
                            </span>
                          )}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.formGroup}></div>
              <div className={styles.bottomGroup}>
                <ReCAPTCHA
                  sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
                  onChange={onChange}
                  className={styles.recaptcha}
                />
                <button
                  type="submit"
                  disabled={!captcha}
                  className={styles.submitButton}
                  onClick={(e) => {
                    handleSubmit(e);
                  }}
                >
                  Confirmar
                </button>
              </div>
            </form>
          </div>
          <div className={styles.rightContainer}>
            <div className={styles.head}>
              <h2 className={styles.title}>
                Crear
                <br /> Cuenta
              </h2>
              <button
                className={[styles.goToSesion].join(" ")}
                onClick={goToLogin}
              >
                Iniciar Sesion
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default RegisterForm;
