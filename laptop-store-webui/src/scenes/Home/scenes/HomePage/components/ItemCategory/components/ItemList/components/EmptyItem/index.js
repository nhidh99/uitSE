import React from "react";
import styles from "./styles.module.scss";
import "react-placeholder/lib/reactPlaceholder.css";
import ReactPlaceholder from "react-placeholder/lib";

const EmptyItem = () => (
    <div className={styles.itemBlock}>
        <ReactPlaceholder
            type="rect"
            className={styles.imgHolder}
            showLoadingAnimation
        />
        {[...Array(4)].map((_) => (
            <ReactPlaceholder type="textRow" showLoadingAnimation />
        ))}
    </div>
);

export default EmptyItem;