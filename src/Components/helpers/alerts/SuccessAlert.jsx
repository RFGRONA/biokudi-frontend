import { useRef } from "react";
import Swal from "sweetalert2";

const Success = ({ message, onClose }) => {
  const hasShownRef = useRef(false);

  if (!hasShownRef.current) {
    hasShownRef.current = true;
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
  }

  return null;
};

export default Success;
