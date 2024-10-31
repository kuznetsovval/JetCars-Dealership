import styles from "./style/MainPage.module.css";
import React, { useState } from "react";
import Header from "./components/Header";
import logo from "./assets/logo.png";
import { useNavigate } from "react-router-dom";
import MenuBar from "./components/MenuBar";
import { motion } from "framer-motion";
import AutoCard2 from "./components/AutoCard2";
import like from "./assets/heart-ico.svg";
import prewiew1 from "./assets/prewiew1.jpg";
import prewiew2 from "./assets/prewiew2.jpg";
import prewiew3 from "./assets/prewiew3.jpg";
import prewiew4 from "./assets/prewiew4.jpg";
import prewiew5 from "./assets/prewiew5.jpg";
import prewiew6 from "./assets/prewiew6.jpg";
import prewiew7 from "./assets/prewiew7.jpg";
import prewiew8 from "./assets/prewiew8.jpg";

const carData = [
    {
        href: prewiew1,
        title: "BMW M5 E60",
        description: "Продається BMW M5 E60 '07 у відмінному стані з спортивним вихлопом, кованими дисками та мінімальними слідами використання.",
        price: "$30.000",
        src: like,
    },
    {
        href: prewiew2,
        title: "BMW M5 E60",
        description: "Продається BMW M5 E60 '07 у відмінному стані з спортивним вихлопом, кованими дисками та мінімальними слідами використання.",
        price: "$30.000",
        src: like,
    },
    {
        href: prewiew3,
        title: "BMW M5 E60",
        description: "Продається BMW M5 E60 '07 у відмінному стані з спортивним вихлопом, кованими дисками та мінімальними слідами використання.",
        price: "$30.000",
        src: like,
    },
    {
        href: prewiew4,
        title: "BMW M5 E60",
        description: "Продається BMW M5 E60 '07 у відмінному стані з спортивним вихлопом, кованими дисками та мінімальними слідами використання.",
        price: "$30.000",
        src: like,
    },
    {
        href: prewiew5,
        title: "BMW M5 E60",
        description: "Продається BMW M5 E60 '07 у відмінному стані з спортивним вихлопом, кованими дисками та мінімальними слідами використання.",
        price: "$30.000",
        src: like,
    },
    {
        href: prewiew6,
        title: "BMW M5 E60",
        description: "Продається BMW M5 E60 '07 у відмінному стані з спортивним вихлопом, кованими дисками та мінімальними слідами використання.",
        price: "$30.000",
        src: like,
    },
    {
        href: prewiew7,
        title: "BMW M5 E60",
        description: "Продається BMW M5 E60 '07 у відмінному стані з спортивним вихлопом, кованими дисками та мінімальними слідами використання.",
        price: "$30.000",
        src: like,
    },
    {
        href: prewiew8,
        title: "BMW M5 E60",
        description: "Продається BMW M5 E60 '07 у відмінному стані з спортивним вихлопом, кованими дисками та мінімальними слідами використання.",
        price: "$30.000",
        src: like,
    },
];

const MainPage = () => {
    const navigate = useNavigate();
    const handleBackClick = () => {
        navigate(-1);
    };

    const [isActive, setIsActive] = useState(false);

    const toggle = () => {
        setIsActive(!isActive);
    };

    const midIndex = Math.ceil(carData.length / 2);
    const leftCars = carData.slice(0, midIndex);
    const rightCars = carData.slice(midIndex);

    return (
        <div className={styles.MainPage}>
            {isActive && (
                <motion.div
                    key="slide"
                    initial={{ marginLeft: "100%" }}
                    animate={{ marginLeft: isActive ? "0%" : "100%" }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                >
                    <MenuBar name={"Galaxy2801"} email={"kuznetsov@gmail.com"} />
                </motion.div>
            )}
            <Header toggle={toggle} src={logo} text={"Меню"} filterText={"Фільтрування по ціні"} width={"80%"} isActive={isActive} />
            <div className={styles.CentralMainPageCont}>
                <div className={styles.CentralSubCont}>
                    <div className={styles.LeftCont}>
                        {leftCars.map((car, index) => (
                            <AutoCard2 key={index} {...car} />
                        ))}
                    </div>
                    <div className={styles.RightCont}>
                        {rightCars.map((car, index) => (
                            <AutoCard2 key={index} {...car} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainPage;
