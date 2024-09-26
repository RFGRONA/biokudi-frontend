import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./Components/HomePage/HomePage";
import Login from "./Components/Login/Login";
import PrivacyPolicy from "./Components/policies/PrivacyPolicy"
import Cookies from "./Components/policies/Cookies";
import Legal from "./Components/policies/Legal";
import AboutUs from "./Components/policies/AboutUs";
import Help from "./Components/policies/Help";
import Contact from "./Components/policies/Contact";
import Error from "./Components/error/Error";

function App() {
  return (
    <Routes>
      {/* Ruta para la página de inicio */}
      <Route path="/" element={<HomePage />} />

      {/* Ruta para la página de login */}
      <Route path="/login" element={<Login />} />

      {/* Ruta para la página de politica de privacidad */}
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />

      {/* Ruta para la página de cookies */}
      <Route path="/cookies" element={<Cookies />} />

      {/* Ruta para la página de legal */}
      <Route path="/legal" element={<Legal />} />

      {/* Ruta para la página de sobre nosotros */}
      <Route path="/about-us" element={<AboutUs />} />

      {/* Ruta para la página de ayuda */}
      <Route path="/help" element={<Help />} />

      {/* Ruta para la página de contacto */}
      <Route path="/contact" element={<Contact />} />

      {/* Ruta para la página de error */}
      <Route path="*" element={<Error errorCode={404} errorMessage={'No se encontró la pagina deseada'}/>} />
    </Routes>
  );
}

export default App;
