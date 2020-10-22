/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { Label, Button, Input, InputGroup } from "reactstrap";
import { FaTrashAlt, FaStar } from "react-icons/fa";
import styles from "./styles.module.scss";
import { Link } from "react-router-dom";
import NumberFormat from "react-number-format";
import {
    MAXIMUM_QUANTITY_PER_PRODUCT,
    CartStatus,
} from "../../../../../../constants";
import cartService from "../../../../../../services/helper/cartService";
import { setCartStatus } from "../../../../../../services/redux/actions";
import store from "../../../../../../services/redux/store";
import { getCart } from "../../../../../../services/helper/cart";

const ItemBlock = ({ product }) => {
    const quantity = getCart()[product["id"]];
    const { hard_drive, ram } = product;

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
        const success = await cartService.updateProduct(
            product["id"],
            quantity
        );
        const nextCartStatus = success ? CartStatus.SYNCING : CartStatus.IDLE;
        store.dispatch(setCartStatus(nextCartStatus));
    };

    const removeProduct = async () => {
        store.dispatch(setCartStatus(CartStatus.LOADING));
        const success = await cartService.removeProduct(product["id"]);
        const nextCartStatus = success ? CartStatus.SYNCING : CartStatus.IDLE;
        store.dispatch(setCartStatus(nextCartStatus));
    };

    return quantity === 0 ? null : (
        <div className={styles.row}>
            <div className={styles.blockLeft}>
                <Link to={`/product/${product["alt"]}/${product["id"]}`}>
                    <img
                        src={`/api/images/150/laptops/${product["id"]}/${product["alt"]}.jpg`}
                        width={135}
                        height={135}
                        alt={product["name"]}
                        title={product["name"]}
                    />
                </Link>
            </div>

            <div className={styles.blockCenter}>
                <Link to={`/product/${product["alt"]}/${product["id"]}`}>
                    <Label className={styles.name}>{product["name"]}</Label>
                </Link>

                <br />

                <Label className={styles.priceLabel}>
                    {product["unit_price"].toLocaleString()}đ
                </Label>

                <Label className={styles.pricePromotion}>
                    <s>
                        {(
                            product["unit_price"] + product["discount_price"]
                        ).toLocaleString()}
                        đ
                    </s>
                </Label>
                <br />

                <label className={styles.itemInfo}>
                    <label className={styles.itemRating}>
                        {product["avg_rating"].toFixed(1)}{" "}
                        <FaStar
                            className={styles.icon}
                            size={12}
                            style={{ marginTop: "-2px" }}
                        />
                    </label>{" "}
                    - RAM {ram["size"]}GB - {hard_drive["type"]}{" "}
                    {hard_drive["size"] >= 1024
                        ? `${hard_drive["size"] / 1024}TB`
                        : `${hard_drive["size"]}GB`}
                </label>
            </div>

            <div className={styles.blockRight}>
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
                        value={quantity}
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
                    <Button
                        className={styles.remove}
                        color="transparent"
                        onClick={removeProduct}
                    >
                        <FaTrashAlt className={styles.trashIcon} />
                    </Button>
                </InputGroup>
            </div>
        </div>
    );
};

export default ItemBlock;
