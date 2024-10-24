import React from "react";
import Swal from "sweetalert2";

const Success = ({ message, onClose }) => {
  React.useEffect(() => {
    Swal.fire({
      title: "¡Éxito!",
      text: message,
      icon: "success",
      confirmButtonText: "OK",
    }).then(() => {
      if (onClose) {
        onClose();
      }
    });
  }, [message, onClose]);

  return null;
};

export default Success;
