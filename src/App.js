import styles from "./style/App.module.css";
import mainImage from "./assets/mainImage.png";
import logo from "./assets/logo.png";
import Button from "./components/Button";
import Input from "./components/Input";
import Header from "./components/Header";
import ImageColumn from "./components/ImageColumn";
import LabelText from "./components/LabelText";

const App = () => {
  return (
    <div className={styles.App}>
      <Header
        src={logo}
        href={"/registration"}
        label={"Не маєте акаунту? "}
        title={"Реєстрація"}
      />
      <div className={styles.CentralLoginCont}>
        <div className={styles.LogIn}>
          <div className={styles.LogIn_Inside}>
            <div className={styles.LeftColumn}>
              <LabelText title={"Вхід"} />
              <Input type={"text"} placeholder={"Введіть ім'я"} />
              <Input type={"email"} placeholder={"Введіть електронну адресу"} />
              <Input type={"password"} placeholder={"Введіть пароль"} />
              <Button title={"Увійти"} />
            </div>
            <ImageColumn src={mainImage} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
