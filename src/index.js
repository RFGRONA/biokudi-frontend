import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { AuthProvider } from "./context/AuthContext";

/**Routes */
import Login from "./Components/Login/Login";
import HomePage from "./Components/HomePage/HomePage";
import Register from "./Components/register/Register";
import Error from "./Components/error/Error";

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

          {/* Rutas publicas, no necesitan auth*/}
          <Route element={<PublicRoute />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Error />} />
          </Route>

          {/* Rutas privadas */}
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
