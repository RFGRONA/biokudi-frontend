import React, { useState, useEffect, useRef } from "react";
import styles from "./Edit.module.css";

const Create = ({ title, fields, onSubmit, errors, initialFormData }) => {
  const isFieldsArray = Array.isArray(fields);

  // Inicializamos el formulario con los valores iniciales si existen
  const [formData, setFormData] = useState(
    initialFormData || {} // Si no hay datos, inicializa como un objeto vacío
  );

  useEffect(() => {
    if (initialFormData) {
      setFormData(initialFormData);
    }
  }, [initialFormData]);

  // TextAreas refs
  const textAreaRefs = useRef({});

  // area function
  const adjustTextareaHeight = (name) => {
    const textarea = textAreaRefs.current[name];
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
    if (isFieldsArray) {
      const field = fields.find((f) => f.name === name);
      if (field && field.type === "textarea") {
        adjustTextareaHeight(name);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(formData);
    }
  };

  return (
    <div className={"mainContainer"}>
      <div className={styles.bodyContainer}>
        <div className={styles.headerContainer}>
          <h1 className={styles.title}>{title}</h1>
          <h1 className={styles.subtitle}>Editar {title}</h1>
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
                      value={formData[field.name] || ""} // Aquí se asegura que use formData
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
                      className={`${styles.input} ${styles.textarea}`}
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

                  {/* Show errors */}
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
