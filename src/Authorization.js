import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./style/App.module.css";
import mainImage from "./assets/mainImage.png";
import logo from "./assets/logo.png";
import Button from "./components/Button";
import Input from "./components/Input";
import Header from "./components/Header";
import ImageColumn from "./components/ImageColumn";
import LabelText from "./components/LabelText";
import { loginUser } from "./UserLogin";

const Authorization = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogIn = async () => {
    setIsLoading(true);
    const isSuccess = await loginUser(name, email, password);
    setIsLoading(false);

    if (isSuccess) {
      navigate("/market");
    } else {
      alert("Ім'я користувача або пароль неправильні. Спробуйте ще раз.");
    }
  };

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
              <Button
                title={isLoading ? "Завантаження..." : "Увійти"}
                functions={handleLogIn}
                disabled={isLoading}
              />
            </div>
            <ImageColumn src={mainImage} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Authorization;
