/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import styles from "./styles.module.scss";
import ItemList from "./components/ItemList";

const ItemCategory = ({ title, category }) => (
    <div className={styles.category}>
        <header className={styles.categoryHeader}>{title}</header>
        <div className={styles.container}>
            <ItemList category={category} />
        </div>
    </div>
);

export default ItemCategory;
