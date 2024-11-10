import { useState, useEffect } from "react";
import styles from "../style/AutoCard2.module.css";
import star from "../assets/empty-star.svg";
import filledStar from "../assets/star.svg";
import halfStar from "../assets/half-star.svg";
import { db } from "../firebase";
import { doc, getDocs, collection, setDoc } from "firebase/firestore";
import { Link } from "react-router-dom";

const AutoCard2 = (props) => {
  const [hoveredStar, setHoveredStar] = useState(-1);
  const [averageRating, setAverageRating] = useState(0);
  const [userRating, setUserRating] = useState(null);

  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const ratingsRef = collection(db, "ratings");
        const ratingsSnapshot = await getDocs(ratingsRef);
        const ratings = ratingsSnapshot.docs
          .filter((doc) => doc.data().cardId === props.id)
          .map((doc) => doc.data().rating);

        if (ratings.length > 0) {
          const sum = ratings.reduce((acc, rating) => acc + rating, 0);
          const avg = sum / ratings.length;
          setAverageRating(avg);
        }
      } catch (error) {
        console.error("Помилка при отриманні рейтингу:", error);
      }
    };

    fetchRatings();
  }, [props.id]);

  useEffect(() => {
    const checkUserRating = async () => {
      try {
        const userId = props.userId;
        if (userId) {
          const ratingRef = doc(db, "ratings", `${userId}_${props.id}`);
          const ratingSnapshot = await getDocs(ratingRef);
          if (ratingSnapshot.exists()) {
            setUserRating(ratingSnapshot.data().rating);
          }
        }
      } catch (error) {
        console.error("Помилка при перевірці рейтингу користувача:", error);
      }
    };

    checkUserRating();
  }, [props.userId, props.id]);

  const handleMouseEnter = (index) => {
    setHoveredStar(index);
  };

  const handleMouseLeave = () => {
    setHoveredStar(-1);
  };

  const saveRatingToFirebase = async (rating) => {
    try {
      const userId = props.userId;
      const cardId = props.id;

      if (!userId || !cardId) {
        console.error("userId або cardId не визначені");
        return;
      }

      await setDoc(doc(db, "ratings", `${userId}_${cardId}`), {
        userId: userId,
        cardId: cardId,
        rating: rating + 1,
      });
      console.log("Рейтинг збережено!");

      const ratingsRef = collection(db, "ratings");
      const ratingsSnapshot = await getDocs(ratingsRef);
      const ratings = ratingsSnapshot.docs
        .filter((doc) => doc.data().cardId === props.id)
        .map((doc) => doc.data().rating);

      if (ratings.length > 0) {
        const sum = ratings.reduce((acc, rating) => acc + rating, 0);
        const avg = sum / ratings.length;
        setAverageRating(avg);
      }
    } catch (error) {
      console.error("Помилка при збереженні рейтингу:", error);
    }
  };

  const handleStarClick = (index) => {
    saveRatingToFirebase(index);
    setUserRating(index);
  };

  const getStarRating = (rating) => {
    const filledStars = Math.floor(rating);
    const hasHalfStar = rating - filledStars >= 0.5;

    return Array.from({ length: 5 }, (_, index) => {
      const starType =
        index < filledStars
          ? filledStar
          : index === filledStars && hasHalfStar
            ? halfStar
            : star;

      return (
        <img
          key={index}
          src={starType}
          alt="star"
          className={styles.Rating}
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={handleMouseLeave}
          onClick={() => handleStarClick(index)}
        />
      );
    });
  };

  const finalRating = userRating !== null ? userRating + 1 : averageRating;

  return (
    <div className={styles.AutoCardCont2}>
      <div className={styles.AutoCard2}>
        <div className={styles.PrewiewCont}>
          <Link to={`/market/lot/${props.id}`}>
            <img
              src={props.image}
              alt={props.name}
              className={styles.Prewiew}
            />
          </Link>
        </div>
        <div className={styles.Text}>
          <div className={styles.TitleCont}>
            <div className={styles.Title}>{props.name}</div>
          </div>
          <div className={styles.DescriptionCont}>
            <div className={styles.Description}>{props.description}</div>
          </div>
          <div className={styles.PriceRatingCont}>
            <div className={styles.Price}>{props.price}</div>
            <div className={styles.RatingCont}>
              {getStarRating(finalRating)}
            </div>
          </div>
        </div>
        <div className={styles.LikeCont}>
          <img
            src={props.src}
            alt={props.name}
            onClick={props.addToWishlist}
            className={styles.Like}
          />
        </div>
      </div>
    </div>
  );
};

export default AutoCard2;
