import styles from "../style/Input.module.css";

const Input = (props) => {
  return (
    <div className={styles.InputCont}>
      <input
        className={styles.InputId}
        type={props.type}
        placeholder={props.placeholder}
      ></input>
    </div>
  );
};

export default Input;
