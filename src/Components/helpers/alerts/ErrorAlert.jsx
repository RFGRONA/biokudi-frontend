import React from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const ErrorAlert = ({ message, redirect, reload, onClose }) => {
  const navigate = useNavigate();

  React.useEffect(() => {
    Swal.fire({
      title: "¡Algo pasó!",
      text: message,
      icon: "error",
      confirmButtonText: "OK",
    }).then((result) => {
      if (onClose) {
        onClose();
      }
      if (result.isConfirmed) {
        if (redirect !== undefined) {
          navigate(`/${redirect}`);
        } else if (reload) {
          window.location.reload();
        } else {
        }
      }
    });
  }, [message, redirect, reload, navigate]);

  return null;
};

export default ErrorAlert;
