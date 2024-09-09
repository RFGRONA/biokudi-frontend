import React from "react";
import styles from "./Login.module.css";
import Header from "../header/Header1";
import Footer from "../footer/Footer";
import LoginForm from "./LoginForm";

const Login = () => {
  return (
    <div>
      <Header />
      <LoginForm />
      <Footer />
    </div>
  );
};

export default Login;
