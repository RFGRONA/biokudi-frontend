import React, { Fragment } from "react";
import "./HomePage.css";
import Header1 from "../header/Header1";
import Footer from "../footer/Footer";

//Assets
import homeImage from "../../assets/homeImage.svg";
import HomeBody from "./HomeBody";
import BarSearch from "./BarSearch";
function HomePage() {
  return (
    <Fragment>
      <Header1 />
      <div className="bodyUpper">
        <div className="leftTitleContainer">
          <img src={homeImage} alt="homeImage" className="homeImage" />
        </div>
        <div className="rightTitleContainer">
          <h1 className="homeTitle">
            <span>Descubre la magia</span>
            <span>natural de Cundinamarca</span>
          </h1>
          <div className="homeSubtitle">
            <p>¿Qué destino deseas explorar?</p>
          </div>
          <BarSearch />
        </div>
      </div>
      <HomeBody />
      <Footer />
    </Fragment>
  );
}

export default HomePage;
