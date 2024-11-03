import styles from "../style/ImageColumn.module.css";

const ImageColumn = (props) => {
  return (
    <div className={styles.RightColumn}>
      <img className={styles.mainImage} src={props.src}></img>
    </div>
  );
};

export default ImageColumn;
