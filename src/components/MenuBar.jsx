import styles from "../style/MenuBar.module.css";
import avatar from "../assets/avatar.png";
import ico1 from "../assets/homepage-ico.svg";
import ico2 from "../assets/wishlist-ico.svg";
import ico3 from "../assets/helpcenter-ico.svg";
import ico4 from "../assets/signout-ico.svg";
import ButtonMenuBar from "./ButtonMenuBar";

const MenuBar = (props) => {
  return (
    <div className={styles.MenuBarCont}>
      <div className={styles.MenuBar}>
        <div className={styles.Account}>
          <div className={styles.AvatarCont}>
            <img src={avatar} className={styles.Avatar} />
          </div>
          <div className={styles.Text}>
            <div className={styles.UserNameCont}>
              <div className={styles.UserName}>{props.name}</div>
            </div>
            <div className={styles.EmailCont}>
              <div className={styles.Email}>{props.email}</div>
            </div>
          </div>
        </div>
        <ButtonMenuBar src={ico1} title={"Головна сторінка"} />
        <ButtonMenuBar src={ico2} title={"Список вподобань"} />
        <ButtonMenuBar src={ico3} title={"Допомога"} />
        <ButtonMenuBar src={ico4} title={"Вийти"} />
      </div>
    </div>
  );
};
export default MenuBar;
