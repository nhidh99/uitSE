import React, { Fragment } from "react";
import { Label } from "reactstrap";
import Rating from "react-rating";
import { FaStar } from "react-icons/fa";
import styles from "./styles.module.scss";
import { useSelector } from "react-redux";

const OverviewInfo = () => {
    const product = useSelector((state) => state.productDetail.product);
    return (
        <Fragment>
            <div id="product-name">
                <Label className={styles.productName}>
                    Laptop {product["name"]}
                </Label>
                <Rating
                    initialRating={product["avg_rating"]}
                    readonly
                    fullSymbol={
                        <FaStar color="#ffc120" className={styles.ratingIcon} />
                    }
                    emptySymbol={
                        <FaStar color="#ddd" className={styles.ratingIcon} />
                    }
                />
            </div>

            <div id="product-price">
                <Label className={styles.currentPrice}>
                    {product["unit_price"].toLocaleString()}đ
                </Label>
                <Label className={styles.originPrice}>
                    {(
                        product["unit_price"] + product["discount_price"]
                    ).toLocaleString()}
                    đ
                </Label>
                <Label className={styles.discountPrice}>
                    (Giảm {product["discount_price"].toLocaleString()}đ)
                </Label>
            </div>
        </Fragment>
    );
};

export default OverviewInfo;
