import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import "https://kit.fontawesome.com/2e0b382a53.js";
import { AuthProvider } from "./context/AuthContext";

/**Routes */
import Login from "./Components/Login/Login";
import HomePage from "./Components/HomePage/HomePage";
import Register from "./Components/register/Register";
import Error from "./Components/error/Error";

/*React Router */
import { Route, Routes } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import PrivateRoute from "./Components/PrivateRoute";
import PublicRoute from "./Components/PublicRoute";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <Router>
        <Routes>
          {/* Rutas publicas, no necesitan auth*/}
          <Route element={<PublicRoute />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Error />} />
          </Route>

          {/* Rutas privadas, necesitan auth*/}
          <Route element={<PrivateRoute />}></Route>
        </Routes>
      </Router>
    </AuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
