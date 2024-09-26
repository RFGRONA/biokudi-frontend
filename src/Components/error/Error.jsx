import React from "react";
import Header1 from "../header/Header1";
import Footer from "../footer/Footer";
import styles from "./Error.module.css";
import errorIcon from "../../assets/error/error_icon.svg";

const Error = ({ errorCode, errorMessage }) => {
  return (
    <div>
      <Header1 />
      <div className={styles.container}>
        <img src={errorIcon} alt="Error" className={styles.icon} />
        <div className={styles.textContainer}>
          <h1 className={styles.title}>¡Algo pasó!</h1>
          <h2 className={styles.errorCode}>{errorCode}</h2>
          <h3 className={styles.errorMessage}>{errorMessage}</h3>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Error;
