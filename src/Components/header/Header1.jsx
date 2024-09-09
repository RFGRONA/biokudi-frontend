import React from "react";
import logo from "../../assets/header/logo.svg";
import places from "../../assets/header/btnPlaces.svg";
import map from "../../assets/header/btnMap.svg";
import btnLogin from "../../assets/header/btnLogin.svg";
import styles from "./Header1.module.css";
import { useNavigate } from "react-router-dom";

const Header1 = () => {
  const navigate = useNavigate();
  const goToLogin = () => {
    navigate("/login");
  };
  return (
    <header>
      <div className={styles.logo}>
        <img src={logo} alt="logo" />
      </div>
      <div className={[styles.actions, "inter-bold"].join(" ")}>
        <div className="btn-places">
          <img src={places} alt="lugares" />
          <p>Lugares</p>
        </div>
        <div className="btn-map">
          <img src={map} alt="mapa" />
          <p>Mapa</p>
        </div>
        <div className="btn-login" onClick={goToLogin}>
          <img src={btnLogin} alt="login" />
          <p>Ingresar</p>
        </div>
      </div>
    </header>
  );
};

export default Header1;
