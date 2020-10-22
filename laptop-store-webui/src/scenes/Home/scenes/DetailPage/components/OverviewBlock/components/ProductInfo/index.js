import React from "react";
import OverviewInfo from "./components/OverviewInfo";
import SpecInfo from "./components/SpecInfo";
import PromotionInfo from "./components/PromotionInfo";
import ActionInfo from "./components/ActionInfo";
import styles from "./styles.module.scss";

const ProductInfo = () =>
    [<OverviewInfo />, <SpecInfo />, <PromotionInfo />, <ActionInfo />].map((info) => (
        <div className={styles.blockChild}>{info}</div>
    ));

export default ProductInfo;
