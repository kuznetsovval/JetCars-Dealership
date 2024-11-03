import { useState } from "react";
import styles from "../style/Input.module.css";
import eyeIcon from "../assets/eye-ico.svg";
import eyeSlashIcon from "../assets/eye-slash-ico.svg";

const Input = (props) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <div className={styles.InputCont}>
      <input
        className={styles.InputId}
        type={
          props.type === "password" && !isPasswordVisible ? "password" : "text"
        }
        placeholder={props.placeholder}
        value={props.value}
        onChange={(e) => props.setState(e.target.value)}
      />
      {props.type === "password" && (
        <img
          src={isPasswordVisible ? eyeIcon : eyeSlashIcon}
          alt={isPasswordVisible ? "Приховати пароль" : "Показати пароль"}
          className={styles.EyeIcon}
          onClick={togglePasswordVisibility}
          role="button"
        />
      )}
    </div>
  );
};

export default Input;
