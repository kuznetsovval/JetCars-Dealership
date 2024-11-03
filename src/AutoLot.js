import styles from "./style/AutoLot.module.css";
import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import logo from "./assets/logo.png";
import BackButton from "./components/BackButton";
import arrow from "./assets/back-arrow.svg";
import { useNavigate, useParams } from "react-router-dom";
import MenuBar from "./components/MenuBar";
import { motion } from "framer-motion";
import Button from "./components/Button";
import SpecsSection from "./components/SpecsSection";
import AutoDetails from "./components/AutoDetails";
import { doc, setDoc, getDoc, deleteDoc } from "firebase/firestore";
import { db } from "./firebase";
import shop from "./assets/shoppingcart-ico.svg";
import like from "./assets/heart-ico.svg";
import { useAuth } from "./UserLogin";

const AutoLot = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [isActive, setIsActive] = useState(false);

  const toggle = () => setIsActive(!isActive);
  const handleBackClick = () => navigate(-1);

  useEffect(() => {
    const fetchCarData = async () => {
      try {
        const docRef = doc(db, "cars", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setCar(docSnap.data());
        } else {
          console.log("Документ не знайдено!");
        }
      } catch (error) {
        console.error("Помилка завантаження даних:", error);
      }
    };

    if (id) {
      fetchCarData();
    }
  }, [id]);

  const addToWishlist = async () => {
    if (!user) {
      console.log("You don`t enter account");
      return;
    }

    if (!car) {
      console.log("Item is not loaded");
      return;
    }

    try {
      const carRef = doc(db, "cars_wishlist", user.uid);
      const carSnapshot = await getDoc(carRef);

      let carData = carSnapshot.exists() ? carSnapshot.data().items : [];

      const productWithId = { ...car, id };

      const isDuplicate = carData.some((item) => item.id === productWithId.id);
      if (isDuplicate) {
        console.log("Product is already in the wishlist");
        return;
      }

      carData.push(productWithId);

      await setDoc(carRef, { items: carData });
      console.log("Product added into wishlist!");
    } catch (error) {
      console.error("Error product doesn`t add to wishlist: ", error);
    }
  };

  const handlePurchase = async () => {
    if (!id) {
      console.error("ID is missing!");
      return;
    }

    try {
      await deleteDoc(doc(db, "cars", id));
      console.log("Product removed from collection!");
      navigate("/market");
    } catch (error) {
      console.error("Error removing product: ", error);
    }
  };

  if (!car) {
    return <div>Завантаження...</div>;
  }

  return (
    <div className={styles.AutoLot}>
      {isActive && (
        <motion.div
          key="slide"
          initial={{ marginLeft: "100%" }}
          animate={{ marginLeft: "0%" }}
          transition={{ duration: 0.3, ease: "easeOut" }}
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
      <div className={styles.CentralAutoLotCont}>
        <div className={styles.AutoLotSubCont}>
          <BackButton src={arrow} onClick={handleBackClick} />
          <div className={styles.AutoLot_Inside}>
            <div className={styles.LeftColumn}>
              <AutoDetails
                carName={car.name}
                shopIcon={shop}
                addToWishlist={addToWishlist}
                handlePurchase={handlePurchase}
                likeIcon={like}
              />
              <div className={styles.HorizontalStick}></div>
              <SpecsSection
                engine={{
                  type: car.type,
                  capacity: car.capacity,
                  power: car.power,
                  torque: car.torque,
                }}
                performance={{
                  fuelConsumption: car.fuelConsumption,
                  acceleration: car.acceleration,
                  maxSpeed: car.maxSpeed,
                }}
                weightsColor={{
                  weight: car.weight,
                  color: car.color,
                }}
              />
            </div>
            <div className={styles.VertycalStick}></div>
            <div className={styles.RightColumn}>
              <div className={styles.ImageCont}>
                <img
                  src={car.image}
                  className={styles.AutoPhoto}
                  alt={car.name}
                />
              </div>
              <div className={styles.InfoCont}>
                <div className={styles.PriceCont}>{car.price}</div>
                <div className={styles.OdometerCont}>
                  {car.mileage || "Немає інфо"}
                </div>
                <div className={styles.GeoCont}>
                  {car.location || "Немає інфо"}
                </div>
              </div>
              <div className={styles.CommentCont}>
                <div className={styles.CommentSubCont}>
                  <input
                    className={styles.Comment}
                    type="text"
                    placeholder="Введіть коментар"
                  />
                </div>
                <div className={styles.ButtonSubCont}>
                  <Button title="Відправити" />
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

export default AutoLot;
