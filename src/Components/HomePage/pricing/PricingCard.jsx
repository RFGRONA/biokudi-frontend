// src/components/PricingCard.jsx
import React from "react";

// Puedes reemplazar estos iconos con SVGs reales o iconos de una librería como Heroicons
const Icons = {
  Gratuito: () => <span className="text-green-600 text-2xl mr-2">🌿.
  
  3</span>, // Icono de hoja
  Basico: () => <span className="text-green-700 text-2xl mr-2">🌲</span>, // Icono de árbol
  Premium: () => <span className="text-orange-500 text-2xl mr-2">💎</span>, // Icono de diamante
  Empresas: () => <span className="text-gray-700 text-2xl mr-2">🏢</span>, // Icono de edificio
};

function PricingCard({
  planKey, // 'Gratuito', 'Basico', 'Premium', 'Empresas'
  title,
  description,
  features,
  price,
  priceFrequency = "/mes",
  savings,
  buttonText,
  buttonLink = "#",
  borderColor = "border-gray-300",
  bgColor = "bg-white",
  titleColor = "text-gray-800",
  buttonBgColor = "bg-gray-700",
  buttonTextColor = "text-white",
  isPopular = false, // Para destacar un plan si es necesario
}) {
  const IconComponent = Icons[planKey] || (() => null); // Obtiene el icono basado en la clave

  return (
    <div
      className={`
        rounded-xl border ${borderColor} ${bgColor} p-6 flex flex-col h-full
        ${
          isPopular ? "ring-2 ring-offset-2 ring-indigo-500" : ""
        } // Resalta el plan si es popular
        shadow-md hover:shadow-lg transition-shadow duration-300
        transform hover:scale-105 transition-transform duration-300 ease-in-out
        
      `}
    >
      {/* Encabezado de la tarjeta */}
      <div className="flex items-center mb-4">
        <IconComponent />
        <h3 className={`text-xl font-semibold ${titleColor}`}>{title}</h3>
      </div>

      {/* Descripción */}
      <p className="text-gray-600 text-sm mb-6 flex-grow">{description}</p>

      {/* Lista de características */}
      <ul className="space-y-2 text-sm text-gray-700 mb-8 list-disc list-inside">
        {features.map((feature, index) => (
          <li key={index}>{feature}</li>
        ))}
      </ul>

      {/* Sección de precio y botón (alineado al final) */}
      <div className="mt-auto">
        {savings && (
          <p className="text-xs text-center text-green-700 font-medium mb-2">
            {savings}
          </p>
        )}

        <a
          href={buttonLink}
          className={`
            block w-full text-center py-3 px-4 rounded-lg font-semibold
            ${buttonBgColor} ${buttonTextColor}
            hover:opacity-90 transition-opacity duration-200
            ${
              !price ? "mt-4" : ""
            } // Añade margen superior si no hay precio (ej. Empresas)
          `}
        >
          {buttonText}
        </a>
      </div>
    </div>
  );
}

export default PricingCard;
