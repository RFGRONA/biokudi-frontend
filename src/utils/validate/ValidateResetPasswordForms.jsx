// ValidateResetPasswordForm.js
export const validateResetPasswordForm = (values) => {
  const errors = {};

  // Email Validation
  if (!values.email) {
    errors.email = "El correo electrónico es requerido.";
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = "Correo electrónico no válido.";
  }

  // Token Validation
  if (!values.token) {
    errors.token = "El token es requerido.";
  } else if (values.token.length < 6) {
    errors.token = "El token debe tener 6 caracteres.";
  }

  // New Password Validation
  if (!values.newPassword) {
    errors.newPassword = "La nueva contraseña es requerida.";
  } else if (values.newPassword.length < 8) {
    errors.newPassword = "Debe tener al menos 8 caracteres.";
  } else if (!/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).*$/.test(values.newPassword)) {
    errors.newPassword = "Debe incluir mayúsculas, minúsculas y números.";
  } else if (values.length > 50) {
    errors.newPassword = "Contraseña debe tener menos de 50 caracteres";
  }

  // Confirm New Password Validation
  if (!values.confirmNewPassword) {
    errors.confirmNewPassword = "Por favor, confirma tu nueva contraseña.";
  } else if (values.newPassword !== values.confirmNewPassword) {
    errors.confirmNewPassword = "Las contraseñas no coinciden.";
  }

  return errors;
};

export const validateResetPasswordField = (name, value, values) => {
  const errors = {};

  switch (name) {
    case "email":
      if (!value) {
        errors.email = "El correo electrónico es requerido.";
      } else if (!/\S+@\S+\.\S+/.test(value)) {
        errors.email = "Correo electrónico no válido.";
      }
      break;

    case "token":
      if (!value) {
        errors.token = "El token es requerido.";
      } else if (value.length < 6) {
        errors.token = "El token debe tener 6 caracteres.";
      }
      break;

    case "newPassword":
      if (!value) {
        errors.newPassword = "La nueva contraseña es requerida.";
      } else if (value.length < 8) {
        errors.newPassword = "Debe tener al menos 8 caracteres.";
      } else if (!/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).*$/.test(value)) {
        errors.newPassword = "Debe incluir mayúsculas, minúsculas y números.";
      } else if (values.length > 50) {
        errors.newPassword = "Contraseña debe tener menos de 50 caracteres";
      }

      // Re-validate confirmNewPassword
      if (values.confirmNewPassword && value !== values.confirmNewPassword) {
        errors.confirmNewPassword = "Las contraseñas no coinciden.";
      } else {
        delete errors.confirmNewPassword;
      }
      break;

    case "confirmNewPassword":
      if (!value) {
        errors.confirmNewPassword = "Por favor, confirma tu nueva contraseña.";
      } else if (value !== values.newPassword) {
        errors.confirmNewPassword = "Las contraseñas no coinciden.";
      }
      break;

    default:
      break;
  }

  return errors;
};
