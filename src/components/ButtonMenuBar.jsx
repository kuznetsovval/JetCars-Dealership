import styles from "../style/ButtonMenuBar.module.css";

const ButtonMenuBar = (props) => {
  return (
    <div className={styles.Cont}>
      <div className={styles.SubCont}>
        <button className={styles.MenuBarButton}>
          <div className={styles.ButtonImg}>
            <img src={props.src} className={styles.Icon} />
          </div>
          <div className={styles.ButtonText}>{props.title}</div>
        </button>
      </div>
    </div>
  );
};

export default ButtonMenuBar;
