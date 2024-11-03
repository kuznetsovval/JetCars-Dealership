import styles from "../style/AutoCard.module.css";
import { Link } from "react-router-dom";

const AutoCard = (props) => {
  return (
    <div className={styles.AutoCardCont}>
      <div className={styles.AutoCard}>
        <div className={styles.PrewiewCont}>
          <Link to={`/wishlist/lot/${props.id}`}>
            <img src={props.href} alt={props.alt} className={styles.Prewiew} />
          </Link>
        </div>
        <div className={styles.Text}>
          <div className={styles.TitleCont}>
            <div className={styles.Title}>{props.title}</div>
          </div>
          <div className={styles.PriceCont}>
            <div className={styles.Price}>{props.price}</div>
          </div>
        </div>
        <div className={styles.CancelCont}>
          <img
            src={props.src}
            alt={props.name}
            onClick={props.removeFromWishlist}
            className={styles.Cancel}
          />
        </div>
      </div>
    </div>
  );
};

export default AutoCard;
