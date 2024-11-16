export const ValidateRegister = (input) => {
  const errors = {};

  /** Email Validation */
  if (!input.email) {
    errors.email = "Correo es requerido";
  } else if (!/\S+@\S+\.\S+/.test(input.email)) {
    errors.email = "Correo no válido";
  }

  return errors;
};

export const validateChangePasswordForm = (values) => {
  const errors = {};

  // Current Password
  if (!values.currentPassword) {
    errors.currentPassword = "La contraseña actual es requerida.";
  } else if (values.currentPassword.length < 6) {
    errors.currentPassword =
      "La contraseña actual debe tener al menos 6 caracteres.";
  }

  // New Password
  if (!values.newPassword) {
    errors.newPassword = "La nueva contraseña es requerida.";
  } else if (values.newPassword.length < 8) {
    errors.newPassword =
      "La nueva contraseña debe tener al menos 8 caracteres.";
  } else if (!/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).*$/.test(values.newPassword)) {
    errors.newPassword =
      "La nueva contraseña debe incluir mayúsculas, minúsculas y números.";
  } else if (values.newPassword === values.currentPassword) {
    errors.newPassword = "La nueva contraseña debe ser diferente a la actual.";
  } else if (values.newPassword.length > 50) {
    errors.newPassword =
      "La nueva contraseña debe tener menos de 50 caracteres.";
  }

  // Confirm New Password
  if (!values.confirmNewPassword) {
    errors.confirmNewPassword = "Por favor, confirma tu nueva contraseña.";
  } else if (values.newPassword !== values.confirmNewPassword) {
    errors.confirmNewPassword = "Las contraseñas no coinciden.";
  }

  return errors;
};

export const validateField = (name, value, values) => {
  const errors = {};

  switch (name) {
    case "currentPassword":
      if (!value) {
        errors.currentPassword = "La contraseña actual es requerida.";
      } else if (value.length < 6) {
        errors.currentPassword =
          "La contraseña actual debe tener al menos 6 caracteres.";
      }
      break;

    case "newPassword":
      if (!value) {
        errors.newPassword = "La nueva contraseña es requerida.";
      } else if (value.length < 8) {
        errors.newPassword =
          "La nueva contraseña debe tener al menos 8 caracteres.";
      } else if (!/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).*$/.test(value)) {
        errors.newPassword =
          "La nueva contraseña debe incluir mayúsculas, minúsculas y números.";
      } else if (value === values.currentPassword) {
        errors.newPassword =
          "La nueva contraseña debe ser diferente a la actual.";
      } else if (value.length > 50) {
        errors.newPassword =
          "La nueva contraseña debe tener menos de 50 caracteres.";
      }

      // Re-validate confirmNewPassword field
      if (values.confirmNewPassword && value !== values.confirmNewPassword) {
        errors.confirmNewPassword = "Las contraseñas no coinciden.";
      } else {
        errors.confirmNewPassword = "";
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

export const validateResetPasswordForm = (values) => {
  const errors = {};

  if (!values.newPassword) {
    errors.newPassword = "La nueva contraseña es requerida.";
  } else if (values.newPassword.length < 8) {
    errors.newPassword =
      "La nueva contraseña debe tener al menos 8 caracteres.";
  } else if (!/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).*$/.test(values.newPassword)) {
    errors.newPassword =
      "La nueva contraseña debe incluir mayúsculas, minúsculas y números.";
  } else if (values.newPassword.length > 50) {
    errors.newPassword =
      "La nueva contraseña debe tener menos de 50 caracteres.";
  }

  if (!values.confirmNewPassword) {
    errors.confirmNewPassword = "Por favor, confirma tu nueva contraseña.";
  } else if (values.newPassword !== values.confirmNewPassword) {
    errors.confirmNewPassword = "Las contraseñas no coinciden.";
  }

  return errors;
};
