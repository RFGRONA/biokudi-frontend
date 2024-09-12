import React from "react";
import styles from "./Login.module.css";

const LoginForm = () => {
  return (
    <div className={styles.login}>
      <div className={styles.leftContainer}>
        <h1
          className={[styles.title, "bitter-bold", "color-primary"].join(" ")}
        >
          Iniciar Sesión
        </h1>
        <button className={styles.createAccount}>Crear Cuenta</button>
      </div>

      <div className={styles.rightContainer}>
        <form>
          <div className={styles.formGroup}>
            <input
              type="email"
              id="email"
              placeholder="Correo electrónico"
              className={styles.inputField}
            />
          </div>

          <div className={styles.formGroup}>
            <input
              type="password"
              id="password"
              placeholder="Contraseña"
              className={styles.inputField}
            />
          </div>
          <div className={styles.loginButton}>
            <button className={[styles.pressButton, "inter-bold"].join(" ")}>
              Ingresar
            </button>
          </div>
        </form>

        <div className={styles.recordUser}>
          <input type="checkbox" id="recordUser" />
          <label htmlFor="recordUser">Recordar usuario</label>
        </div>
        <div className={styles.forgotPassword}>
          <a href="#">Recuperar contraseña</a>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
