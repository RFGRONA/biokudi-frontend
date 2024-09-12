import React, { useState } from "react";
import styles from "./LoginForm.module.css";

const LoginForm = () => {
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
          Iniciar Sesión
        </h1>
        <button
          className={[styles.createAccountButton, "color-contrast"].join(" ")}
        >
          Crear Cuenta
        </button>
      </div>

      <div className={styles.rightContainer}>
        <form>
          <div className={styles.formGroup}>
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
            />
          </div>

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
            />
            <span id="togglePassword" className={styles.icon}>
              {showPassword ? (
                <i
                  className={["fa-regular", "fa-eye-slash"].join(" ")}
                  onClick={handleTogglePassword}
                ></i>
              ) : (
                <i
                  className={["fa-regular", "fa-eye"].join(" ")}
                  onClick={handleTogglePassword}
                ></i>
              )}
            </span>
          </div>
          <div className={styles.loginButton}>
            <button className={[styles.pressButton, "inter-bold"].join(" ")}>
              Ingresar
            </button>
          </div>
        </form>
        <div className={styles.captcha}>CAPTCHA</div>
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
