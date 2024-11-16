import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./HelpForm.module.css";

const HelpForm = () => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate("/contact");
  };

  return (
    <div className={styles.helpContainer}>
      <p className={styles.helpP}>
        Bienvenido a nuestro centro de ayuda. Aquí encontrarás recursos y
        respuestas a preguntas frecuentes para resolver cualquier duda que
        puedas tener sobre nuestros servicios.
      </p>
      <p className={styles.helpP}>
        Si no encuentras la respuesta que buscas, nuestro equipo de soporte está
        listo para asistirte. Puedes explorar las siguientes opciones:
      </p>
      <ul className={styles.helpList}>
        <li>
          Visita nuestra sección de{" "}
          <a className={styles.a} href="/faq">
            Preguntas Frecuentes
          </a>{" "}
          para ver soluciones rápidas.
        </li>
        <li>
          Explora nuestros{" "}
          <a className={styles.a} href="/guides">
            Tutoriales y Guías
          </a>{" "}
          para obtener información detallada.
        </li>
        <li>Contáctanos directamente para recibir asistencia personalizada.</li>
      </ul>
      <p className={styles.helpP}>
        Para crear un ticket de soporte, haz clic en el botón de abajo. Te
        responderemos vía correo electrónico tan pronto como sea posible.
      </p>
      <div className={styles.help}>
        <button onClick={handleRedirect} className={styles.confirmButton}>
          Crear un ticket
        </button>
      </div>
      <div className={styles.contactContainer}>
        <p className={styles.helpText}>También puedes escribirnos a:</p>
        <p className={styles.helpEmail}>contactobiokudi@gmail.com</p>
      </div>
    </div>
  );
};

export default HelpForm;
