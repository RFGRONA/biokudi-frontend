import React, { useState } from "react";
import logoCopy from "../../assets/footer/logoCopyRight.svg";
import ListMenu from "./ListMenu";

// Styles
import "./Footer.css";

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
    <div className="footer">
      <div className="logoCopy">
        <img src={logoCopy} alt="logoCopy" />
      </div>
      <div className="menuButtonFooter">
        <i className="fa-solid fa-info" onClick={toggleMenu}></i>
      </div>
      <div className="copyRightText">
        <p>{firstCopyRight}</p>
        <p className="copyPharagraph">{secondCopyRight}</p>
      </div>
      <div className="listHelp">
        <div className="firstListFooter">
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
        <div className="secondListFooter">
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
      <div className={`listHelpMenu ${menuOpen ? "open" : ""}`}>
        <div className="listInsideMenu">
          <div className="closeButtonMenuFooter">
            <button onClick={toggleMenu}>
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>
          <ListMenu />
        </div>
      </div>
    </div>
  );
};

export default Footer;
