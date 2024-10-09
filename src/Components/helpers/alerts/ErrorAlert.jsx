import React, { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const ErrorAlert = ({ message, redirect, reload }) => {
  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    Swal.fire({
      title: "¡Algo pasó!",
      text: message,
      icon: "error",
      confirmButtonText: "OK",
    }).then((result) => {
      if (result.isConfirmed) {
        if (reload) {
          window.location.reload();
          return;
        } else if (redirect === undefined) {
          navigate(`/${redirect}`);
        }
      }
    });
  }, [message, redirect, navigate]);

  return null; // Este componente no necesita renderizar nada
};

export default ErrorAlert;
