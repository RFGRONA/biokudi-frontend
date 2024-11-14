// BarSearch.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import searchBar from "../../assets/homePage/iconSearch.svg";
import styles from "./HomePage.module.css";

const BarSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    if (searchTerm.trim() !== "") {
      navigate(`/browse?searchTerm=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <form onSubmit={handleSearchSubmit}>
      <div className={styles.inputWrapper}>
        <input
          className={[styles.searchBar, "bitter"].join(" ")}
          type="text"
          placeholder="Descubre tu ecolugar"
          value={searchTerm}
          onChange={handleInputChange}
          maxLength={100}
        />
        <button type="submit" className={styles.searchIcon}>
          <img src={searchBar} alt="Buscar" />
        </button>
      </div>
    </form>
  );
};

export default BarSearch;
