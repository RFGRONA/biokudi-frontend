import React, { useState, useEffect, useRef } from "react";
import styles from "./Create.module.css";
import { useAuth } from "../../context/AuthContext";
import Loading from "../helpers/loading/Loading";
import { convertToBase64Service } from "../../utils/convert/convertToBase64";

const Create = ({ title, fields, onSubmit, errors }) => {
  const { loading, setLoading } = useAuth();
  const [fileNames, setFileNames] = useState({});
  const isFieldsArray = Array.isArray(fields);

  const [formData, setFormData] = useState({});

  const textAreaRefs = useRef({});
  const fileInputRefs = useRef({});

  const adjustTextareaHeight = (name) => {
    const textarea = textAreaRefs.current[name];
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  /*Handle field change */
  const handleChange = (e) => {
    const { name, value, type, options } = e.target;
    if (type === "select-multiple") {
      const selectedOptions = Array.from(options)
        .filter((option) => option.selected)
        .map((option) => ({ idActivity: parseInt(option.value) }));
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: selectedOptions,
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
    if (isFieldsArray) {
      const field = fields.find((f) => f.name === name);
      if (field && field.type === "textarea") {
        adjustTextareaHeight(name);
      }
    }
  };

  /*Submit */
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(formData);
    }
  };

  /*Hanlde photo drop */
  const handleDrop = async (e, fieldName) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && fieldName) {
      try {
        const base64 = await convertToBase64Service(file);
        setFormData((prevFormData) => ({
          ...prevFormData,
          [fieldName]: base64,
        }));
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

  /*File Change */
  const handleFileChange = async (e, fieldName) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const base64 = await convertToBase64Service(file);
        setFormData((prevFormData) => ({
          ...prevFormData,
          [fieldName]: base64,
        }));
        setFileNames((prevFileNames) => ({
          ...prevFileNames,
          [fieldName]: file.name,
        }));
      } catch (error) {
        console.error("Error al convertir el archivo a Base64:", error);
      }
    }
  };

  if (!fields.length > 0) {
    setLoading(true);
  } else {
    setLoading(false);
  }

  if (loading) {
    return <Loading />;
  }

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
                        {fileNames[field.name]
                          ? `Imagen subida: ${fileNames[field.name]}`
                          : "Arrastra y suelta una imagen aquí, o haz clic para seleccionar una."}
                      </label>
                    </div>
                  ) : field.type === "select" ? (
                    <select
                      name={field.name}
                      id={field.name}
                      value={
                        field.multiple
                          ? formData[field.name]?.map((item) =>
                              item.idActivity.toString()
                            ) || []
                          : formData[field.name] || ""
                      }
                      onChange={handleChange}
                      className={styles.input}
                      required
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

export default Create;
