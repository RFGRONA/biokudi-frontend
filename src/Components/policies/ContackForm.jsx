import React from 'react';
import styles from './ContactForm.module.css';
import FacebookIcon from '../../assets/policies/facebook.svg';
import XIcon from '../../assets/policies/x.svg';
import InstagramIcon from '../../assets/policies/instagram.svg';

const ContactForm = () => {
  return (
    <div className={styles.contactContainer}>
      <div className={styles.contactText}>Puedes contactarnos a través del siguiente correo electrónico</div>
      <div className={styles.contactEmail}>contactobiokudi@gmail.com</div>
      <hr className={styles.separator} />
      <p className={styles.separatorText}>Tambíen puedes rellenar el siguiente formulario</p>
      
      
      <form className={styles.form}>
        <div className={styles.inlineFields}>
          <input type="email" placeholder="Correo electrónico" className={styles.input} />
          <input type="text" placeholder="Asunto" className={styles.input} />
        </div>
        <textarea placeholder="Mensaje" className={styles.textareaContact}></textarea>
        <button type="submit" className={styles.button}>Enviar</button>
      </form>

      <p className={styles.separatorText}>Tambíen puedes visitarnos en nuestras redes sociales</p>
      <hr className={styles.separator} />

      <div className={styles.socialNetworksIcons}>
        <img src={FacebookIcon} alt="Facebook" className={styles.iconCont} />
        <img src={XIcon} alt="X" className={styles.iconCont} />
        <img src={InstagramIcon} alt="Instagram" className={styles.iconCont} />
      </div>
      <br />
    </div>
  );
};

export default ContactForm;
