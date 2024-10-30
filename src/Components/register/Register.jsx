import React, { useState } from "react";
import "./Register.module.css";
import Header from "../header/Header2";
import Footer from "../footer/Footer";
import styles from "./Register.module.css";
import RegisterForm from "./RegisterForm";
import { useAuth } from "../../context/AuthContext";
import Loading from "../helpers/loading/Loading";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

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
