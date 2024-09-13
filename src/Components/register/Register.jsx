import React from "react";
import "./Register.module.css";
import Header from "../header/Header2";
import Footer from "../footer/Footer";
import styles from "./Register.module.css";
import RegisterForm from "./RegisterForm";

const Register = () => {
  return (
    <>
      <Header />
      <div className={styles.mainContainer}>
        <RegisterForm />
      </div>
      <Footer />
    </>
  );
};

export default Register;
