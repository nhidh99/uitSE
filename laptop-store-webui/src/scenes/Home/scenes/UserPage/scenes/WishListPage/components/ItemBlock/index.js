/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Col, Row, Label, Button } from "reactstrap";
import { FaTrashAlt } from "react-icons/fa";
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

                <br />
                {product["promotions"].length === 0 ? null : (
                    <Label>
                        <b>
                            <i>Khuyến mãi:&nbsp;&nbsp;</i>
                        </b>
                        {product["promotions"]
                            .map((promotion) => promotion["name"])
                            .join(", ")}
                    </Label>
                )}
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
