import React from "react";
import styles from "../style/AutoDetails.module.css";

const AutoDetails = ({
  carName,
  shopIcon,
  likeIcon,
  addToWishlist,
  handlePurchase,
}) => (
  <div className={styles.LabelCont}>
    <div className={styles.MainCont}>
      <div className={styles.LabelText}>{carName}</div>
      <div className={styles.PurchaseCont}>
        <img
          src={shopIcon}
          className={styles.Purchase}
          onClick={handlePurchase}
          alt="Purchase"
        />
      </div>
      <div className={styles.WishlistCont}>
        <img
          src={likeIcon}
          className={styles.Like}
          onClick={addToWishlist}
          alt="Like"
        />
      </div>
    </div>
    <div className={styles.RatingCont}></div>
  </div>
);

export default AutoDetails;
