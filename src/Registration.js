import React, { useState } from "react";
import styles from "./style/Registration.module.css";
import logo from "./assets/logo.png";
import Header from "./components/Header";
import Input from "./components/Input";
import Button from "./components/Button";
import arrow from "./assets/back-arrow.svg";
import { useNavigate } from "react-router-dom";
import BackButton from "./components/BackButton";
import LabelText from "./components/LabelText";
import { registerUser } from "./UserAuth";

const Registration = () => {
  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate(-1);
  };

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    if (!name.trim() || !email.trim() || !password.trim()) {
      alert("Будь ласка, введіть дані перед реєстрацією.");
      return;
    }
    registerUser(name, email, password);
    navigate("/market");
  };

  return (
    <div className={styles.Registration}>
      <Header src={logo} width={"80%"} />
      <div className={styles.CentralRegCont}>
        <div className={styles.Reg}>
          <BackButton src={arrow} onClick={handleBackClick} />
          <div className={styles.LeftSubCont}></div>
          <div className={styles.Reg_Inside}>
            <div className={styles.CentralRegSubCont}>
              <LabelText title={"Реєстрація"} />
              <Input
                type={"text"}
                placeholder={"Введіть ім'я"}
                value={name}
                setState={setName}
              />
              <Input
                type={"email"}
                placeholder={"Введіть електронну адресу"}
                value={email}
                setState={setEmail}
              />
              <Input
                type={"password"}
                placeholder={"Введіть пароль"}
                value={password}
                setState={setPassword}
              />
              <Button title={"Зареєструватися"} functions={handleRegister} />
            </div>
          </div>
          <div className={styles.RightSubCont}></div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
