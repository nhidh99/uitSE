import React from "react";
import { Label } from "reactstrap";
import styles from "./styles.module.scss";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";

const SuggestBlock = ({ suggestions }) => (
    <section className={styles.block}>
        {suggestions.map((product) => (
            <a href={`/product/${product["alt"]}/${product["id"]}`} className={styles.cell}>
                <img
                    src={`/cxf/api/images/400/laptops/${product["id"]}/${product["alt"]}.jpg`}
                    width={200}
                    height={200}
                    alt="suggest"
                    className={styles.img}
                />
                
                <label className={styles.itemInfo}>
                    <label className={styles.itemRating}>
                        {product["avg_rating"].toFixed(1)}{" "}
                        <FaStar className={styles.icon} size={10} />
                    </label>{" "}
                    - RAM {product["ram"]["size"]}GB - {product["hard_drive"]["type"]}{" "}
                    {product["hard_drive"]["size"] === 1024
                        ? "1TB"
                        : `${product["hard_drive"]["size"]}GB`}
                </label>
                
                <Label className={styles.name}>{product["name"]}</Label>
                <br />
                <Label className={styles.unitPrice}>
                    {product["unit_price"].toLocaleString()}
                    <sup>đ</sup>
                </Label>
                &nbsp;&nbsp;
                <Label className={styles.originPrice}>
                    {(product["unit_price"] + product["discount_price"]).toLocaleString()}
                    <sup>đ</sup>
                </Label>
                <br />
                <Link className={styles.suggest}>So sánh chi tiết</Link>
            </a>
        ))}
    </section>
);

export default SuggestBlock;
