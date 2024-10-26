import React, { useEffect } from "react";
import logo from "../../assets/header/logo.svg";
import places from "../../assets/header/btnPlaces.svg";
import map from "../../assets/header/btnMap.svg";
import btnLogin from "../../assets/header/btnLogin.svg";
import styles from "./Header2.module.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import btnMenu from "../../assets/header/btnMenu.svg";
import MenuHeader from "./menuHeader/MenuHeader";
import { useState } from "react";

const Header2 = () => {
  /*Context*/
  const { user } = useAuth();
  const navigate = useNavigate();

  const goToPlaces = () => {
    navigate("/browse");
  };
  const goToLogin = () => {
    navigate("/login");
  };
  const goToMap = () => {
    navigate("/map");
  };
  const goToHome = () => {
    navigate("/");
  };

  const [showMenu, setShowMenu] = useState(false);
  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  /*Manejo de autenticación por rol */
  const [isAuthorized, setIsAuthorized] = useState(false);
  useEffect(() => {
    if (user && user.role) {
      setIsAuthorized(true);
    } else {
      setIsAuthorized(false);
    }
  }, [user]);

  return (
    <header>
      <div className={styles.logo} onClick={goToHome}>
        <img src={logo} alt="logo" />
      </div>
      <div className={[styles.actions, "inter-bold"].join(" ")}>
        <div className={styles.btnPlaces} onClick={goToPlaces}>
          <img src={places} alt="lugares" className={styles.imgg} />
          <p>Lugares</p>
        </div>
        <div className={styles.btnMap} onClick={goToMap}>
          <img src={map} alt="mapa" className={styles.imgg} />
          <p>Mapa</p>
        </div>
        {isAuthorized ? (
          ""
        ) : (
          <div className={styles.btnLogin} onClick={goToLogin}>
            <img src={btnLogin} alt="login" className={styles.imgg} />
            <p>Ingresar</p>
          </div>
        )}

        {/* Lateral Menu */}
        {isAuthorized ? (
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
    </header>
  );
};

export default Header2;
