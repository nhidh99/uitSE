import React from "react";
import { Label } from "reactstrap";
import styles from "./styles.module.scss";
import { Link, useParams } from "react-router-dom";
import { FaStar } from "react-icons/fa";

const SuggestBlock = ({ suggestions }) => {
    const { alt, id } = useParams();

    return (
        <section className={styles.block}>
            {suggestions.map((product) => (
                <div className={styles.cell}>
                    <a href={`/product/${product["alt"]}/${product["id"]}`}>
                        <div className={styles.redirect}>
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
                        </div>
                    </a>
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
                    <Link
                        to={`/product/compare/${alt}-vs-${product["alt"]}/${id}/${product["id"]}`}
                        className={styles.suggest}
                    >
                        So sánh chi tiết
                    </Link>
                </div>
            ))}
        </section>
    );
};

export default SuggestBlock;
