import React, { memo } from "react";
import LazyLoad from "react-lazyload";
import styles from "./styles.module.scss";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";

const ProductItem = ({ product }) => (
    <Link
        to={{
            pathname: `/product/${product["alt"]}/${product["id"]}`,
            state: { loading: true },
        }}
        className={styles.itemBlock}
    >
        <LazyLoad height={200} offset={100} once>
            <img
                width={200}
                height={200}
                className={styles.itemImg}
                src={`/api/images/400/laptops/${product["id"]}/${product["alt"]}.jpg`}
                alt="Laptop"
            />
        </LazyLoad>

        <label className={styles.itemInfo}>
            <label className={styles.itemRating}>
                {product["avg_rating"].toFixed(1)}{" "}
                <FaStar className={styles.icon} size={10} />
            </label>{" "}
            - RAM {product["ram"]["size"]}GB - {product["hard_drive"]["type"]}{" "}
            {product["hard_drive"]["size"] >= 1024
                ? `${product["hard_drive"]["size"] / 1024}TB`
                : `${product["hard_drive"]["size"]}GB`}
        </label>
        <br />

        <label className={styles.itemName}>{product["name"]}</label>
        <br />

        <label className={styles.itemUnitPrice}>
            {product["unit_price"].toLocaleString()}
            <sup>đ</sup>
        </label>

        <label className={styles.itemOriginPrice}>
            {(
                product["unit_price"] + product["discount_price"]
            ).toLocaleString()}
            <sup>đ</sup>
        </label>
    </Link>
);

export default memo(ProductItem);
