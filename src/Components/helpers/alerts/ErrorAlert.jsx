import React from 'react';
import Swal from 'sweetalert2';

const Error = ({message}) => {
  React.useEffect(() => {
    Swal.fire({
      title: "¡Algo pasó!",
      text: message,
      icon: "error",
      confirmButtonText: 'OK',
    });
  });

  return null;
};

export default Error;
