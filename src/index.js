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
import MapView from "./Components/map/MapView";
import ListTickets from "./Components/ticket/ListTickets";
import EditTicket from "./Components/ticket/EditTicket";
import ReportPlace from "./Components/places/ReportPlace";
import ReportActivity from "./Components/activity/ReportActivity";
import ReportState from "./Components/state/ReportState";
import ReportUser from "./Components/user/ReportUser";
import ReportRole from "./Components/role/ReportRole";
import ReportPicture from "./Components/picture/ReportPicture";
import ReportReview from "./Components/review/ReportReview";
import ReportTicket from "./Components/ticket/ReportTicket";
import ReportAudit from "./Components/audit/ReportAudit";
import ListCities from "./Components/city/ListCities";
import ListDepartment from "./Components/deparment/ListDepartment";
import CreateDepartment from "./Components/deparment/CreateDepartment";
import EditDepartment from "./Components/deparment/EditDepartment";
import EditCity from "./Components/city/EditCity";
import CreateCity from "./Components/city/CreateCity";
import ReportCity from "./Components/city/ReportCity";
import ReportDepartment from "./Components/deparment/ReportDepartment";
import ListTypes from "./Components/type/ListTypes";
import CreateType from "./Components/type/CreateType";
import EditType from "./Components/type/EditType";
import ReportType from "./Components/type/ReportType";
import Browse from "./Components/places/Browse";
import ChangePassword from "./Components/SettingsUser/ChangePassword";
import RecoveryPassword from "./Components/SettingsUser/RecoveryPassword";
import ResetPassword from "./Components/SettingsUser/ResetPassword";

/*React Router */
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PrivateRoute from "./Components/PrivateRoute";
import PublicRoute from "./Components/PublicRoute";

import "https://kit.fontawesome.com/2e0b382a53.js";
import CreateActivity from "./Components/activity/CreateActivity";
import EditRole from "./Components/role/EditRole";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <Routes>
          {/* Rutas publicas, no necesitan auth*/}
          <Route path="/browse" element={<Browse />} />
          <Route path="/map/:placeId" element={<MapView />} />
          <Route path="/map" element={<MapView />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/cookies" element={<Cookies />} />
          <Route path="/legal" element={<Legal />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/help" element={<Help />} />
          <Route path="*" element={<Error />} />
          <Route path="/error" element={<Error />} />
          <Route path="/" element={<HomePage />} />

          {/* Rutas restringidas, (No permitidas si estan login) */}
          <Route element={<PublicRoute />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/recovery-password" element={<RecoveryPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
          </Route>

          {/* LOGGED */}
          <Route
            element={
              <PrivateRoute allowedRoles={["Admin", "Editor", "User"]} />
            }
          >
            <Route path="/profile" element={<UserSettings />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/update-password" element={<ChangePassword />} />
          </Route>

          {/* ADMIN, EDITOR */}
          <Route element={<PrivateRoute allowedRoles={["Admin", "Editor"]} />}>
            <Route path="/places" element={<ListPlaces />} />
            <Route path="/Activities" element={<ListActivities />} />
            <Route path="/EditPlace/:index" element={<EditPlace />} />
            <Route path="/CreatePlace" element={<CreatePlace />} />
            <Route path="/Reviews" element={<ListReviews />} />
            <Route path="/Tickets" element={<ListTickets />} />
            <Route path="/EditTicket/:index" element={<EditTicket />} />
            <Route path="/ReportPlace" element={<ReportPlace />} />
            <Route path="/ReportActivity" element={<ReportActivity />} />
            <Route path="/ReportState" element={<ReportState />} />
            <Route path="/ReportUser" element={<ReportUser />} />
            <Route path="/ReportRole" element={<ReportRole />} />
            <Route path="/ReportPicture" element={<ReportPicture />} />
            <Route path="/ReportReview" element={<ReportReview />} />
            <Route path="/ReportTicket" element={<ReportTicket />} />
            <Route path="/ReportAudit" element={<ReportAudit />} />
            <Route path="/ReportCity" element={<ReportCity />} />
            <Route path="/ReportType" element={<ReportType />} />
            <Route path="/ReportDepartment" element={<ReportDepartment />} />
          </Route>

          {/* ADMIN */}
          <Route element={<PrivateRoute allowedRoles={["Admin"]} />}>
            <Route path="/States" element={<ListStates />} />
            <Route path="/Pictures" element={<ListPictures />} />
            <Route path="/EditState/:index" element={<EditState />} />
            <Route path="/EditUser/:index" element={<EditUser />} />
            <Route path="/EditActivity/:index" element={<EditActivity />} />
            <Route path="/EditRole/:index" element={<EditRole />} />
            <Route path="/EditCity/:index" element={<EditCity />} />
            <Route path="/EditType/:index" element={<EditType />} />
            <Route path="/CreateActivity" element={<CreateActivity />} />
            <Route path="/CreateState" element={<CreateState />} />
            <Route path="/CreateType" element={<CreateType />} />
            <Route path="/CreateRole" element={<CreateRole />} />
            <Route path="/CreateCity" element={<CreateCity />} />
            <Route path="/users" element={<ListUsers />} />
            <Route path="/Roles" element={<ListRoles />} />
            <Route path="/Cities" element={<ListCities />} />
            <Route path="/Types" element={<ListTypes />} />
            <Route path="/Departments" element={<ListDepartment />} />
            <Route path="/CreateDepartment" element={<CreateDepartment />} />
            <Route path="/EditDepartment/:index" element={<EditDepartment />} />
          </Route>

          {/* USER */}
          <Route element={<PrivateRoute allowedRoles={["Editor"]} />}></Route>
          <Route element={<PrivateRoute allowedRoles={["User"]} />}></Route>
        </Routes>
      </AuthProvider>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
