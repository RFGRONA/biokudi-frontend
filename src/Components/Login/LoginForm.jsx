import React, { useRef, useState } from "react";
import styles from "./LoginForm.module.css";
import ReCAPTCHA from "react-google-recaptcha";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const { login, loading } = useAuth();
  const [error, setError] = useState("");

  const goToRecovery = () => {
    navigate("/recovery-password");
  };

  /**Register redirect */
  const navigate = useNavigate();
  const goToRegister = (e) => {
    e.preventDefault();
    navigate("/register");
  };

  /*Submit */
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(email, password, remember, captchaToken);
      if (response.status !== 200) {
        setError(response.data.error);
        return;
      }
      navigate("/");
    } catch (err) {
      console.error("Error during login:", err);
      setError("Error al iniciar sesión. Por favor, inténtalo de nuevo.");
    }
  };

  /*Captcha use*/
  const [captcha, setCaptcha] = useState(false);
  const captchaRef = useRef();
  const [captchaToken, setCaptchaToken] = useState("");
  const onChange = () => {
    setCaptchaToken(captchaRef.current.getValue());
    setCaptcha(true);
  };

  /*Remember me */
  const handleRemember = () => {
    setRemember(!remember);
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
                type="password"
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
          <div className={styles.errors}>
            <ul>
              <li>{error && <span className={styles.error}>{error}</span>}</li>
            </ul>
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
            ref={captchaRef}
            sitekey={process.env.REACT_APP_RECAPTCHA_SITE_KEY}
            onChange={onChange}
          />
        </div>
        <div className={styles.recordUser}>
          <input
            type="checkbox"
            id="recordUser"
            onClick={handleRemember}
            className={styles.checkbox}
          />
          <label htmlFor="recordUser">Recordar usuario</label>
        </div>
        <div className={styles.forgotPassword} onClick={goToRecovery}>
          <a href="#" className={[styles.recoveryPasswordButton]}>
            Recuperar contraseña
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
