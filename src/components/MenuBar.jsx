import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../style/MenuBar.module.css";
import avatar from "../assets/avatar.png";
import ico1 from "../assets/homepage-ico.svg";
import ico2 from "../assets/wishlist-ico.svg";
import ico3 from "../assets/helpcenter-ico.svg";
import ico4 from "../assets/signout-ico.svg";
import ButtonMenuBar from "./ButtonMenuBar";
import { auth } from "../firebase";
import { getUserFromDatabase } from "../UserDataBase";
import { onAuthStateChanged, signOut } from "firebase/auth";

const MenuBar = (props) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const data = await getUserFromDatabase(user.uid);
        setUserData(data);
      } else {
        setUserData(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      console.log("User signed out successfully");
      navigate("/market");
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  const handleNavigateToMarket = () => {
    navigate("/market");
  };

  const handleNavigateToWishlist = () => {
    if (userData) {
      navigate("/wishlist");
    }
  };

  const handleNavigateToLogIn = () => {
    if (!userData) {
      navigate("/");
    }
  };

  if (loading) {
    return console.log("Завантаження...");
  }

  return (
    <div className={styles.MenuBarCont}>
      <div className={styles.MenuBar}>
        <div className={styles.Account}>
          <div className={styles.AvatarCont}>
            <img src={avatar} className={styles.Avatar} />
          </div>
          <div className={styles.Text}>
            <div className={styles.UserNameCont}>
              <div className={styles.UserName}>
                {userData ? userData.name : "Гість"}
              </div>
            </div>
            <div className={styles.EmailCont}>
              <div className={styles.Email}>
                {userData ? userData.email : ""}
              </div>
            </div>
          </div>
        </div>
        <ButtonMenuBar
          src={ico1}
          title={"Головна сторінка"}
          onClick={handleNavigateToMarket}
        />
        <ButtonMenuBar
          src={ico2}
          title={"Список вподобань"}
          onClick={handleNavigateToWishlist}
          disabled={!userData}
          href
        />
        <ButtonMenuBar
          src={ico3}
          title={"Реєстрація/Вхід"}
          onClick={handleNavigateToLogIn}
        />
        <ButtonMenuBar src={ico4} title={"Вийти"} onClick={handleSignOut} />
      </div>
    </div>
  );
};

export default MenuBar;
