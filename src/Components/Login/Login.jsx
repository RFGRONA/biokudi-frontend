import React from "react";
import styles from "./Login.module.css";
import Header from "../Header/Header1.jsx";
import Footer from "../Footer/Footer.jsx";
import LoginForm from "./LoginForm.jsx";

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
