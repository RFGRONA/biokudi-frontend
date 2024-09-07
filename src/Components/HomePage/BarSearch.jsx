import React from "react";
import searchBar from "../../assets/homePage/iconSearch.svg";
import styles from "./HomePage.module.css";
const BarSearch = () => {
  const text = "Descubre tu ecolugar";

  return (
    <div className={styles.inputWrapper}>
      <input
        className={[styles.searchBar, "bitter"].join(" ")}
        type="text"
        placeholder={text}
      />
      <span className={styles.searchIcon}>
        <img src={searchBar} alt="Buscar" />
      </span>
    </div>
  );
};

export default BarSearch;
