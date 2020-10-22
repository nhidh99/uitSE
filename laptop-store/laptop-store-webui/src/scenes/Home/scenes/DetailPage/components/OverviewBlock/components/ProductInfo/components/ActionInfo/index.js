/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useEffect, useState } from "react";
import { Label, Button, Input } from "reactstrap";
import { MAXIMUM_QUANTITY_PER_PRODUCT } from "../../../../../../../../../../constants";
import { FaShoppingCart, FaHeart } from "react-icons/fa";
import styles from "./styles.module.scss";
import {
    getWishList,
    removeFromWishList,
    addToWishList,
} from "../../../../../../../../../../services/helper/wish-list";
import cartService from "../../../../../../../../../../services/helper/cartService";
import { useSelector } from "react-redux";

const ActionInfo = () => {
    const product = useSelector((state) => state.productDetail.product);
    const [wishList, setWishList] = useState(getWishList());
    const [isInWishList, setIsInWishList] = useState(false);

    useEffect(() => {
        if (!product) return;
        const isInWishList = wishList.includes(product["id"]);
        setIsInWishList(isInWishList);
    }, [wishList]);

    const postWishlist = () => {
        isInWishList ? removeFromWishList(product["id"]) : addToWishList(product["id"]);
        setWishList(getWishList());
    };

    const addToCart = async () => {
        const quantity = parseInt(document.getElementById("quantity").value);
        const error = document.getElementById("error");
        const success = await cartService.addProduct(product["id"], quantity);
        error.style.display = success === false ? "inline-block" : "none";
    };

    return product ? (
        <Fragment>
            <div className={styles.container}>
                <Label className={styles.label}>Số lượng:</Label>

                <Input
                    id="quantity"
                    type="number"
                    min={1}
                    max={100}
                    defaultValue={1}
                    className={styles.input}
                />

                <Button color="success" onClick={addToCart}>
                    <FaShoppingCart />
                    &nbsp;&nbsp;Thêm vào giỏ hàng
                </Button>

                <Button className={styles.wishlistBtn} color="danger" onClick={postWishlist}>
                    <FaHeart />
                    &nbsp;&nbsp;{isInWishList ? "Bỏ xem sau" : "Xem sau"}
                </Button>
            </div>

            <Label className={styles.error} id="error">
                Tối đa {MAXIMUM_QUANTITY_PER_PRODUCT} sản phẩm {product["name"]} trong giỏ hàng
            </Label>
        </Fragment>
    ) : null;
};

export default ActionInfo;
