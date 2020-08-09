import React from "react";
import styles from "./styles.module.scss";
import BannerLeft from "./components/BannerLeft";
import BannerRight from "./components/BannerRight";

const Banner = () => (
    <div className={styles.container}>
        <div className={styles.banner}>
            <BannerLeft />
            <BannerRight />
        </div>
    </div>
);

export default Banner;
