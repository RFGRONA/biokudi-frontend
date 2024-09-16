import React, { useState } from "react";
import styles from "./LoginForm.module.css";
import ReCAPTCHA from "react-google-recaptcha";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  /*Auth method*/
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  /**Register redirect */
  const navigate = useNavigate();
  const goToRegister = (e) => {
    e.preventDefault();
    navigate("/register");
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    login();
  };

  /*Captcha use*/
  const [captcha, setCaptcha] = useState(false);
  const onChange = () => {
    setCaptcha(true);
  };

  /*Password visibility*/
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={styles.login}>
      <div className={styles.leftContainer}>
        <h1
          className={[styles.title, "bitter-bold", "color-primary"].join(" ")}
        >
          Iniciar <br /> Sesión
        </h1>
        <button
          className={[styles.createAccountButton, "color-contrast"].join(" ")}
          onClick={(e) => goToRegister(e)}
        >
          Crear Cuenta
        </button>
      </div>

      <div className={styles.rightContainer}>
        <form>
          <div className={[styles.formGroup, styles.emailContainer].join(" ")}>
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
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className={styles.formGroup}>
            <div className={styles.passwordContainer}>
              <label
                htmlFor="password"
                className={["inter-bold", "color-primary"].join(" ")}
              >
                Contraseña
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="**********"
                className={[
                  styles.inputField,
                  "inter-bold",
                  "color-primary",
                ].join(" ")}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div className={styles.loginButton}>
            <button
              className={[styles.pressButton, "inter-bold"].join(" ")}
              disabled={!captcha}
              onClick={handleSubmit}
            >
              Ingresar
            </button>
          </div>
        </form>
        <div className={styles.recaptcha}>
          <ReCAPTCHA
            sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
            onChange={onChange}
          />
        </div>
        <div className={styles.recordUser}>
          <input type="checkbox" id="recordUser" className={styles.checkbox} />
          <label htmlFor="recordUser">Recordar usuario</label>
        </div>
        <div className={styles.forgotPassword}>
          <a href="#" className={[styles.recoveryPasswordButton]}>
            Recuperar contraseña
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
