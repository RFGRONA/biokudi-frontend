import React from 'react'
import Swal from 'sweetalert2';

const Decision = ({title1, message, cancelText}) => {
    React.useEffect(() => {
        Swal.fire({
            title: title1,
            icon: "warning",
            showCancelButton: true ,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si",
            cancelButtonText: cancelText
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire({
                title: "¡Éxito!",
                text: message,
                icon: "success"
              });
            }
          });
      });
    
      return null;
}

export default Decision