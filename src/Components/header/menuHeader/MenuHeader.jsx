import React from "react";
import styles from "./MenuHeader.module.css";
import discover from "../../../assets/header/menuUser/discover.svg";
import help from "../../../assets/header/menuUser/help.svg";
import exit from "../../../assets/header/menuUser/exit.svg";
import managmnet from "../../../assets/header/menuUser/managment.svg";
import report from "../../../assets/header/menuUser/report.svg";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { useState } from "react";
import MenuManag from "./MenuManag";
import MenuReport from "./MenuReport";
import { getRandomPlace } from "../../../services/apiModel/PlaceApi";

const MenuHeader = ({ showMenu, closeMenu }) => {
  const { user } = useAuth();

  const navigate = useNavigate();
  const { logout } = useAuth();
  const [menuManag, setMenuManag] = useState(false);
  const [menuReport, setMenuReport] = useState(false);

  const logoutHandler = async () => {
    await logout();
    navigate("/login");
  };

  const goToProfile = () => {
    navigate("/profile");
  };

  const goToContact = () => {
    navigate("/contact");
  };

  const visibleMenuManag = () => {
    if (menuReport) {
      setMenuReport(!menuReport);
    }
    setMenuManag(!menuManag);
  };

  const visibleMenuReport = () => {
    if (menuManag) {
      setMenuManag(!menuManag);
    }
    setMenuReport(!menuReport);
  };

  const goToMap = async () => {
    const place = await getRandomPlace();
    console.log(place);
    navigate(`/map/${place.id}`);
  };

  return (
    <>
      {/* menuManag */}
      {menuManag && <MenuManag closeMenu={visibleMenuManag} />}
      {menuReport && <MenuReport closeMenu={visibleMenuReport} />}
      {/* Background */}
      <div
        className={`${styles.backdrop} ${showMenu ? styles.showBackdrop : ""}`}
        onClick={closeMenu}
      ></div>
      <div className={`${styles.menuHeader} ${showMenu ? styles.open : ""}`}>
        <button className={styles.closeBtn} onClick={closeMenu}>
          &times;
        </button>
        <div className={styles.profile} onClick={goToProfile}>
          <div className={styles.profileImg}>
            <img
              src={user ? user.photo : "https://via.placeholder.com/150"}
              alt="profile"
              className={styles.profileImg}
            />
          </div>
          <div className={styles.profileInfo}>
            <p className={styles.profileName}>{user ? user.name : "Error"}</p>
            <p className={styles.profileEmail}>{user ? user.email : "Error"}</p>
          </div>
        </div>

        {/* List */}
        <div className={styles.menuItems}>
          {(user?.role === "Admin" || user?.role === "Editor") && (
            <>
              <div className={styles.li} onClick={visibleMenuManag}>
                <div className={styles.menuImage}>
                  <img src={managmnet} alt="icon" />
                </div>
                <p>Gestión</p>
              </div>
              <div className={styles.li} onClick={visibleMenuReport}>
                <div className={styles.menuImage}>
                  <img src={report} alt="icon" />
                </div>
                <p>Reportes</p>
              </div>
            </>
          )}
          <div className={styles.li} onClick={goToMap}>
            <div className={styles.menuImage}>
              <img src={discover} alt="icon" />
            </div>
            <p>Descubre lugares</p>
          </div>

          {/* TODO: Listas y Favoritos */}

          {/* <div className={styles.li}>
            <div className={styles.menuImage}>
              <img src={favorites} alt="icon" />
            </div>
            <p>Tus favoritos</p>
          </div>
          <div className={styles.li}>
            <div className={styles.menuImage}>
              <img src={list} alt="icon" />
            </div>
            <p>Listas</p>
          </div> */}

          <div
            className={[styles.li, styles.help].join(" ")}
            onClick={goToContact}
          >
            <div className={styles.menuImage}>
              <img src={help} alt="icon" />
            </div>
            <p>Ayuda</p>
          </div>
        </div>

        <div className={styles.menuFooter}>
          <div
            className={[styles.li, styles.exit].join(" ")}
            onClick={logoutHandler}
          >
            <div className={styles.menuImage}>
              <img src={exit} alt="icon" />
            </div>
            <p>Salir</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default MenuHeader;
