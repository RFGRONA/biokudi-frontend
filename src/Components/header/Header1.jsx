import React from "react";
import "./Header1.css";
import logo from "../../assets/header/logo.svg";
import places from "../../assets/header/btnPlaces.svg";
import map from "../../assets/header/btnMap.svg";
import btnLogin from "../../assets/header/btnLogin.svg";

const Header1 = () => {
  return (
    <header>
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>
      <div className="actions">
        <div className="btn-places">
          <img src={places} alt="lugares" />
          <p>Lugares</p>
        </div>
        <div className="btn-map">
          <img src={map} alt="mapa" />
          <p>Mapa</p>
        </div>
        <div className="btn-login">
          <img src={btnLogin} alt="login" />
          <p>Ingresar</p>
        </div>
      </div>
    </header>
  );
};

export default Header1;
