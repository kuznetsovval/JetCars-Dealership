import styles from "../style/BackButton.module.css";
import { useNavigate } from "react-router-dom";

const BackButton = (props) => {
  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate(-1);
  };
  return (
    <div className={styles.ArrowCont}>
      <img
        src={props.src}
        onClick={props.onClick || handleBackClick}
        className={styles.Arrow}
      ></img>
    </div>
  );
};

export default BackButton;
