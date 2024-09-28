import React, { useState, useEffect, useRef } from "react";
import styles from "./Create.module.css";

const Create = ({ title, fields, onSubmit, errors }) => {
  // Verify if fields is an array
  const isFieldsArray = Array.isArray(fields);

  // Initial state
  const [formData, setFormData] = useState(
    isFieldsArray
      ? fields.reduce((acc, field) => {
          acc[field.name] = field.defaultValue || "";
          return acc;
        }, {})
      : {}
  );

  // TextAreas refs
  const textAreaRefs = useRef({});

  // Función para ajustar la altura del textarea
  const adjustTextareaHeight = (name) => {
    const textarea = textAreaRefs.current[name];
    if (textarea) {
      textarea.style.height = "auto"; // Resetear altura
      textarea.style.height = `${textarea.scrollHeight}px`; // Ajustar a contenido
    }
  };

  // Manejador de cambios
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

    //Text area auto resize
    if (isFieldsArray) {
      const field = fields.find((f) => f.name === name);
      if (field && field.type === "textarea") {
        adjustTextareaHeight(name);
      }
    }
  };

  // Handler submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(formData);
    }
  };

  // init auto resize
  useEffect(() => {
    if (isFieldsArray) {
      fields.forEach((field) => {
        if (field.type === "textarea") {
          adjustTextareaHeight(field.name);
        }
      });
    }
  }, [fields, isFieldsArray]);

  return (
    <div className={"mainContainer"}>
      <div className={styles.bodyContainer}>
        <div className={styles.headerContainer}>
          <h1 className={styles.title}>{title}</h1>
          <h1 className={styles.subtitle}>Crear {title}</h1>
        </div>

        <div className={styles.contentContainer}>
          {!isFieldsArray ? (
            <div className={styles.notFound}>Not Found</div>
          ) : (
            <form className={styles.formContainer} onSubmit={handleSubmit}>
              {fields.map((field, index) => (
                <div key={index} className={styles.fieldGroup}>
                  <label htmlFor={field.name} className={styles.label}>
                    {field.label}
                  </label>
                  {field.type === "select" ? (
                    <select
                      name={field.name}
                      id={field.name}
                      value={formData[field.name] || ""}
                      onChange={handleChange}
                      className={styles.input}
                      required
                    >
                      <option value="" disabled hidden>
                        Selecciona una opción
                      </option>
                      {field.options &&
                        field.options.map((option, idx) => (
                          <option key={idx} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                    </select>
                  ) : field.type === "textarea" ? (
                    <textarea
                      name={field.name}
                      id={field.name}
                      value={formData[field.name] || ""}
                      onChange={handleChange}
                      className={`${styles.input} ${styles.textarea}`} // Añadir clase específica si es necesario
                      ref={(el) => (textAreaRefs.current[field.name] = el)}
                      rows={1}
                      required
                    />
                  ) : (
                    <input
                      type={field.type}
                      name={field.name}
                      id={field.name}
                      value={formData[field.name] || ""}
                      onChange={handleChange}
                      className={styles.input}
                      required
                    />
                  )}

                  {/* Mostrar los errores si existen */}
                  {errors && errors[field.name] && (
                    <span className={styles.errorMessage}>
                      {errors[field.name]}
                    </span>
                  )}
                </div>
              ))}
              <div className={styles.buttonContainer}>
                <button type="submit" className={styles.submitButton}>
                  Confirmar
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Create;
