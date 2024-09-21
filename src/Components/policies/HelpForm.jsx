import React from 'react';
import styles from './HelpForm.module.css';

const HelpForm = () => {
    return (
        <div className={styles.helpContainer}>
            <p className={styles.helpP}>
                Puedes enviarnos un ticket llenado el siguiente formulario o enviar un correo electrónico con la información necesaria para poder resolver tu inquietud. <br />
                Te responderemos vía correo electrónico tan pronto como nos sea posible.
            </p>
            <div className={styles.help}>
                <div className={styles.formGroup}>
                    <label htmlFor="Asunto" className={[styles.formGroupLabel, "inter-bold"].join(" ")}>
                        Asunto
                    </label>
                    <input type="text" id="asunto" placeholder="Sobre qué es tu inquietud" className={styles.inputField} />
                </div>
                <p className={styles.middleText}>
                    Escoge la opción que más<br />
                    se ajuste a su solicitud
                </p>
                <div className={styles.formGroupSelect}>
                    <select id="select" className={styles.selectField}>
                        <option value="reclamo">Reclamo</option>
                        <option value="queja">Queja</option>
                        <option value="sugerencia">Sugerencia</option>
                    </select>
                </div>
            </div>
            <br />
            <div className={styles.help}>
                <div className={styles.messageField}>
                    <label htmlFor="mensaje" className={["inter-bold"].join(" ")}>Mensaje</label>
                    <textarea className={styles.textareaHelp}  id="mensaje" name="mensaje" placeholder="Explica cuál es tu inquietud" />
                </div>
            </div>
            <br />
            <div className={styles.help}>
                <button type="submit" className={styles.confirmButton}>
                    Confirmar
                </button>
            </div>

            <div className={styles.contactContainer}>
                <p className={styles.helpText}>O escríbenos:</p>
                <p className={styles.helpEmail}>contactobiokudi@gmail.com</p>
            </div>
        </div>
    );
};

export default HelpForm;
