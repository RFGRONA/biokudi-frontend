import React, { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Error = ({ message, redirect }) => {
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
        navigate(`/${redirect}`);
      }
    });
  }, []);

  return null; // Este componente no necesita renderizar nada
};

export default Error;
