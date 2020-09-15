import React from "react";
import styles from "./styles.module.scss";

const MoreButton = ({ show, disabled, onClick }) =>
    show ? (
        <button
            className={styles.moreBtn}
            disabled={disabled}
            onClick={onClick}
        >
            Xem thêm
        </button>
    ) : null;

export default MoreButton;
