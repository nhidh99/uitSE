/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Col, Row, Label, Button, Input, InputGroup } from "reactstrap";
import { FaTrashAlt } from "react-icons/fa";
import styles from "./styles.module.scss";
import { convertCPUType } from "../../../../../../services/helper/converter";
import { Link } from "react-router-dom";
import NumberFormat from "react-number-format";
import { MAXIMUM_QUANTITY_PER_PRODUCT, CartStatus } from "../../../../../../constants";
import laptopApi from "../../../../../../services/api/laptopApi";
import cartService from "../../../../../../services/helper/cartService";
import { setCartStatus } from "../../../../../../services/redux/actions";
import store from "../../../../../../services/redux/store";

const ItemBlock = ({ product, quantity, toggleLoading }) => {
    const [promotions, setPromotions] = useState([]);
    const [qty, setQty] = useState(quantity);
    const { cpu, ram, hard_drive, monitor } = product;

    useEffect(() => {
        loadPromotions();
    }, []);

    useEffect(() => {
        if (qty !== quantity) {
            toggleLoading();
        }
    }, [qty]);

    useEffect(() => {
        setQty(quantity);
    }, [quantity]);

    const loadPromotions = async () => {
        try {
            const response = await laptopApi.getLaptopPromotions(product["id"]);
            setPromotions(response.data);
        } catch (err) {
            console.log("fail");
        }
    };

    const minusQuantity = async () => {
        store.dispatch(setCartStatus(CartStatus.LOADING));
        const success = await cartService.minusProduct(product["id"]);
        const nextCartStatus = success ? CartStatus.SYNCING : CartStatus.IDLE;
        store.dispatch(setCartStatus(nextCartStatus));
    };

    const addQuantity = async () => {
        store.dispatch(setCartStatus(CartStatus.LOADING));
        const success = await cartService.addProduct(product["id"]);
        const nextCartStatus = success ? CartStatus.SYNCING : CartStatus.IDLE;
        store.dispatch(setCartStatus(nextCartStatus));
    };

    const updateQuantity = async () => {
        store.dispatch(setCartStatus(CartStatus.LOADING));
        const input = document.getElementById("quantity-" + product["id"]);
        const quantity = parseInt(input.value);
        const success = await cartService.updateProduct(product["id"], quantity);
        const nextCartStatus = success ? CartStatus.SYNCING : CartStatus.IDLE;
        store.dispatch(setCartStatus(nextCartStatus));
    };

    const removeProduct = async () => {
        store.dispatch(setCartStatus(CartStatus.LOADING));
        const success = await cartService.removeProduct(product["id"]);
        const nextCartStatus = success ? CartStatus.SYNCING : CartStatus.IDLE;
        store.dispatch(setCartStatus(nextCartStatus));
    };

    return qty === 0 ? null : (
        <Row className={styles.row}>
            <Col xs="2" className={styles.blockLeft}>
                <Link to={`/product/${product["alt"]}/${product["id"]}`}>
                    <img
                        src={`/cxf/api/images/150/laptops/${product["id"]}/${product["alt"]}.jpg`}
                        width={135}
                        height={135}
                        alt={product["name"]}
                        title={product["name"]}
                    />
                </Link>
            </Col>

            <Col xs="8" className={styles.blockCenter}>
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
                            <i>Quà khuyến mãi:&nbsp;&nbsp;</i>
                        </b>
                        {promotions
                            .map(
                                (promotion) =>
                                    `${promotion["name"]} (${promotion["price"].toLocaleString()}đ)`
                            )
                            .join(", ")}
                    </Label>
                )}
            </Col>

            <Col xs="2" className={styles.blockRight}>
                <InputGroup>
                    <Input
                        className={styles.updateQuantity}
                        onClick={minusQuantity}
                        value="-"
                        type="button"
                    />
                    <NumberFormat
                        id={`quantity-${product["id"]}`}
                        className={`form-control ${styles.quantity}`}
                        thousandSeparator={true}
                        decimalSeparator={false}
                        allowNegative={false}
                        value={qty}
                        onBlur={updateQuantity}
                        isAllowed={(values) => {
                            const { formattedValue, floatValue } = values;
                            return (
                                !formattedValue.startsWith("0") &&
                                floatValue <= MAXIMUM_QUANTITY_PER_PRODUCT
                            );
                        }}
                    />
                    <Input
                        className={styles.updateQuantity}
                        onClick={addQuantity}
                        value="+"
                        type="button"
                    />
                    <Button className={styles.remove} color="transparent" onClick={removeProduct}>
                        <FaTrashAlt className={styles.trashIcon} />
                    </Button>
                </InputGroup>
            </Col>
        </Row>
    );
};

export default ItemBlock;
