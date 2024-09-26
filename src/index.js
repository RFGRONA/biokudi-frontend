import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { AuthProvider } from "./context/AuthContext";
import Cookies from "./Components/policies/Cookies";
import Legal from "./Components/policies/Legal";
import AboutUs from "./Components/policies/AboutUs";
import Help from "./Components/policies/Help";
import Contact from "./Components/policies/Contact";
import PrivacyPolicy from "./Components/policies/PrivacyPolicy";

/**Routes */
import Login from "./Components/Login/Login";
import HomePage from "./Components/HomePage/HomePage";
import Register from "./Components/register/Register";
import Error from "./Components/error/Error";
import ListPlaces from "./Components/places/ListPlaces";
import UserSettings from "./Components/SettingsUser/UserSettings";

/*React Router */
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PrivateRoute from "./Components/PrivateRoute";
import PublicRoute from "./Components/PublicRoute";

import "https://kit.fontawesome.com/2e0b382a53.js";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          
          {/* temporales(borrar) */}
          <Route path="/settings" element={< UserSettings />} />
          {/* Rutas publicas, no necesitan auth*/}
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/cookies" element={<Cookies />} />
          <Route path="/legal" element={<Legal />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/help" element={<Help />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/places" element={<ListPlaces />} />
          <Route path="*" element={<Error />} />

          {/* Rutas publicas, no necesitan auth (No permitidas si estan login) */}
          <Route element={<PublicRoute />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>

          {/* Rutas privadas */}
          {/* Rutas globales privadas */}
          {/* <Route path="/settings" element={< UserSettings />} /> */}


          {/* ADMIN */}
          <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
            {/* Agrega aquí tus rutas privadas */}
            {/* <Route path="/private" element={<PrivatePage />} /> */}
          </Route>

          {/* USER */}
          <Route element={<PrivateRoute />}>
            {/* Agrega aquí tus rutas privadas */}
            {/* <Route path="/private" element={<PrivatePage />} /> */}
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
