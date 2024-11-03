import styles from "../style/LabelText.module.css";

const LabelText = (props) => {
  return <h1 className={styles.mainText}>{props.title}</h1>;
};

export default LabelText;
