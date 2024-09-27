import React, { useState, useEffect, useRef } from "react";
import styles from "./Create.module.css";

const Create = ({ title, fields, onSubmit }) => {
  // Inicializar el estado
  const [formData, setFormData] = useState(
    fields.reduce((acc, field) => {
      acc[field.name] = field.defaultValue || "";
      return acc;
    }, {})
  );

  // Refs para los textareas
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

    // Ajustar la altura si es un textarea
    const field = fields.find((f) => f.name === name);
    if (field && field.type === "textarea") {
      adjustTextareaHeight(name);
    }
  };

  // Manejador de envío
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(formData);
    }
  };

  // Ajustar altura inicial de los textareas cuando el componente se monta
  useEffect(() => {
    fields.forEach((field) => {
      if (field.type === "textarea") {
        adjustTextareaHeight(field.name);
      }
    });
  }, [fields]);

  return (
    <div className={"mainContainer"}>
      <div className={styles.bodyContainer}>
        <div className={styles.headerContainer}>
          <h1 className={styles.title}>{title}</h1>
          <h1 className={styles.subtitle}>Crear {title}</h1>
        </div>
        <div className={styles.contentContainer}>
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
                    value={formData[field.name]}
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
                    value={formData[field.name]}
                    onChange={handleChange}
                    className={`${styles.input} ${styles.textarea}`} // Añadir clase específica si es necesario
                    ref={(el) => (textAreaRefs.current[field.name] = el)}
                    rows={1} // Empezar con una sola fila
                    required
                  />
                ) : (
                  <input
                    type={field.type}
                    name={field.name}
                    id={field.name}
                    value={formData[field.name]}
                    onChange={handleChange}
                    className={styles.input}
                    required
                  />
                )}
              </div>
            ))}
            <div className={styles.buttonContainer}>
              <button type="submit" className={styles.submitButton}>
                Confirmar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Create;
