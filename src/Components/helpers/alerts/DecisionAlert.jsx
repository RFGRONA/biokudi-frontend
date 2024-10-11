import React from "react";
import Swal from "sweetalert2";

const Decision = ({ title1, message, cancelText, onConfirm, onCancel }) => {
  React.useEffect(() => {
    Swal.fire({
      title: title1,
      text: message,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si",
      cancelButtonText: cancelText,
    }).then((result) => {
      if (result.isConfirmed) {
        onConfirm();
      } else if (onCancel) {
        onCancel();
      }
    });
  }, [title1, message, cancelText, onConfirm, onCancel]);
  return null;
};

export default Decision;
