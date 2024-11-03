import styles from "./style/Wishlist.module.css";
import React, { useState } from "react";
import Header from "./components/Header";
import logo from "./assets/logo.png";
import BackButton from "./components/BackButton";
import arrow from "./assets/back-arrow.svg";
import { useNavigate } from "react-router-dom";
import cancel from "./assets/cancel-button.svg";
import prewiew1 from "./assets/prewiew1.jpg";
import prewiew2 from "./assets/prewiew2.jpg";
import prewiew3 from "./assets/prewiew3.jpg";
import prewiew4 from "./assets/prewiew4.jpg";
import prewiew5 from "./assets/prewiew5.jpg";
import prewiew6 from "./assets/prewiew6.jpg";
import prewiew7 from "./assets/prewiew7.jpg";
import prewiew8 from "./assets/prewiew8.jpg";
import prewiew9 from "./assets/prewiew9.png";
import AutoCard from "./components/AutoCard";
import MenuBar from "./components/MenuBar";
import LabelText from "./components/LabelText";
import NavigateBar from "./components/NavigateBar";
import { motion } from "framer-motion";

const Wishlist = () => {
  const navigate = useNavigate();
  const handleBackClick = () => {
    navigate(-1);
  };

  const [isActive, setIsActive] = useState(false);
  const toggle = () => setIsActive(!isActive);

  const [currentPage, setCurrentPage] = useState(0);
  const cardsPerPage = 6;

  const autoCards = [
    { href: prewiew1, title: "BMW M5 E60 `07", price: "$30.000" },
    { href: prewiew3, title: "BMW M3 G81 Touring `22", price: "$140.000" },
    { href: prewiew4, title: "Porsche 911 992 Stinger GTR", price: "$222.000" },
    { href: prewiew2, title: "BMW M5 F90 LCI `21", price: "$129.000" },
    { href: prewiew5, title: "MB C63 AMG W213", price: "$85.000" },
    { href: prewiew6, title: "Nissan GT-R `15", price: "$99.000" },
    { href: prewiew7, title: "Lamborghini Urus", price: "$99.000" },
    { href: prewiew8, title: "Toyota LC 300", price: "$99.000" },
    { href: prewiew9, title: "Audi RS6 C7", price: "$99.000" },
  ];

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
          <MenuBar name={"Galaxy2801"} email={"kuznetsov@gmail.com"} />
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
                {leftColumnCards.map((card, index) => (
                  <AutoCard
                    key={index}
                    href={card.href}
                    title={card.title}
                    price={card.price}
                    src={cancel}
                  />
                ))}
              </div>
              <div className={styles.RightColumn}>
                {rightColumnCards.map((card, index) => (
                  <AutoCard
                    key={index}
                    href={card.href}
                    title={card.title}
                    price={card.price}
                    src={cancel}
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
