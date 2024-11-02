// ContactForm.js
import React from "react";
import styles from "./ContactForm.module.css";
import FacebookIcon from "../../assets/policies/facebook.svg";
import XIcon from "../../assets/policies/x.svg";
import InstagramIcon from "../../assets/policies/instagram.svg";
import Decision from "../helpers/alerts/DecisionAlert";
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import Loading from "../helpers/loading/Loading";

const ContactForm = ({ fields, formData, errors, onFieldChange, onSubmit }) => {
  const [localLoading, setLocalLoading] = useState(false);
  const [fileNames, setFileNames] = useState({});
  const isFieldsArray = Array.isArray(fields);
  const [decisionData, setDecisionData] = useState(null);

  const textAreaRefs = useRef({});
  const fileInputRefs = useRef({});

  const adjustTextareaHeight = (name) => {
    const textarea = textAreaRefs.current[name];
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  const handleChange = (e) => {
    if (onFieldChange) {
      onFieldChange(e);
    }

    const { name } = e.target;

    if (isFieldsArray) {
      const field = fields.find((f) => f.name === name);
      if (field && field.type === "textarea") {
        adjustTextareaHeight(name);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleanedFormData = Object.keys(formData).reduce((acc, key) => {
      acc[key] = formData[key] !== "" ? formData[key] : null;
      return acc;
    }, {});

    setDecisionData(cleanedFormData);
  };

  useEffect(() => {
    if (!fields.length > 0) {
      setLocalLoading(true);
    } else {
      setLocalLoading(false);
    }
  }, [fields]);

  if (localLoading) {
    return <Loading />;
  }

  return (
    <div className={styles.contactContainer}>
      {decisionData && (
        <Decision
          title1="¿Estás seguro?"
          message={`Se creará un nuevo item: ticket`}
          cancelText="Cancelar"
          onConfirm={async () => {
            setLocalLoading(true);
            if (onSubmit) {
              try {
                await onSubmit(decisionData);
              } catch (error) {
                console.error("Error durante el envío del formulario:", error);
              }
            }
            setLocalLoading(false);
            setDecisionData(null);
          }}
          onCancel={() => setDecisionData(null)}
        />
      )}

      <div className={styles.contactText}>
        Puedes contactarnos a través del siguiente correo electrónico
      </div>
      <div className={styles.contactEmail}>contactobiokudi@gmail.com</div>
      <hr className={styles.separator} />
      <p className={styles.separatorText}>
        También puedes rellenar el siguiente formulario
      </p>

      <form className={styles.form} onSubmit={handleSubmit}>
        {fields
          .filter((field) => field.name === "typeId")
          .map((field, index) => (
            <div key={index} className={styles.fieldGroup}>
              <select
                name={field.name}
                id={field.name}
                value={formData[field.name] || ""}
                onChange={onFieldChange}
                className={styles.input}
                required={field.required}
              >
                <option value="" disabled hidden>
                  {field.label}
                </option>
                {field.options &&
                  field.options.map((option, idx) => (
                    <option key={idx} value={option.value}>
                      {option.label}
                    </option>
                  ))}
              </select>
              {errors && errors[field.name] && (
                <span className={styles.errorMessage}>
                  {errors[field.name]}
                </span>
              )}
            </div>
          ))}
        <div className={styles.inlineFields}>
          {fields
            .filter(
              (field) => field.name === "email" || field.name === "affair"
            )
            .map((field, index) => (
              <div key={index} className={styles.fieldGroup}>
                <textarea
                  type={field.type}
                  name={field.name}
                  id={field.name}
                  placeholder={field.label}
                  value={formData[field.name] || ""}
                  onChange={handleChange}
                  className={styles.input}
                  required={field.required}
                  ref={(el) => (textAreaRefs.current[field.name] = el)}
                />
                {errors && errors[field.name] && (
                  <span className={styles.errorMessage}>
                    {errors[field.name]}
                  </span>
                )}
              </div>
            ))}
        </div>

        <button type="submit" className={styles.button}>
          Enviar
        </button>
      </form>

      <p className={styles.separatorText}>
        También puedes visitarnos en nuestras redes sociales
      </p>
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
