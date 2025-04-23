// src/components/AIChatPlanner.jsx
import React, { useState, useRef, useEffect } from "react";
import { fetchAIResponse } from "../../services/apiModel/ChatApi";
import Header from "../header/Header2";
import Footer from "../footer/Footer";

// Icono simple para el botón de enviar (puedes usar una librería como Heroicons)
const SendIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    className="w-5 h-5"
  >
    <path d="M3.105 3.105a.75.75 0 01.814-.39l14.026 4.007a.75.75 0 010 1.368L3.919 17.285a.75.75 0 01-1.151-.814l2.03-6.091a.75.75 0 000-.482L2.77 4.27A.75.75 0 013.105 3.105z" />
  </svg>
);

function Chat() {
  // Estado para los mensajes de la conversación
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "ai",
      text: "Hola, soy tu asistente IA. Pídeme ideas de destinos, crear un itinerario o pregúntame sobre lugares ecoturísticos en Cundinamarca.",
    },
  ]);

  // Estado para el valor actual del input
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const messageContainerRef = useRef(null);

  const scrollToBottom = () => {
    if (messageContainerRef.current) {
      // ---> PASO 3: Establecer scrollTop directamente <---
      // Opcion 1: Scroll instantáneo
      // messageContainerRef.current.scrollTop = messageContainerRef.current.scrollHeight;

      // Opción 2: Scroll suave (si el navegador lo soporta bien en el contenedor)
      messageContainerRef.current.scrollTo({
        top: messageContainerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  // Efecto para hacer scroll cada vez que los mensajes cambian
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // --- Función para manejar el envío de mensajes ---
  const handleSendMessage = async (e) => {
    // Prevenir recarga si se usa dentro de un <form>
    if (e) e.preventDefault();

    const userMessageText = inputValue.trim();
    if (!userMessageText || isLoading) return; // No enviar si está vacío o cargando

    // 1. Añadir mensaje del usuario al estado
    const newUserMessage = {
      id: Date.now(), // ID simple basado en timestamp
      sender: "user",
      text: userMessageText,
    };
    const currentMessages = [...messages, newUserMessage];
    setMessages(currentMessages);
    setInputValue("");
    setIsLoading(true);

    // 2. Simular llamada a la API (aquí deberías hacer tu llamada real)
    try {
      const aiResponseText = await fetchAIResponse(
        userMessageText,
        currentMessages
      );
      const newAiMessage = {
        id: Date.now() + 1,
        sender: "ai",
        text: aiResponseText,
      };
      setMessages((prevMessages) => [...prevMessages, newAiMessage]);
    } catch (error) {
      // 3. Añadir respuesta de la IA al estado
      console.error("Error al obtener respuesta de la IA:", error);

      const errorMessage = {
        id: Date.now() + 1,
        sender: "ai",
        text:
          error.message ||
          "Lo siento, no pude obtener una respuesta en este momento.",
      };
    } finally {
      setIsLoading(false); // Termina el estado de carga
    }
  };

  return (
    <>
      <Header />
      <div className="bg-gray-50 py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-center text-3xl sm:text-4xl font-bold text-green-800 mb-10">
            Planifica tu Aventura
          </h2>

          {/* Caja principal del Chat */}
          <div className="bg-white rounded-lg shadow-lg flex flex-col h-[60vh] max-h-[700px]">
            {" "}
            {/* Altura fija o máxima para la caja */}
            {/* Área de Mensajes (con scroll) */}
            <div
              ref={messageContainerRef}
              className="flex-grow p-4 sm:p-6 space-y-4 overflow-y-auto"
            >
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[75%] p-3 rounded-lg ${
                      message.sender === "user"
                        ? "bg-blue-500 text-white" // Estilo mensaje usuario
                        : "bg-green-100 text-green-900" // Estilo mensaje IA (como en la imagen)
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
              {/* Indicador de carga */}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="max-w-[75%] p-3 rounded-lg bg-gray-200 text-gray-600 italic">
                    IA está pensando...
                  </div>
                </div>
              )}
              {/* Elemento vacío para referencia de scroll */}
              <div ref={messagesEndRef} />
            </div>
            {/* Área de Input */}
            <form
              onSubmit={handleSendMessage}
              className="p-4 border-t border-gray-200 flex items-center space-x-3 bg-white rounded-b-lg"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={
                  isLoading
                    ? "Esperando respuesta..."
                    : "¿Cómo te ayudo a planificar tu viaje?"
                }
                className="flex-grow border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:bg-gray-100"
                disabled={isLoading} // Deshabilitar input mientras carga
              />
              <button
                type="submit"
                className={`bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed`}
                disabled={isLoading || !inputValue.trim()} // Deshabilitar botón si carga o no hay texto
              >
                <SendIcon />
              </button>
            </form>
          </div>

          {/* Disclaimer Text */}
          <p className="text-xs text-gray-500 text-center mt-6 max-w-xl mx-auto">
            Esta herramienta es una guía para inspirarte y ayudarte a organizar
            tu viaje. Recuerda siempre verificar la información importante (como
            precios, horarios, disponibilidad y condiciones actuales)
            directamente con los proveedores o fuentes oficiales antes de tu
            aventura. La IA puede cometer errores.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Chat;
