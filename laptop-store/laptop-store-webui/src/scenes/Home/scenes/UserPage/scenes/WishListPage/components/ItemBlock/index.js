/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Col, Row, Label, Button } from "reactstrap";
import { FaTrashAlt } from "react-icons/fa";
import styles from "./styles.module.scss";
import { removeFromWishList } from "../../../../../../../../services/helper/wish-list";
import { Link } from "react-router-dom";
import { convertCPUType } from "../../../../../../../../services/helper/converter";

const ItemBlock = ({ product, toggleLoading }) => {
    const [promotions, setPromotions] = useState([]);
    const { cpu, ram, hard_drive, monitor } = product;

    useEffect(() => {
        loadPromotions();
    }, []);

    const loadPromotions = async () => {
        const response = await fetch(`/cxf/api/laptops/${product["id"]}/promotions`);
        if (response.ok) {
            const promotions = await response.json();
            setPromotions(promotions);
        }
    };

    const removeProduct = async (productId) => {
        removeFromWishList(productId);
        toggleLoading();
    };

    return (
        <Row className={styles.itemBlock}>
            <Col xs="2" className={styles.blockLeft}>
                <Link to={`/product/${product["alt"]}/${product["id"]}`}>
                    <img
                        src={`/cxf/api/images/400/laptops/${product["id"]}/${product["alt"]}.jpg`}
                        width={135}
                        height={135}
                        alt={product["name"]}
                        title={product["name"]}
                    />
                </Link>
            </Col>

            <Col sm="9" className={styles.blockCenter}>
                <Link to={`/product/${product["alt"]}/${product["id"]}`}>
                    <Label className={styles.name}>
                        {product["name"]} (
                        {`${convertCPUType(cpu["type"])}/${ram["size"]}GB-${ram["bus"]}MHz/${
                            hard_drive["type"]
                        }-${
                            hard_drive["size"] !== 1024
                                ? hard_drive["size"] + "GB"
                                : hard_drive["size"] / 1024 + "TB"
                        }/${monitor["size"]}-inch`}
                        )
                    </Label>
                </Link>

                <br />
                <Label className={styles.priceLabel}>
                    {(product["unit_price"] - product["discount_price"]).toLocaleString()}đ
                </Label>
                <Label className={styles.pricePromotion}>
                    <s>{product["unit_price"].toLocaleString()}đ</s>
                </Label>

                <br />
                {promotions.length === 0 ? null : (
                    <Label>
                        <b>
                            <i>Khuyến mãi:&nbsp;&nbsp;</i>
                        </b>
                        {promotions.map((promotion) => promotion["name"]).join(", ")}
                    </Label>
                )}
            </Col>

            <Col sm="1" className={styles.blockRight}>
                <Button
                    className={styles.remove}
                    color="transparent"
                    onClick={() => removeProduct(product["id"])}
                >
                    <FaTrashAlt />
                </Button>
            </Col>
        </Row>
    );
};

export default ItemBlock;
