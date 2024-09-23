import axios from "axios";

let publicKey = null;

// Obtiene la clave pública desde el backend
const fetchPublicKey = async () => {
  const URL_PUBLIC_KEY = process.env.REACT_APP_URL_API + "/api/public-key";
  try {
    const response = await axios.get(URL_PUBLIC_KEY);
    if (response.status === 200 && response.data) {
      publicKey = response.data.trim(); // Asegúrate de eliminar espacios en blanco
      console.log("Clave pública obtenida:", publicKey);
    } else {
      throw new Error("No se pudo obtener la clave pública.");
    }
  } catch (error) {
    console.error("Error al obtener la clave pública:", error);
    throw error;
  }
};

// Encripta la contraseña con RSA
const encryptPassword = async (password) => {
  if (!publicKey) {
    await fetchPublicKey();
  }

  if (!publicKey) {
    throw new Error("Clave pública no disponible.");
  }

  const encoder = new TextEncoder();
  const passwordBuffer = encoder.encode(password);

  try {
    const keyBuffer = pemToArrayBuffer(publicKey);
    
    // Importa la clave pública usando RSA-OAEP con SHA-256
    const importedKey = await window.crypto.subtle.importKey(
      "spki",
      keyBuffer,
      {
        name: "RSA-OAEP",
        hash: { name: "SHA-256" },
      },
      false,
      ["encrypt"]
    );

    // Encripta la contraseña usando la clave pública RSA y el algoritmo RSA-OAEP
    const encryptedPasswordBuffer = await window.crypto.subtle.encrypt(
      {
        name: "RSA-OAEP",
      },
      importedKey,
      passwordBuffer
    );

    // Convierte el resultado a Base64 para enviar al backend
    return arrayBufferToBase64(encryptedPasswordBuffer);
  } catch (error) {
    console.error("Error al encriptar la contraseña:", error);
    console.error("Clave pública:", publicKey);
    console.error("Contraseña:", password);
    throw error;
  }
};

// Convierte la clave pública de PEM a ArrayBuffer
const pemToArrayBuffer = (pem) => {
  if (!pem) {
    throw new Error("La clave PEM proporcionada es inválida.");
  }
  
  // Elimina los saltos de línea y espacios en blanco
  const b64 = pem.replace(/-----BEGIN PUBLIC KEY-----|-----END PUBLIC KEY-----|\s/g, '');
  
  try {
    const binary = atob(b64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    return bytes.buffer;
  } catch (error) {
    console.error("Error al decodificar la clave pública:", error);
    throw new Error("Error al decodificar la clave pública en Base64.");
  }
};


// Convierte ArrayBuffer a Base64
const arrayBufferToBase64 = (buffer) => {
  let binary = "";
  const bytes = new Uint8Array(buffer);
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
};

// Exporta las funciones
export const CryptoService = {
  fetchPublicKey,
  encryptPassword,
  pemToArrayBuffer,
  arrayBufferToBase64,
};
