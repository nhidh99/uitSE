import React from "react";
import styles from "./styles.module.scss";
import BannerLeft from "./BannerLeft";
import BannerRight from "./BannerRight";

const Banner = ({role}) => (
    <div className={styles.container}>
        <div className={styles.banner}>
            <BannerLeft />
            <BannerRight role={role} />
        </div>
    </div>
);

export default Banner;
