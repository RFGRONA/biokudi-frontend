import React from "react";
import styles from "./RegisterForm.module.css";
import ReCAPTCHA from "react-google-recaptcha";
import { useState } from "react";

const RegisterForm = () => {
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
              <label
                htmlFor="email"
                className={["inter-bold", "color-primary"].join(" ")}
              >
                Correo electrónico
              </label>
              <input
                type="email"
                id="email"
                placeholder="example@dominio.com"
                className={styles.inputField}
                // onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className={styles.inputGroup}>
              <label
                htmlFor="email"
                className={["inter-bold", "color-primary"].join(" ")}
              >
                Correo electrónico
              </label>
              <input
                type="email"
                id="email"
                placeholder="example@dominio.com"
                className={styles.inputField}
                // onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className={styles.formGroup}>
            <div className={styles.inputGroup}>
              <label
                htmlFor="email"
                className={["inter-bold", "color-primary"].join(" ")}
              >
                Correo electrónico
              </label>
              <input
                type="email"
                id="email"
                placeholder="example@dominio.com"
                className={styles.inputField}
                // onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className={styles.inputGroup}>
              <label
                htmlFor="email"
                className={["inter-bold", "color-primary"].join(" ")}
              >
                Correo electrónico
              </label>
              <input
                type="email"
                id="email"
                placeholder="example@dominio.com"
                className={styles.inputField}
                // onChange={(e) => setEmail(e.target.value)}
              />
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
              disable={!captcha}
              className={styles.submitButton}
            >
              Confirmar
            </button>
          </div>
        </form>
      </div>
      <div className={styles.rightContainer}>
        <div className={styles.head}>
          <h2 className={["color-contrast"]}>
            Crear
            <br /> Cuenta
          </h2>
          <button
            className={[styles.createAccountButton, "color-contrast"].join(" ")}
            // onClick={goToRegister}
          >
            Iniciar Sesion
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
