import React, { useState, useRef, useEffect } from "react";
import styles from "../style/Header.module.css";
import { Link } from "react-router-dom";

const Header = (props) => {
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef(null);

    const toggleDropdown = () => {
        setShowDropdown((prev) => !prev);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className={styles.LogoCont}>
            <div className={styles.LogoSubCont}>
                <img src={props.src} alt={props.alt} className={styles.logo} />
            </div>
            <div className={styles.CenterSubCont}>
                <a
                    className={`${styles.MenuText} ${props.isActive ? styles.active : ""}`}
                    onClick={props.toggle}
                >
                    {props.text}
                </a>
            </div>
            <div className={styles.RegisterTextCont}>
                <div className={styles.FilterText} onClick={toggleDropdown}>
                    <a className={styles.filterLink}>{props.filterText}</a>
                </div>
                {showDropdown && (
                    <div className={styles.dropdown} ref={dropdownRef}>
                        <a className={styles.dropdownItem}>Від дорогих</a>
                        <a className={styles.dropdownItem}>Від дешевих</a>
                    </div>
                )}
                <div className={styles.RegisterText}>
                    {props.label}
                    <Link to={props.href} className={styles.registerLink}>
                        {props.title}
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Header;
