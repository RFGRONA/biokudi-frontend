export const ValidateRegister = (input) => {
  const errors = {
    name: {},
    email: {},
    password: {},
    confirmPassword: {},
  }

  /**Name */
  if (!input.name) {
    errors.name.required = "Nombre es requerido";
  } else if (input.name.length < 3) {
    errors.name.length = "Nombre debe tener al menos 3 caracteres";
  }
  if(input.name.length > 63) {
    errors.name.length = "Nombre debe tener menos de 63 caracteres";
  }
  if (!/^[a-zA-Z ]+$/.test(input.name)) {
    errors.name.invalid = "Nombre debe contener solo letras";
  }

  /**Email */
  if (!input.email) {
    errors.email.required = "Correo es requerido";
  } else if (!/\S+@\S+\.\S+/.test(input.email)) {
    errors.email.invalid = "Correo no válido";
  }

  /**Password */
  if (!input.password) {
    errors.password.required = "Contraseña es requerida";
  } else if (input.password.length < 8) {
    errors.password.length = "Contraseña debe tener al menos 8 caracteres";
  } else if (!/[a-z]/.test(input.password)) {
    errors.password.lowercase = "Contraseña debe contener al menos una minúscula";
  }
  if(input.password.length > 40) {
    errors.password.length = "Contraseña debe tener menos de 40 caracteres";
  }
  
  /**Confirm password */
  if (!input.confirmPassword) {
    errors.confirmPassword.required = "Contraseña es requerida";
  } else if (input.confirmPassword !== input.password) {
    errors.confirmPassword.match = "Las contraseñas no coinciden";
  }
  return errors;

};
