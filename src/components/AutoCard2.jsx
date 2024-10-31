import { useState } from "react";
import styles from "../style/AutoCard2.module.css";
import star from "../assets/empty-star.svg";
import filledStar from "../assets/star.svg";

const AutoCard2 = (props) => {
    const [hoveredStar, setHoveredStar] = useState(null);

    const handleMouseEnter = (index) => {
        setHoveredStar(index);
    };

    const handleMouseLeave = () => {
        setHoveredStar(null);
    };

    return (
        <div className={styles.AutoCardCont2}>
            <div className={styles.AutoCard2}>
                <div className={styles.PrewiewCont}>
                    <img src={props.href} alt={props.alt} className={styles.Prewiew}/>
                </div>
                <div className={styles.Text}>
                    <div className={styles.TitleCont}>
                        <div className={styles.Title}>{props.title}</div>
                    </div>
                    <div className={styles.DescriptionCont}>
                        <div className={styles.Description}>
                            {props.description}
                        </div>
                    </div>
                    <div className={styles.PriceRatingCont}>
                        <div className={styles.Price}>{props.price}</div>
                        <div className={styles.RatingCont}>
                            {[...Array(5)].map((_, index) => (
                                <img
                                    key={index}
                                    src={index <= hoveredStar ? filledStar : star}
                                    alt="star"
                                    className={styles.Rating}
                                    onMouseEnter={() => handleMouseEnter(index)}
                                    onMouseLeave={handleMouseLeave}
                                />
                            ))}
                        </div>
                    </div>
                </div>
                <div className={styles.LikeCont}>
                    <img src={props.src} alt={props.name} className={styles.Like}/>
                </div>
            </div>
        </div>
    );
};

export default AutoCard2;
