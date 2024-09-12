import React, { Fragment } from "react";
import Header from "../header/Header1";
import Footer from "../footer/Footer";
import styles from "./HomePage.module.css";
//Assets
import homeImage from "../../assets/homeImage.svg";
import HomeBody from "./HomeBody";
import BarSearch from "./BarSearch";
function HomePage() {
  return (
    <div className={styles.mainContainer}>
      <Header />

      <div className={styles.bodyUpper}>
        <div className={styles.leftTitleContainer}>
          <img src={homeImage} alt="homeImage" className={styles.homeImage} />
        </div>
        <div className={styles.rightTitleContainer}>
          <h1
            className={[styles.homeTitle, "inter-bold", "color-primary"].join(
              " "
            )}
          >
            <span>Descubre la magia</span>
            <span>natural de Cundinamarca</span>
          </h1>
          <div className={[styles.homeSubtitle, "asul"].join(" ")}>
            <p>¿Qué destino deseas explorar?</p>
          </div>
          <BarSearch />
        </div>
      </div>
      <HomeBody />
      <Footer />
    </div>
  );
}

export default HomePage;
