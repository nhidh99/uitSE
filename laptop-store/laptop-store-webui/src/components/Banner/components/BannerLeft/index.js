import React from "react";
import styles from "./styles.module.scss";
import BannerLogo from "./components/BannerLogo";
import BannerSearch from "./components/BannerSearch";

const BannerLeft = () => (
    <div className={styles.bannerLeft}>
        <BannerLogo />
        <BannerSearch />
    </div>
);

export default BannerLeft;
