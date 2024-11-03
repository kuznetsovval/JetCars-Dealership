import styles from "./style/Wishlist.module.css";
import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import logo from "./assets/logo.png";
import BackButton from "./components/BackButton";
import arrow from "./assets/back-arrow.svg";
import { useNavigate } from "react-router-dom";
import cancel from "./assets/cancel-button.svg";
import AutoCard from "./components/AutoCard";
import MenuBar from "./components/MenuBar";
import LabelText from "./components/LabelText";
import NavigateBar from "./components/NavigateBar";
import { motion } from "framer-motion";
import { db } from "./firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useAuth } from "./UserLogin";

const Wishlist = () => {
  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate(-1);
  };

  const { user } = useAuth();
  const [isActive, setIsActive] = useState(false);
  const [autoCards, setCars] = useState([]);
  const toggle = () => setIsActive(!isActive);

  const [currentPage, setCurrentPage] = useState(0);
  const cardsPerPage = 6;

  const totalPages = Math.ceil(autoCards.length / cardsPerPage);

  const handleNext = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  useEffect(() => {
    const fetchCarsItems = async () => {
      if (!user) return;

      try {
        const cartRef = doc(db, "cars_wishlist", user.uid);
        const cartSnapshot = await getDoc(cartRef);

        if (cartSnapshot.exists()) {
          setCars(cartSnapshot.data().items);
        } else {
          console.log("Список вподобань пустий");
          setCars([]);
        }
      } catch (error) {
        console.error("Помилка при завантаженні списку вподобань:", error);
      }
    };

    fetchCarsItems();
  }, [user]);

  const removeFromWishlist = async (idToRemove) => {
    if (!user) return;

    try {
      const updatedCartItems = autoCards.filter(
        (item) => item.id !== idToRemove,
      );
      setCars(updatedCartItems);

      const carRef = doc(db, "cars_wishlist", user.uid);
      await updateDoc(carRef, { items: updatedCartItems });
    } catch (error) {
      console.error("Помилка при видаленні авто зі списку вподобань:", error);
    }
  };

  const startIndex = currentPage * cardsPerPage;
  const currentCards = autoCards.slice(startIndex, startIndex + cardsPerPage);

  const midIndex = Math.ceil(currentCards.length / 2);
  const leftColumnCards = currentCards.slice(0, midIndex);
  const rightColumnCards = currentCards.slice(midIndex, currentCards.length);

  return (
    <div className={styles.Wishlist}>
      {isActive && (
        <motion.div
          key="slide"
          initial={{ marginLeft: "100%" }}
          animate={{ marginLeft: isActive ? "0%" : "100%" }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <MenuBar />
        </motion.div>
      )}
      <Header
        toggle={toggle}
        src={logo}
        text={"Меню"}
        width={"80%"}
        isActive={isActive}
      />
      <div className={styles.CentralWishlistCont}>
        <div className={styles.WishlistSubCont}>
          <BackButton src={arrow} onClick={handleBackClick} />
          <div className={styles.Wishlist_Inside}>
            <div className={styles.LabelCont}>
              <LabelText title={"Список вподобань"} />
            </div>
            <div className={styles.AutoCardCont}>
              <div className={styles.LeftColumn}>
                {leftColumnCards.map((car) => (
                  <AutoCard
                    key={car.id}
                    href={car.image}
                    title={car.name}
                    price={car.price}
                    src={cancel}
                    id={car.id}
                    removeFromWishlist={() => removeFromWishlist(car.id)}
                  />
                ))}
              </div>
              <div className={styles.RightColumn}>
                {rightColumnCards.map((car) => (
                  <AutoCard
                    key={car.id}
                    href={car.image}
                    title={car.name}
                    price={car.price}
                    src={cancel}
                    id={car.id}
                    removeFromWishlist={() => removeFromWishlist(car.id)}
                  />
                ))}
              </div>
            </div>
            <NavigateBar
              onPrevious={handlePrevious}
              onNext={handleNext}
              currentPage={currentPage}
              totalPages={totalPages}
            />
          </div>
          <div className={styles.RightSubCont}></div>
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
