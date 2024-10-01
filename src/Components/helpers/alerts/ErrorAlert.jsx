import React from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const Error = ({ message }) => {
  const navigate = useNavigate();
  const location = useLocation();
  React.useEffect(() => {
    Swal.fire({
      title: "¡Algo pasó!",
      text: message,
      icon: "error",
      confirmButtonText: "OK",
    });
  });

  return navigate("/");
};

export default Error;
