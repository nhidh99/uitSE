/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment } from "react";
import styles from "./styles.module.scss";
import ProductInfo from "./components/ProductInfo";
import ProductImages from "./components/ProductImages";

const OverviewBlock = () => {
    return (
        <Fragment>
            <div className={styles.blockLeft}>
                <ProductImages />
            </div>

            <div className={styles.blockRight}>
                <ProductInfo />
            </div>
        </Fragment>
    );
};

export default OverviewBlock;
