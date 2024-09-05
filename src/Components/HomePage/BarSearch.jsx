import React from "react";
import searchBar from "../../assets/homePage/iconSearch.svg";

const BarSearch = () => {
  return (
    <div className="inputWrapper">
      <input
        className="searchBar"
        type="text"
        placeholder="Descubre tu lugar"
      />
      <span className="searchIcon">
        <img src={searchBar} alt="Buscar" />
      </span>
    </div>
  );
};

export default BarSearch;
