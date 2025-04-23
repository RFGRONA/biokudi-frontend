// src/components/PricingSection.jsx
import React from "react";
import PricingCard from "./PricingCard";
import Header from "../../header/Header2";
import Footer from "../../footer/Footer";

const plansData = [
  {
    planKey: "Gratuito",
    title: "Gratuito",
    description:
      "El punto de partida perfecto para descubrir destinos ecoturísticos.",
    features: [
      "Acceso a información de destinos",
      "Creación de cuenta personal",
      "Búsqueda por nombre",
      "Escribir reseñas",
      "Mapa interactivo",
    ],
    price: null, // Gratuito no tiene precio numérico mostrado así
    savings: null,
    buttonText: "Regístrate Gratis",
    borderColor: "border-green-400",
    bgColor: "bg-green-50",
    titleColor: "text-green-700",
    buttonBgColor: "bg-green-600",
    buttonTextColor: "text-white",
  },
  {
    planKey: "Basico",
    title: "Básico",
    description:
      "Lo esencial para planificar tu viaje con un toque inteligente.",
    features: [
      "Todo lo que incluye el plan Gratuito",
      "Acceso limitado a IA Planificadora",
      "Soporte personalizado",
    ],
    price: "15.000 COP",
    priceFrequency: "/mes",
    savings: "Ahorra hasta 30% con pago anual.",
    buttonText: "$15.000 COP/mes",
    borderColor: "border-green-400",
    bgColor: "bg-green-50",
    titleColor: "text-green-800",
    buttonBgColor: "bg-green-600",
    buttonTextColor: "text-white",
  },
  {
    planKey: "Premium",
    title: "Premium",
    description:
      "La experiencia completa con planificación ilimitada y beneficios exclusivos.",
    features: [
      "Acceso ilimitado a IA Planificadora",
      "Newsletter exclusivo",
      "Cupones de descuento",
      "Soporte prioritario",
    ],
    price: "35.000 COP",
    priceFrequency: "/mes",
    savings: "Ahorra hasta 30% con pago anual.",
    buttonText: "$35.000 COP/mes",
    borderColor: "border-orange-400",
    bgColor: "bg-orange-50",
    titleColor: "text-orange-600",
    buttonBgColor: "bg-orange-500",
    buttonTextColor: "text-white",
    isPopular: true,
  },
  {
    planKey: "Empresas",
    title: "Empresas",
    description:
      "Soluciones a medida para experiencias grupales, corporativas o institucionales inolvidables.",
    features: [
      "Organización para grupos grandes",
      "Actividades de bienestar",
      "Tarifas especiales",
      "Gestión logística completa",
      "Atención personalizada",
    ],
    price: null,
    savings: null,
    buttonText: "Contactar Ventas",
    borderColor: "border-gray-400",
    bgColor: "bg-gray-50", // Fondo gris muy claro
    titleColor: "text-gray-700",
    buttonBgColor: "bg-gray-800", // Color café/oscuro
    buttonTextColor: "text-white",
  },
];

function PricingSection() {
  return (
    <>
      <Header />
      <section className="py-16 bg-white px-4 sm:px-6 lg:px-8 min-h-[80vh]">
        <div className="max-w-7xl mx-auto text-center">
          {/* Título Principal */}
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-4">
            Planes Diseñados para Cada Tipo de Explorador
          </h2>
          {/* Subtítulo */}
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
            Explora nuestros planes y accede a las herramientas y beneficios que
            necesitas para conectar con la naturaleza.
          </p>

          {/* Contenedor de las tarjetas (Grid) */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {plansData.map((plan) => (
              <PricingCard
                key={plan.planKey} // Usar planKey como key
                planKey={plan.planKey} // Pasar planKey para seleccionar icono
                title={plan.title}
                description={plan.description}
                features={plan.features}
                price={plan.price}
                priceFrequency={plan.priceFrequency}
                savings={plan.savings}
                buttonText={plan.buttonText}
                buttonLink={plan.buttonLink}
                borderColor={plan.borderColor}
                bgColor={plan.bgColor}
                titleColor={plan.titleColor}
                buttonBgColor={plan.buttonBgColor}
                buttonTextColor={plan.buttonTextColor}
                isPopular={plan.isPopular}
              />
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default PricingSection;
