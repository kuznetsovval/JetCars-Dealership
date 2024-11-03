import React, { useState, useEffect } from "react";
import { collection, getDocs, doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "./firebase";
import AutoCard2 from "./components/AutoCard2";
import MenuBar from "./components/MenuBar";
import styles from "./style/MainPage.module.css";
import Header from "./components/Header";
import { motion } from "framer-motion";
import logo from "./assets/logo.png";
import like from "./assets/heart-ico.svg";
import { useAuth } from "./UserLogin";
import { useNavigate } from "react-router-dom";

const MainPage = () => {
  const [carData, setCarData] = useState([]);
  const [isActive, setIsActive] = useState(false);
  const [filteredData, setFilteredData] = useState([]);

  const { user } = useAuth();
  const navigate = useNavigate();

  const toggle = () => {
    setIsActive(!isActive);
  };

  const handleFilter = (type) => {
    let sortedData;
    if (type === "expensive") {
      sortedData = [...carData].sort(
        (a, b) =>
          parseInt(b.price.replace(/[^0-9]/g, "")) -
          parseInt(a.price.replace(/[^0-9]/g, "")),
      );
    } else if (type === "cheap") {
      sortedData = [...carData].sort(
        (a, b) =>
          parseInt(a.price.replace(/[^0-9]/g, "")) -
          parseInt(b.price.replace(/[^0-9]/g, "")),
      );
    }
    setFilteredData(sortedData);
  };

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "cars"));
      const carsArray = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCarData(carsArray);
      setFilteredData(carsArray);
    };

    fetchData();
  }, []);

  const addToWishlist = async (product) => {
    if (!user) {
      alert("You are not logged in");
      return;
    }

    try {
      const carRef = doc(db, "cars_wishlist", user.uid);
      const carSnapshot = await getDoc(carRef);

      let carData = carSnapshot.exists() ? carSnapshot.data().items : [];

      const isAlreadyInWishlist = carData.some((car) => car.id === product.id);

      if (!isAlreadyInWishlist) {
        const productWithId = { ...product, id: product.id };
        carData.push(productWithId);

        await setDoc(carRef, { items: carData });
        console.log("Product added to wishlist.");
      } else {
        console.log("Product already exists in the wishlist.");
      }
    } catch (error) {
      console.error("Error adding to wishlist: ", error);
    }
  };

  const handleCarClick = (carId) => {
    navigate(`/market/lot/${carId}`);
  };

  const midIndex = Math.ceil(filteredData.length / 2);
  const leftCars = filteredData.slice(0, midIndex);
  const rightCars = filteredData.slice(midIndex);

  return (
    <div className={styles.MainPage}>
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
        filterText={"Фільтрування по ціні"}
        width={"80%"}
        isActive={isActive}
        onFilter={handleFilter}
      />
      <div className={styles.CentralMainPageCont}>
        <div className={styles.CentralSubCont}>
          <div className={styles.LeftCont}>
            {leftCars.map((car) => (
              <AutoCard2
                key={car.id}
                {...car}
                onClick={() => handleCarClick(car.id)}
                src={like}
                addToWishlist={() => addToWishlist(car)}
              />
            ))}
          </div>
          <div className={styles.RightCont}>
            {rightCars.map((car) => (
              <AutoCard2
                key={car.id}
                {...car}
                onClick={() => handleCarClick(car.id)}
                src={like}
                addToWishlist={() => addToWishlist(car)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
