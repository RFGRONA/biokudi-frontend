import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./Components/HomePage/HomePage";
import Login from "./Components/Login/Login";

function App() {
  return (
    <Routes>
      {/* Ruta para la página de inicio */}
      <Route path="/" element={<HomePage />} />

      {/* Ruta para la página de login */}
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
