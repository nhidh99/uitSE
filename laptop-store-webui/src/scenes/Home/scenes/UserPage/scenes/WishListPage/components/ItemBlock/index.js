/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Col, Row, Label, Button } from "reactstrap";
import { FaTrashAlt, FaStar } from "react-icons/fa";
import styles from "./styles.module.scss";
import { removeFromWishList } from "../../../../../../../../services/helper/wish-list";
import { Link } from "react-router-dom";

const ItemBlock = ({ product, toggleLoading }) => {
    const removeProduct = () => {
        removeFromWishList(product["id"]);
        toggleLoading();
    };

    return (
        <Row className={styles.itemBlock}>
            <Col xs="2" className={styles.blockLeft}>
                <Link to={`/product/${product["alt"]}/${product["id"]}`}>
                    <img
                        src={`/api/images/150/laptops/${product["id"]}/${product["alt"]}.jpg`}
                        width={135}
                        height={135}
                        alt={product["name"]}
                        title={product["name"]}
                    />
                </Link>
            </Col>

            <Col sm="9" className={styles.blockCenter}>
                <label className={styles.itemInfo}>
                    <label className={styles.itemRating}>
                        {product["avg_rating"].toFixed(1)}{" "}
                        <FaStar
                            className={styles.icon}
                            size={12}
                            style={{ marginTop: "-2px" }}
                        />
                    </label>{" "}
                    - RAM {product["ram"]["size"]}GB -{" "}
                    {product["hard_drive"]["type"]}{" "}
                    {product["hard_drive"]["size"] >= 1024
                        ? `${product["hard_drive"]["size"] / 1024}TB`
                        : `${product["hard_drive"]["size"]}GB`}
                </label>
                <br />

                <Link to={`/product/${product["alt"]}/${product["id"]}`}>
                    <Label className={styles.name}>{product["name"]}</Label>
                </Link>

                <br />
                <Label className={styles.priceLabel}>
                    {(
                        product["unit_price"] - product["discount_price"]
                    ).toLocaleString()}
                    đ
                </Label>
                <Label className={styles.pricePromotion}>
                    <s>{product["unit_price"].toLocaleString()}đ</s>
                </Label>
            </Col>

            <Col sm="1" className={styles.blockRight}>
                <Button
                    className={styles.remove}
                    color="transparent"
                    onClick={removeProduct}
                >
                    <FaTrashAlt />
                </Button>
            </Col>
        </Row>
    );
};

export default ItemBlock;
