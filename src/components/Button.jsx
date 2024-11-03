import React, { useState } from "react";
import styles from "../style/Button.module.css";
import { useNavigate } from "react-router-dom";

const Button = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const goToSignUp = () => {
    if (props.link) {
      navigate(props.link);
    }
  };

  const handleButton = async () => {
    setIsLoading(true);
    if (props.functions) {
      await props.functions();
    }
    setIsLoading(false);
    goToSignUp();
  };

  return (
    <div className={styles.SignUpButtonCont}>
      <button
        className={styles.SignUpButton}
        onClick={handleButton}
        disabled={isLoading}
      >
        {props.title}
        {isLoading && <div className={styles.LoadingBar}></div>}
      </button>
    </div>
  );
};

export default Button;
