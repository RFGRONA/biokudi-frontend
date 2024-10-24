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
import ListUsers from "./Components/user/ListUsers";
import CreatePlace from "./Components/places/CreatePlace";
import UserSettings from "./Components/SettingsUser/UserSettings";
import ListPlaces from "./Components/places/ListPlaces";
import EditPlace from "./Components/places/EditPlace";
import ListActivities from "./Components/activity/ListActivities";
import EditActivity from "./Components/activity/EditActivity";
import Places from "./Components/places/Places";
import ListStates from "./Components/state/ListStates";
import CreateState from "./Components/state/CreateState";
import EditState from "./Components/state/EditState";
import ListPictures from "./Components/picture/ListPictures";
import ListRoles from "./Components/role/ListRoles";
import CreateRole from "./Components/role/CreateRole";
import EditUser from "./Components/user/EditUser";
import ListReviews from "./Components/review/ListReviews";

import ErrorAlert from "./Components/helpers/alerts/ErrorAlert";
import SuccessAlert from "./Components/helpers/alerts/SuccessAlert";

import DecisionAlert from "./Components/helpers/alerts/DecisionAlert";

/*React Router */
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PrivateRoute from "./Components/PrivateRoute";
import PublicRoute from "./Components/PublicRoute";

import "https://kit.fontawesome.com/2e0b382a53.js";
import CreateActivity from "./Components/activity/CreateActivity";
import EditRole from "./Components/role/EditRole";
import Sidebar from "./Components/map/SideBar";
import PlaceInformation from "./Components/map/PlaceInformation";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/users" element={<ListUsers />} />
          <Route path="/Roles" element={<ListRoles />} />
          <Route path="/Reviews" element={<ListReviews />} />
          <Route path="/CreatePlace" element={<CreatePlace />} />
          <Route path="/CreateActivity" element={<CreateActivity />} />
          <Route path="/CreateState" element={<CreateState />} />
          <Route path="/CreateRole" element={<CreateRole />} />
          <Route path="/EditPlace/:index" element={<EditPlace />} />
          <Route path="/EditRole/:index" element={<EditRole />} />
          <Route path="/EditActivity/:index" element={<EditActivity />} />
          <Route path="/EditUser/:index" element={<EditUser />} />
          <Route path="/EditState/:index" element={<EditState />} />
          <Route path="/Activities" element={<ListActivities />} />
          <Route path="/Pictures" element={<ListPictures />} />
          <Route path="/States" element={<ListStates />} />
          <Route path="/places" element={<ListPlaces />} />
          <Route path="/browse" element={<Places />} />
          <Route path="/error" element={<Error />} />

          {/* temporales(borrar) */}
          <Route path="/profile" element={<UserSettings />} />
          <Route path="/SideBar" element={<Sidebar />} />
          <Route path="/placeinf" element={<PlaceInformation />} />

          <Route
            path="/ErrorAlert"
            element={
              <ErrorAlert message={"No se pudieron guardar los cambios"} />
            }
          />
          <Route
            path="/SuccessAlert"
            element={<SuccessAlert message={"Se ha... satisfactoriamente"} />}
          />
          <Route
            path="/DecisionAlert"
            element={
              <DecisionAlert
                title1={"Esta seguro de..."}
                message={"Se ha... satisfactoriamente"}
                cancelText={"Seguir..."}
              />
            }
          />

          {/* Rutas publicas, no necesitan auth*/}
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/cookies" element={<Cookies />} />
          <Route path="/legal" element={<Legal />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/help" element={<Help />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Error />} />
          <Route path="/" element={<HomePage />} />

          {/* Rutas restringidas, (No permitidas si estan login) */}
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
          <Route element={<PrivateRoute allowedRoles={["editor"]} />}>
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
