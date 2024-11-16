import React, { useState, useEffect } from "react";
import styles from "./Read.module.css";
import choose from "../../assets/CRUD/choose.svg";
import order from "../../assets/CRUD/order.svg";
import report from "../../assets/CRUD/report.svg";
import create from "../../assets/CRUD/create.svg";
import details from "../../assets/CRUD/details.svg";
import edit from "../../assets/CRUD/edit.svg";
import drop from "../../assets/CRUD/drop.svg";
import Loading from "../helpers/loading/Loading";
import ErrorAlert from "../helpers/alerts/ErrorAlert";
import { deletePlaceApi } from "../../services/apiModel/PlaceApi";
import { deleteActivityApi } from "../../services/apiModel/ActivityApi";
import { deleteStateApi } from "../../services/apiModel/StateApi";
import { deletePictureApi } from "../../services/apiModel/pictureApi";
import { useAuth } from "../../context/AuthContext";
import { deleteUserApi } from "../../services/apiModel/UserApi";
import Decision from "../helpers/alerts/DecisionAlert";
import { deleteRoleApi } from "../../services/apiModel/RoleApi";
import {
  deleteReviewApi,
  deleteReviewByAdminApi,
} from "../../services/apiModel/ReviewApi";
import Success from "../helpers/alerts/SuccessAlert";
import { useNavigate } from "react-router-dom";
import {
  deleteTicketApi,
  scaleTicketApi,
} from "../../services/apiModel/TicketApi";
import scale from "../../assets/CRUD/scale.svg";
import { deleteCityApi } from "../../services/apiModel/CityApi";
import { deleteDepartmentApi } from "../../services/apiModel/DepartmentApi";
import { deleteTypeApi } from "../../services/apiModel/TypeApi";
import { deleteReviewMapping } from "../../utils/mapping/deleteReviewMapping";
import {
  ValidateDeleteReviewField,
  ValidateDeleteReviewForm,
} from "../../utils/validate/ValidateDeleteReview";
import Modal from "./Modal";
import { getPlaceOrderAttributes } from "../../utils/filterData/PlaceFilter";
import { sortPlaces } from "../../utils/filterData/PlaceFilter";
import {
  getActivityOrderAttributes,
  sortActivities,
} from "../../utils/filterData/ActivityFilter";
import {
  getStateOrderAttributes,
  sortStates,
} from "../../utils/filterData/StateFilter";
import {
  getUserOrderAttributes,
  sortUsers,
} from "../../utils/filterData/UserFilter";
import {
  getRoleOrderAttributes,
  sortRoles,
} from "../../utils/filterData/RoleFilter";
import {
  getPictureOrderAttributes,
  sortPictures,
} from "../../utils/filterData/PictureFilter";
import {
  getCityOrderAttributes,
  sortCities,
} from "../../utils/filterData/CityFilter";
import {
  getDepartmentOrderAttributes,
  sortDepartments,
} from "../../utils/filterData/DepartmentFilter";
import {
  getTypeOrderAttributes,
  sortTypes,
} from "../../utils/filterData/TypeFilter";
import {
  getReviewOrderAttributes,
  sortReviews,
} from "../../utils/filterData/ReviewFilter";
import {
  getTicketOrderAttributes,
  sortTickets,
} from "../../utils/filterData/TicketFilter";

const Read = ({ title, subtitle, data, onEdit, onCreate }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [decisionData, setDecisionData] = useState(null);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [dataState, setDataState] = useState(data);
  const navigate = useNavigate();
  const { user } = useAuth();
  const [showDeleteReviewModal, setShowDeleteReviewModal] = useState(false);
  const [deleteReviewFormData, setDeleteReviewFormData] = useState({});
  const [deleteReviewFormErrors, setDeleteReviewFormErrors] = useState({});
  const [deleteReviewMappingData, setDeleteReviewMappingData] = useState(null);
  const [reviewToDelete, setReviewToDelete] = useState(null);
  const [showOrderMenu, setShowOrderMenu] = useState(false);

  useEffect(() => {
    setDataState(data);
  }, [data]);

  const numColumns = subtitle.length + 1;
  const gridTemplateColumns = `repeat(${numColumns}, 1fr)`;

  if (!Array.isArray(data)) {
    return <ErrorAlert message={`Error al obtener ${title}`} redirect={""} />;
  }
  if (data.length === 0) {
    return <Loading />;
  }

  const goToReport = () => {
    navigate(`/${reportView[title]}`);
  };

  const apiMap = {
    Lugares: deletePlaceApi,
    Actividades: deleteActivityApi,
    Estados: deleteStateApi,
    Usuarios: deleteUserApi,
    Imagenes: deletePictureApi,
    Roles: deleteRoleApi,
    Reseñas: deleteReviewApi,
    Tickets: deleteTicketApi,
    Ciudades: deleteCityApi,
    Departamentos: deleteDepartmentApi,
    Tipos: deleteTypeApi,
    // Agrega aquí más títulos con sus respectivas funciones
  };

  const orderAttributes = {
    Lugares: getPlaceOrderAttributes,
    Actividades: getActivityOrderAttributes,
    Estados: getStateOrderAttributes,
    Usuarios: getUserOrderAttributes,
    Roles: getRoleOrderAttributes,
    Imagenes: getPictureOrderAttributes,
    Ciudades: getCityOrderAttributes,
    Departamentos: getDepartmentOrderAttributes,
    Tipos: getTypeOrderAttributes,
    Reseñas: getReviewOrderAttributes,
    Tickets: getTicketOrderAttributes,
  };

  const reportView = {
    Lugares: "reportPlace",
    Actividades: "reportActivity",
    Estados: "reportState",
    Usuarios: "reportUser",
    Imagenes: "reportPicture",
    Roles: "reportRole",
    Reseñas: "reportReview",
    Tickets: "reportTicket",
    Ciudades: "reportCity",
    Departamentos: "reportDepartment",
    Tipos: "reportType",
    // Agrega aquí más títulos con sus respectivas funciones
  };

  const singular = {
    Lugares: "Lugar",
    Actividades: "Actividad",
    Estados: "Estado",
    Usuarios: "Usuario",
    Imagenes: "Imagen",
    Roles: "Rol",
    Reseñas: "Reseña",
    Tickets: "Ticket",
    Ciudades: "Ciudad",
    Departamentos: "Departamento",
    Tipos: "Tipo",
    // Agrega aquí más títulos con sus respectivas funciones
  };

  const redirect = {
    Lugares: "places",
    Actividades: "activities",
    Estados: "states",
    Usuarios: "users",
    Imagenes: "pictures",
    Roles: "roles",
    Reseñas: "reviews",
    Tickets: "tickets",
    Ciudades: "cities",
    Departamentos: "departments",
    Tipos: "types",
    // Agrega aquí más títulos con sus respectivas funciones
  };

  const sortFunctions = {
    Lugares: sortPlaces,
    Actividades: sortActivities,
    Estados: sortStates,
    Usuarios: sortUsers,
    Roles: sortRoles,
    Imagenes: sortPictures,
    Ciudades: sortCities,
    Departamentos: sortDepartments,
    Tipos: sortTypes,
    Reseñas: sortReviews,
    Tickets: sortTickets,
  };

  /*Filter action */
  const handleOrder = (attribute) => {
    setLoading(true);
    try {
      const sortFunction = sortFunctions[title];
      if (!sortFunction) {
        throw new Error(
          `No se encontró una función de ordenamiento para ${title}`
        );
      }
      const sortedData = sortFunction(dataState, attribute, subtitle);
      setDataState(sortedData);
      setAlertMessage(`Datos ordenados por ${attribute} correctamente`);
      setLoading(false);
      setShowSuccessAlert(true);
      setShowOrderMenu(false);
    } catch (error) {
      console.error("Error sorting:", error);
      setAlertMessage(`Error al ordenar por ${attribute}`);
      setLoading(false);
      setError(true);
    }
  };

  /*Scale Action (FOR TICKET)*/
  const onScale = async (index) => {
    setLoading(true);
    try {
      const response = await scaleTicketApi(index);
      if (response.status === 200) {
        console.log("Scaled successfully");
        setAlertMessage(`Ticket escalado correctamente`);
        setLoading(false);
        setShowSuccessAlert(true);
      } else {
        throw new Error("Error al escalar");
      }
    } catch (error) {
      console.error("Error scaling:", error);
      setAlertMessage(`Error al escalar Ticket`);
      setLoading(false);
      setError(true);
    }
  };

  /* Delete Action */
  const onDelete = async (index) => {
    if (title === "Reseñas") {
      setReviewToDelete(index);
      setShowDeleteReviewModal(true);
      // Cargar mapeo y datos iniciales
      deleteReviewMapping(index).then((mapping) => {
        if (mapping.error) {
          console.error(mapping.message);
          setAlertMessage(mapping.message);
          setError(true);
          return;
        }
        setDeleteReviewMappingData(mapping);
        // Inicializar datos del formulario
        const initialFormData = {};
        mapping.fields.forEach((field) => {
          initialFormData[field.name] = field.defaultValue || "";
        });
        setDeleteReviewFormData(initialFormData);
        setDeleteReviewFormErrors({});
      });
    } else {
      const deleteApi = apiMap[title];
      try {
        if (!deleteApi) {
          console.error("No se encontró una API para el título proporcionado");
          throw new Error("Error al eliminar");
        }
        setLoading(true);
        const response = await deleteApi(index);
        if (response.status === 200) {
          console.log("Deleted successfully");
          // Actualizar datos locales
          const updatedData = dataState.filter((row) => row[0] !== index);
          setDataState(updatedData);
          setAlertMessage(`${singular[title]} eliminado correctamente`);
          setLoading(false);
          setShowSuccessAlert(true); // Muestra el mensaje de éxito
        } else {
          throw new Error("Error al eliminar");
        }
      } catch (error) {
        console.error("Error deleting:", error);
        setAlertMessage(`Error al eliminar ${singular[title]}`);
        setLoading(false);
        setError(true);
      }
    }
  };

  const handleDeleteReviewInputChange = (fieldName, value) => {
    setDeleteReviewFormData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));

    // Validar campo
    const fieldErrors = ValidateDeleteReviewField(fieldName, value);
    setDeleteReviewFormErrors((prevErrors) => ({
      ...prevErrors,
      ...fieldErrors,
    }));
  };

  const handleDeleteReviewSubmit = async () => {
    const errors = ValidateDeleteReviewForm(deleteReviewFormData);
    if (Object.keys(errors).some((key) => errors[key])) {
      setDeleteReviewFormErrors(errors);
      return;
    }

    try {
      setLoading(true);
      console.log("Deleting review:", reviewToDelete);
      console.log("Data:", deleteReviewFormData);
      const response = await deleteReviewByAdminApi(
        reviewToDelete,
        deleteReviewFormData
      );
      if (response.status === 200) {
        console.log("Deleted successfully");
        // Actualizar datos locales
        const updatedData = dataState.filter(
          (row) => row[0] !== reviewToDelete
        );
        setDataState(updatedData);
        setAlertMessage(`${singular[title]} eliminado correctamente`);
        setLoading(false);
        setShowSuccessAlert(true); // Muestra el mensaje de éxito
        setShowDeleteReviewModal(false);
      } else {
        throw new Error("Error al eliminar");
      }
    } catch (error) {
      console.error("Error deleting:", error);
      setAlertMessage(`Error al eliminar ${singular[title]}`);
      setLoading(false);
      setError(true);
    }
  };

  return (
    <div className={"mainContainer"}>
      {loading ? (
        <Loading />
      ) : error ? (
        <ErrorAlert message={alertMessage} reload={true} />
      ) : (
        <>
          {decisionData && (
            <Decision
              title1="¿Está seguro?"
              message={`${singular[
                title
              ].toLowerCase()} será eliminado permanentemente`}
              cancelText="Cancelar"
              onConfirm={() => {
                onDelete(decisionData);
                setDecisionData(null);
              }}
              onCancel={() => setDecisionData(null)}
            />
          )}
          {showSuccessAlert && (
            <Success
              message={alertMessage}
              onClose={() => setShowSuccessAlert(false)}
            />
          )}

          {/* Modal for review */}
          {showDeleteReviewModal && deleteReviewMappingData && (
            <Modal
              title={deleteReviewMappingData.title}
              onClose={() => setShowDeleteReviewModal(false)}
              onSubmit={handleDeleteReviewSubmit}
            >
              <form className={styles.modalForm}>
                {deleteReviewMappingData.fields.map((field) => (
                  <div key={field.name} className={styles.fieldContainer}>
                    <label htmlFor={field.name} className={styles.fieldLabel}>
                      {field.label}
                    </label>
                    {field.type === "text" ? (
                      <input
                        type="text"
                        id={field.name}
                        name={field.name}
                        className={styles.fieldInput}
                        value={deleteReviewFormData[field.name] || ""}
                        maxLength={field.maxLength}
                        onChange={(e) =>
                          handleDeleteReviewInputChange(
                            field.name,
                            e.target.value
                          )
                        }
                        disabled={field.blocked}
                      />
                    ) : field.type === "textarea" ? (
                      <textarea
                        id={field.name}
                        name={field.name}
                        className={styles.fieldTextarea}
                        value={deleteReviewFormData[field.name] || ""}
                        maxLength={field.maxLength}
                        onChange={(e) =>
                          handleDeleteReviewInputChange(
                            field.name,
                            e.target.value
                          )
                        }
                        disabled={field.blocked}
                      />
                    ) : null}
                    {deleteReviewFormErrors[field.name] && (
                      <span className={styles.error}>
                        {deleteReviewFormErrors[field.name]}
                      </span>
                    )}
                  </div>
                ))}
              </form>
            </Modal>
          )}

          <div className={styles.bodyContainer}>
            <div className={styles.titleContainer}>
              <h1 className={styles.title}>{title}</h1>
              <div className={styles.buttonActions}>
                <div
                  className={styles.buttonOrd}
                  onClick={() => setShowOrderMenu(!showOrderMenu)}
                >
                  Ordenar
                  <img src={order} alt="Ordenar" />
                  {showOrderMenu && (
                    <div className={styles.orderMenu}>
                      {orderAttributes[title]().map((attribute) => (
                        <div
                          key={attribute}
                          className={styles.orderMenuItem}
                          onClick={() => handleOrder(attribute)}
                        >
                          {attribute}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                {title !== "Usuarios" ? (
                  <div className={styles.buttonRep} onClick={goToReport}>
                    Generar Reporte
                    <img src={report} alt="Reporte" />
                  </div>
                ) : (
                  ""
                )}
                {(title !== "Actividades" || user.role !== "Editor") &&
                title !== "Usuarios" &&
                title !== "Tickets" &&
                title !== "Imagenes" &&
                title !== "Reseñas" ? (
                  <div className={styles.buttonCreate} onClick={onCreate}>
                    Crear {singular[title]}
                    <img src={create} alt="Crear" />
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>

            <div
              className={styles.gridContainer}
              style={{ gridTemplateColumns }}
            >
              {/* Headers */}
              {subtitle.map((sub, index) => (
                <div key={`header-${index}`} className={styles.gridHeaderCell}>
                  {sub}
                </div>
              ))}
              <div className={styles.gridHeaderCell}>Acciones</div>

              {/* Filas de datos */}
              {dataState.map((row, rowIndex) => {
                const index = row[0];
                return (
                  <React.Fragment key={`row-${rowIndex}`}>
                    {row.map((cell, cellIndex) => (
                      <div
                        key={`cell-${rowIndex}-${cellIndex}`}
                        className={`${styles.gridCell} ${
                          rowIndex % 2 === 0 ? styles.evenRow : styles.oddRow
                        }`}
                      >
                        {cell}
                      </div>
                    ))}
                    <div
                      className={`${styles.gridCell} ${styles.actions} ${
                        rowIndex % 2 === 0 ? styles.evenRow : styles.oddRow
                      }`}
                    >
                      {title === "Tickets" ? (
                        <button onClick={() => onScale(index)}>
                          <img src={scale} alt="Scale" />
                        </button>
                      ) : (
                        ""
                      )}

                      {/* DETAILS BUTTON */}
                      {/* {title !== "Actividades" &&
                      title !== "Estados" &&
                      title !== "Usuarios" &&
                      title !== "Imagenes" &&
                      title !== "Roles" &&
                      title !== "Tickets" &&
                      title !== "Ciudades" &&
                      title !== "Departamentos" &&
                      title !== "Tipos" &&
                      title !== "Reseñas" ? (
                        <button>
                          <img src={details} alt="details" />
                        </button>
                      ) : (
                        ""
                      )} */}

                      {(title === "Actividades" && user.role !== "Editor") ||
                      (title !== "Imagenes" &&
                        title !== "Reseñas" &&
                        title !== "Actividades") ? (
                        <button onClick={() => onEdit(index)}>
                          <img src={edit} alt="edit" />
                        </button>
                      ) : (
                        ""
                      )}
                      <button onClick={() => onDelete(index)}>
                        <img src={drop} alt="drop" />
                      </button>
                    </div>
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Read;
