import React from "react";
import styles from "./MenuHeader.module.css";
import discover from "../../../assets/header/menuUser/discover.svg";
import favorites from "../../../assets/header/menuUser/favorites.svg";
import list from "../../../assets/header/menuUser/list.svg";
import help from "../../../assets/header/menuUser/help.svg";
import exit from "../../../assets/header/menuUser/exit.svg";
import managmnet from "../../../assets/header/menuUser/managment.svg";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { useState } from "react";
import MenuManag from "./MenuManag";

const MenuHeader = ({ showMenu, closeMenu }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [menuManag, setMenuManag] = useState(false);
  const logoutHandler = async () => {
    await logout();
    navigate("/login");
  };

  const visibleMenuManag = () => {
    setMenuManag(!menuManag);
  };

  return (
    <>
      {/* menuManag */}
      {menuManag && <MenuManag closeMenu={visibleMenuManag} />}
      {/* Background */}
      <div
        className={`${styles.backdrop} ${showMenu ? styles.showBackdrop : ""}`}
        onClick={closeMenu}
      ></div>
      <div className={`${styles.menuHeader} ${showMenu ? styles.open : ""}`}>
        <button className={styles.closeBtn} onClick={closeMenu}>
          &times;
        </button>
        {/* TODO: Click to redirect to profile */}
        <div className={styles.profile}>
          <div className={styles.profileImg}>
            <img
              src="https://via.placeholder.com/150"
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
          <div className={styles.li}>
            <div className={styles.menuImage}>
              <img src={discover} alt="icon" />
            </div>
            <p>Descubre lugares</p>
          </div>
          <div className={styles.li}>
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
          </div>
          {(user?.role === "Admin" || user?.role === "Editor") && (
            <div className={styles.li} onClick={visibleMenuManag}>
              <div className={styles.menuImage}>
                <img src={managmnet} alt="icon" />
              </div>
              <p>Gestión</p>
            </div>
          )}

          <div className={[styles.li, styles.help].join(" ")}>
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
