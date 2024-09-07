import React, { useState } from "react";
import logoCopy from "../../assets/footer/logoCopyRight.svg";
import ListMenu from "./ListMenu";

// Styles
import styles from "./Footer.module.css";

const Footer = () => {
  const firstCopyRight =
    "CopyRight © 2024 BioKudi. Todos los derechos reservados";
  const secondCopyRight = `El uso de este sitio está sujeto a las condiciones de uso expresas. Al
          utilizar el sitio, indicas que aceptas cumplir con estos Términos y
          Condiciones del sitio.`;
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className={styles.footer}>
      <div className={styles.logoCopy}>
        <img src={logoCopy} alt={styles.logoCopy} />
      </div>
      <div className={styles.menuButtonFooter}>
        <i
          className={["fa-solid", "fa-circle-info"].join(" ")}
          onClick={toggleMenu}
        ></i>
      </div>
      <div className={[styles.copyRightText, "asul-bold"].join(" ")}>
        <p>{firstCopyRight}</p>
        <p className={styles.copyPharagraph}>{secondCopyRight}</p>
      </div>
      <div className={[styles.listHelp, "bitter-bold"].join(" ")}>
        <div className={styles.firstListFooter}>
          <ul>
            <li>
              <a href="#">Ayuda</a>
            </li>
            <li>
              <a href="#">Quienes Somos</a>
            </li>
            <li>
              <a href="#">Contacto</a>
            </li>
          </ul>
        </div>
        <div className={styles.secondListFooter}>
          <ul>
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
      </div>
      <div className={`${styles.listHelpMenu} ${menuOpen ? styles.open : ""}`}>
        <div className={styles.listInsideMenu}>
          <div className={styles.closeButtonMenuFooter}>
            <button onClick={toggleMenu}>
              <i className={["fa-solid", "fa-xmark"].join(" ")}></i>
            </button>
          </div>
          <ListMenu />
        </div>
      </div>
    </div>
  );
};

export default Footer;
