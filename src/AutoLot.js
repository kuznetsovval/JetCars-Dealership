import styles from "./style/AutoLot.module.css";
import React, { useState } from "react";
import Header from "./components/Header";
import logo from "./assets/logo.png";
import BackButton from "./components/BackButton";
import arrow from "./assets/back-arrow.svg";
import { useNavigate } from "react-router-dom";
import MenuBar from "./components/MenuBar";
import { motion } from "framer-motion";
import shop from "./assets/shoppingcart-ico.svg"
import like from "./assets/heart-ico.svg"
import photo from "./assets/prewiew2.jpg"
import Button from "./components/Button";

const Wishlist = () => {
    const navigate = useNavigate();
    const handleBackClick = () => {
        navigate(-1);
    };

    const [isActive, setIsActive] = useState(false);
    const toggle = () => setIsActive(!isActive);

    return (
        <div className={styles.AutoLot}>
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
            <div className={styles.CentralAutoLotCont}>
                <div className={styles.AutoLotSubCont}>
                    <BackButton src={arrow} onClick={handleBackClick} />
                    <div className={styles.AutoLot_Inside}>
                        <div className={styles.LeftColumn}>
                            <div className={styles.LabelCont}>
                                <div className={styles.MainCont}>
                                    <div className={styles.LabelText}>
                                        BMW M5 E60
                                    </div>
                                    <div className={styles.PurchaseCont}>
                                        <img src={shop} className={styles.Purchase} />
                                    </div>
                                    <div className={styles.WishlistCont}>
                                        <img src={like} className={styles.Like}/>
                                    </div>
                                </div>
                                <div className={styles.RatingCont}>

                                </div>
                            </div>
                            <div className={styles.HorizontalStick}>

                            </div>
                            <div className={styles.SpecsCont}>
                                <div className={styles.EngineCont}>
                                    <div className={styles.EngineText}>
                                        Двигун
                                    </div>
                                    <div className={styles.TypeCont}>
                                        Тип
                                    </div>
                                    <div className={styles.CapacityCont}>
                                        Об'єм
                                    </div>
                                    <div className={styles.PowerCont}>
                                        Потужність
                                    </div>
                                    <div className={styles.TorqueCont}>
                                        Крутний момент
                                    </div>
                                </div>
                                <div className={styles.PerformanceCont}>
                                    <div className={styles.PerformanceText}>
                                        Продуктивність
                                    </div>
                                    <div className={styles.FuelCont}>
                                        Розхід
                                    </div>
                                    <div className={styles.AccelerationCont}>
                                        Розгін 0-100 км/ч
                                    </div>
                                    <div className={styles.SpeedCont}>
                                        Максимальна швидкість
                                    </div>
                                </div>
                                <div className={styles.WeightsColorCont}>
                                    <div className={styles.WeightsColorText}>
                                        Вага та колір
                                    </div>
                                    <div className={styles.WeightCont}>
                                        Суха вага
                                    </div>
                                    <div className={styles.ColorCont}>
                                        Колір
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.VertycalStick}>

                        </div>
                        <div className={styles.RightColumn}>
                            <div className={styles.ImageCont}>
                                <img src={photo} className={styles.AutoPhoto} />
                            </div>
                            <div className={styles.InfoCont}>
                                <div className={styles.PriceCont}>
                                    $30.000
                                </div>
                                <div className={styles.OdometerCont}>
                                    55 KM пробігу
                                </div>
                                <div className={styles.GeoCont}>
                                    м. Ужгород
                                </div>
                            </div>
                            <div className={styles.CommentCont}>
                                <div className={styles.CommentSubCont}>
                                    <input className={styles.Comment} type={"text"} placeholder={"Введіть коментар"}/>
                                </div>
                                <div className={styles.ButtonSubCont}>
                                    <Button title={"Відправити"}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.RightSubCont}></div>
                </div>
            </div>
        </div>
    );
};

export default Wishlist;
