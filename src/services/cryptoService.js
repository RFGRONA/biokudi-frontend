import axios from "axios";

let publicKey = null;

// Obtiene la clave pública desde el backend
const fetchPublicKey = async () => {
  const URL_PUBLIC_KEY = process.env.REACT_APP_URL_API + "/api/public-key";
  try {
    const response = await axios.get(URL_PUBLIC_KEY);
    if (response.status === 200) {
      publicKey = response.data;
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
    // Importa la clave pública usando RSA-OAEP con SHA-256
    const importedKey = await window.crypto.subtle.importKey(
      "spki",
      pemToArrayBuffer(publicKey),
      {
        name: "RSA-OAEP",
        hash: { name: "SHA-256" }, // Cambiado a SHA-256
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
    throw error;
  }
};

// Convierte la clave pública de PEM a ArrayBuffer
const pemToArrayBuffer = (pem) => {
  if (!pem) {
    throw new Error("La clave PEM proporcionada es inválida.");
  }
  const b64Lines = pem.replace(/-----(BEGIN|END) PUBLIC KEY-----/g, "").trim();
  const b64 = b64Lines.replace(/[\r\n]+/g, "");
  try {
    const binaryString = atob(b64);
    const binaryArray = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      binaryArray[i] = binaryString.charCodeAt(i);
    }
    return binaryArray.buffer;
  } catch (error) {
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
