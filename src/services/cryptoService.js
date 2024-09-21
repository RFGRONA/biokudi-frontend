import axios from "axios";

export class CryptoService {
  constructor() {
    this.publicKey = null;
  }

  // Obtiene la clave pública desde el backend
  async fetchPublicKey() {
    const URL_PUBLIC_KEY = process.env.REACT_APP_URL_API + "/api/public-key";
    try {
      const response = await axios.get(URL_PUBLIC_KEY);
      if (response.status === 200) {
        this.publicKey = response.data; // Guarda la clave pública
      } else {
        throw new Error("No se pudo obtener la clave pública.");
      }
    } catch (error) {
      console.error("Error al obtener la clave pública:", error);
    }
  }

  // Encripta la contraseña con RSA
  async encryptPassword(password) {
    if (!this.publicKey) {
      await this.fetchPublicKey();
    }

    const encoder = new TextEncoder();
    const passwordBuffer = encoder.encode(password);

    // Importa la clave pública usando RSA-OAEP con SHA-512
    const importedKey = await window.crypto.subtle.importKey(
      "spki",
      this._pemToArrayBuffer(this.publicKey), // Convierte el PEM en ArrayBuffer
      {
        name: "RSA-OAEP",
        hash: { name: "SHA-512" }, // Usar SHA-512 para mayor seguridad
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
    return this._arrayBufferToBase64(encryptedPasswordBuffer);
  }

  // Convierte la clave pública de PEM a ArrayBuffer
  _pemToArrayBuffer(pem) {
    const b64Lines = pem.replace(/-----(BEGIN|END) PUBLIC KEY-----/g, "").trim();
    const b64 = b64Lines.replace(/\n/g, "");
    const binaryString = atob(b64);
    const binaryArray = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      binaryArray[i] = binaryString.charCodeAt(i);
    }
    return binaryArray.buffer;
  }

  // Convierte ArrayBuffer a Base64
  _arrayBufferToBase64(buffer) {
    let binary = "";
    const bytes = new Uint8Array(buffer);
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  }
}
