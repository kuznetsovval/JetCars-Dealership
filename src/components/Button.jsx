import styles from "../style/Button.module.css";

const Button = (props) => {
  return (
    <div className={styles.SignUpButtonCont}>
      <button className={styles.SignUpButton}>{props.title}</button>
    </div>
  );
};

export default Button;
