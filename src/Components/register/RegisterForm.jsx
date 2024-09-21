import React from "react";
import styles from "./RegisterForm.module.css";
import ReCAPTCHA from "react-google-recaptcha";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ValidateRegister } from "../../utils/ValidateRegister";

const RegisterForm = () => {
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

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
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = ValidateRegister(formValues);
    setErrors(validationErrors);

    if (
      Object.keys(validationErrors).every(
        (key) => !Object.keys(validationErrors[key]).length
      )
    ) {
      console.log("Formulario enviado con éxito");
    } else {
      console.log("Errores en el formulario", validationErrors);
    }
  };

  /*Button Handle */
  const navigate = useNavigate();
  const goToLogin = (e) => {
    e.preventDefault();
    navigate("/login");
  };

  /*Password visibility 1*/
  const [showPassword1, setShowPassword1] = useState(false);

  /*Password visibility 2*/
  const [showPassword2, setShowPassword2] = useState(false);

  /**Captcha handle */
  const [captcha, setCaptcha] = useState(false);
  const onChange = () => {
    setCaptcha(true);
  };
  return (
    <div className={styles.main}>
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
                      <span className={styles.error}>{errors.name.length}</span>
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
          </div>

          <div className={styles.formGroup}>
            <div className={styles.inputGroup}>
              <label htmlFor="password1" className={styles.label}>
                Contraseña
              </label>
              <input
                type={showPassword1 ? "text" : "password"}
                id="password1"
                placeholder="*************"
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
                  type={showPassword2 ? "text" : "password"}
                  id="conPassword"
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
          <button className={[styles.goToSesion].join(" ")} onClick={goToLogin}>
            Iniciar Sesion
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
