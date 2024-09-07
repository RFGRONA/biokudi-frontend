import React from "react";
import styles from "./ListMenu.module.css";
import logo from "../../assets/header/logo.svg";
const ListMenu = () => {
  const copyRightText = `CopyRight © 2024 BioKudi. Todos los derechos reservados
  El uso de este sitio está sujeto a las condiciones de uso expresas. Al
  utilizar el sitio, indicas que aceptas cumplir con estos Términos y
  Condiciones del sitio.`;
  return (
    <div className={styles.content}>
      <div className={styles.logoFooterMenu}>
        <img src={logo} alt="logo" />
      </div>
      <a
        href="#"
        className={[styles.bioKudi, styles.loko, "bitter-bold"].join(" ")}
      >
        BioKudi
      </a>
      <div className={[styles.listHelpInside, "asul"].join(" ")}>
        <ul>
          <li></li>
          <li>
            <a href="#">Ayuda</a>
          </li>
          <li>
            <a href="#">Quienes Somos</a>
          </li>
          <li>
            <a href="#">Contacto</a>
          </li>

          <li>
            <a href="#">Legal</a>
          </li>
          <li>
            <a href="#">Cookies</a>
          </li>
          <li>
            <a href="#">Política de Privacidad</a>
          </li>
        </ul>
      </div>
      <div className={styles.copyRightTextInside}>
        <p>{copyRightText}</p>
      </div>
    </div>
  );
};

export default ListMenu;
