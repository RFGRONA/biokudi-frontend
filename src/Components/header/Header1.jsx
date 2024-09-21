import React, { useContext, useState } from "react";
import logo from "../../assets/header/logo.svg";
import places from "../../assets/header/btnPlaces.svg";
import map from "../../assets/header/btnMap.svg";
import btnLogin from "../../assets/header/btnLogin.svg";
import styles from "./Header1.module.css";
import { useNavigate } from "react-router-dom";
import btnMenu from "../../assets/header/btnMenu.svg";
import MenuHeader from "./menuHeader/MenuHeader";
import { useAuth } from "../../context/AuthContext";

const Header1 = () => {
  /**Context */
  const context = useAuth();
  const { user } = context;
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const goToLogin = () => {
    navigate("/login");
  };
  const goToHome = () => {
    navigate("/");
  };
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  console.log(user);

  return (
    <div className={styles.header}>
      <div className={styles.logo} onClick={goToHome}>
        <img src={logo} alt="logo" />
      </div>
      <div className={[styles.actions, "inter-bold"].join(" ")}>
        <div className={styles.btnPlaces}>
          <img src={places} alt="lugares" />
          <p>Lugares</p>
        </div>
        <div className={styles.btnMap}>
          <img src={map} alt="mapa" />
          <p>Mapa</p>
        </div>
        {user && user.role ? (
          ""
        ) : (
          <div className={styles.btnLogin} onClick={goToLogin}>
            <img src={btnLogin} alt="login" />
            <p>Ingresar</p>
          </div>
        )}

        {/* Lateral Menu */}
        {user && user.role ? (
          <div className={styles.btnMenu}>
            <img
              src={btnMenu}
              alt="menu"
              onClick={() => setShowMenu(!showMenu)}
            />
          </div>
        ) : (
          ""
        )}

        <MenuHeader showMenu={showMenu} closeMenu={toggleMenu} />
      </div>
    </div>
  );
};

export default Header1;
