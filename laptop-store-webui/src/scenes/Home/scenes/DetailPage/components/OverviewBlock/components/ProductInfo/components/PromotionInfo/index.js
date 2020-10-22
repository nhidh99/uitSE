import React, { Fragment } from "react";
import { Label } from "reactstrap";
import styles from "./styles.module.scss";
import { useSelector } from "react-redux";

const PromotionInfo = () => {
    const promotions = useSelector((state) => state.productDetail.promotions);
    return promotions.length > 0 ? (
        <Fragment>
            <Label className={styles.label}>Quà khuyến mãi</Label>
            {promotions.map((promotion) => (
                <div className={styles.item}>
                    <img
                        src={`/api/images/200/promotions/${promotion["id"]}/${promotion["alt"]}.jpg`}
                        className={styles.img}
                        alt="promotions"
                        title={promotion["name"]}
                    />
                    <label className={styles.name}>
                        {promotion["name"]} <i>({promotion["price"].toLocaleString()}đ)</i>
                    </label>
                </div>
            ))}
        </Fragment>
    ) : null;
};

export default PromotionInfo;
