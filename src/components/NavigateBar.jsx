import styles from "../style/NavigateBar.module.css";
import ico from "../assets/navigate-arrow-ico.svg";

const NavigateBar = ({ onPrevious, onNext, currentPage, totalPages }) => {
  return (
    <div className={styles.NavigateBarCont}>
      <div className={styles.PreviousCont} onClick={onPrevious}>
        <img src={ico} className={styles.PreviousArrow} alt="Previous" />
      </div>
      <div className={styles.CountCont}>
        {currentPage + 1} / {totalPages}
      </div>
      <div className={styles.NextCont} onClick={onNext}>
        <img src={ico} className={styles.NextArrow} alt="Next" />
      </div>
    </div>
  );
};

export default NavigateBar;
