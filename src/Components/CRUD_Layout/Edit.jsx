import React, { useState, useEffect, useRef } from "react";
import styles from "./Edit.module.css";
import Loading from "../helpers/loading/Loading";
import { convertToBase64Service } from "../../utils/convert/convertToBase64";

const Edit = ({ title, fields, onSubmit, errors, formData, onFieldChange }) => {
  const [localLoading, setLocalLoading] = useState(false);
  const [fileNames, setFileNames] = useState({});
  const isFieldsArray = Array.isArray(fields);

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

  /* Efecto de carga */
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalLoading(true);
    const cleanedFormData = Object.keys(formData).reduce((acc, key) => {
      acc[key] = formData[key] !== "" ? formData[key] : null;
      return acc;
    }, {});
    if (onSubmit) {
      try {
        await onSubmit(cleanedFormData);
      } catch (error) {
        console.error("Error durante el envío del formulario:", error);
      }
    }
    setLocalLoading(false);
  };

  /* Manejar arrastrar y soltar de fotos */
  const handleDrop = async (e, fieldName) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && fieldName) {
      try {
        const base64 = await convertToBase64Service(file);

        // Crear un evento simulado para pasar a onFieldChange
        const simulatedEvent = {
          target: {
            name: fieldName,
            value: base64,
          },
        };

        if (onFieldChange) {
          onFieldChange(simulatedEvent);
        }

        setFileNames((prevFileNames) => ({
          ...prevFileNames,
          [fieldName]: file.name,
        }));
      } catch (error) {
        console.error("Error al convertir el archivo a Base64:", error);
      }
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  /* Manejar cambio de archivo */
  const handleFileChange = async (e, fieldName) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const base64 = await convertToBase64Service(file);

        // Crear un evento simulado para pasar a onFieldChange
        const simulatedEvent = {
          target: {
            name: fieldName,
            value: base64,
          },
        };

        if (onFieldChange) {
          onFieldChange(simulatedEvent);
        }

        setFileNames((prevFileNames) => ({
          ...prevFileNames,
          [fieldName]: file.name,
        }));
      } catch (error) {
        console.error("Error al convertir el archivo a Base64:", error);
      }
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

                  {field.type === "file" ? (
                    <div
                      className={styles.fileInputContainer}
                      onDrop={(e) => handleDrop(e, field.name)}
                      onDragOver={handleDragOver}
                    >
                      <input
                        type="file"
                        name={field.name}
                        id={field.name}
                        accept={field.accept}
                        onChange={(e) => handleFileChange(e, field.name)}
                        className={styles.fileInput}
                        ref={(el) => (fileInputRefs.current[field.name] = el)}
                        required={field.required}
                      />
                      <label
                        htmlFor={field.name}
                        className={styles.fileInputLabel}
                      >
                        {fileNames[field.name] ? (
                          <span className={styles.infoFile}>
                            Imagen subida: {fileNames[field.name]}
                          </span>
                        ) : (
                          "Arrastra y suelta una imagen aquí, o haz clic para seleccionar una."
                        )}
                      </label>
                    </div>
                  ) : field.type === "select" ? (
                    <select
                      name={field.name}
                      id={field.name}
                      value={formData[field.name] || (field.multiple ? [] : "")}
                      onChange={handleChange}
                      className={styles.input}
                      required={field.required}
                      multiple={field.multiple}
                    >
                      {!field.multiple && (
                        <option value="" disabled hidden>
                          Selecciona una opción
                        </option>
                      )}
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
                      required={field.required}
                      ref={(el) => (textAreaRefs.current[field.name] = el)}
                    />
                  ) : (
                    <input
                      type={field.type}
                      name={field.name}
                      id={field.name}
                      value={formData[field.name] || ""}
                      onChange={handleChange}
                      className={styles.input}
                      required={field.required}
                    />
                  )}

                  {errors && errors[field.name] && (
                    <span className={styles.errorMessage}>
                      {errors[field.name]}
                    </span>
                  )}
                </div>
              ))}
              {errors && errors.general && (
                <span className={styles.errorMessage}>{errors.general}</span>
              )}
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

export default Edit;
