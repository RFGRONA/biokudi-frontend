import React from "react";
import styles from "./MenuHeader.module.css";
import discover from "../../../assets/header/menuUser/discover.svg";
import favorites from "../../../assets/header/menuUser/favorites.svg";
import list from "../../../assets/header/menuUser/list.svg";
import help from "../../../assets/header/menuUser/help.svg";
import exit from "../../../assets/header/menuUser/exit.svg";

const MenuHeader = ({ showMenu, closeMenu }) => {
  return (
    <>
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
            <p className={styles.profileName}>Nombre de Usuario</p>
            <p className={styles.profileEmail}>AnUnammedUser@gmail.com</p>
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
          <div className={[styles.li, styles.help].join(" ")}>
            <div className={styles.menuImage}>
              <img src={help} alt="icon" />
            </div>
            <p>Ayuda</p>
          </div>
        </div>

        <div className={styles.menuFooter}>
          <div className={[styles.li, styles.exit].join(" ")}>
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
