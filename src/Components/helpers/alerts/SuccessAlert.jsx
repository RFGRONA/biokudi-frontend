import React from 'react';
import Swal from 'sweetalert2';

const Success = ({message}) => {
  React.useEffect(() => {
    Swal.fire({
      title: "¡Exito!",
      text: message,
      icon: "success",
      confirmButtonText: 'OK',
    });
  });

  return null;
};

export default Success;
