import React, { Fragment } from "react";
import Header1 from "../Header/Header1.jsx";
import Footer from "../Footer/Footer.jsx";
import styles from "./HomePage.module.css";
//Assets
import homeImage from "../../assets/homeImage.svg";
import HomeBody from "./HomeBody";
import BarSearch from "./BarSearch";
function HomePage() {
  return (
    <Fragment>
      <Header1 />
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
    </Fragment>
  );
}

export default HomePage;
