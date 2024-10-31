import styles from "./style/Registration.module.css";
import logo from "./assets/logo.png";
import Header from "./components/Header";
import Input from "./components/Input";
import Button from "./components/Button";
import arrow from "./assets/back-arrow.svg";
import { useNavigate } from "react-router-dom";
import BackButton from "./components/BackButton";
import LabelText from "./components/LabelText";

const Registration = () => {
  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate(-1);
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
              <Input type={"text"} placeholder={"Введіть ім'я"} />
              <Input type={"email"} placeholder={"Введіть електронну адресу"} />
              <Input type={"password"} placeholder={"Введіть пароль"} />
              <Button title={"Зареєструватися"} />
            </div>
          </div>
          <div className={styles.RightSubCont}></div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
