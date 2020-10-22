/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useState, useEffect } from "react";
import { Label, Button, Spinner } from "reactstrap";
import ItemBlock from "./components/ItemBlock";
import { FaShoppingCart, FaBoxOpen } from "react-icons/fa";
import styles from "./styles.module.scss";
import { getCart } from "../../../../services/helper/cart";
import { withRouter } from "react-router-dom";
import { getCookie } from "../../../../services/helper/cookie";
import EmptyBlock from "../../../../components/EmptyBlock";
import Loader from "react-loader-advanced";
import laptopApi from "../../../../services/api/laptopApi";
import store from "../../../../services/redux/store";
import { useSelector } from "react-redux";
import { CartStatus } from "../../../../constants";
import {
    setCartStatus,
    buildErrorModal,
} from "../../../../services/redux/actions";
import cartService from "../../../../services/helper/cartService";

const CartPage = (props) => {
    const INITIAL_STATE = {
        products: null,
        totalQuantity: 0,
        totalPrice: 0,
        totalDiscount: 0,
    };

    const [state, setState] = useState(INITIAL_STATE);
    const { products, totalPrice, totalDiscount, totalQuantity } = state;

    const { status, loading } = useSelector((state) => {
        const status = state.cartStatus;
        return {
            status: status,
            loading: [CartStatus.SYNCING, CartStatus.LOADING].includes(status),
        };
    });

    useEffect(() => {
        if (status === CartStatus.SYNCING) {
            loadData();
        }
    }, [status]);

    useEffect(() => {
        const nextStatus = CartStatus[products === null ? "SYNCING" : "IDLE"];
        store.dispatch(setCartStatus(nextStatus));
    }, [products]);

    const loadData = () => {
        const ids = Object.keys(getCart());
        if (ids.length === 0) {
            setState((prev) => ({ ...prev, products: [] }));
        } else {
            loadCart();
        }
    };

    const loadCart = async () => {
        try {
            const cart = getCart();
            const ids = Object.keys(cart);
            const response = await laptopApi.getByIds(ids);
            const products = response.data;

            // Remove products have been deleted (not for selling)
            const productIds = products.map((p) => p["id"].toString());
            const deletePromises = Object.keys(cart)
                .filter((id) => !productIds.includes(id))
                .map(async (id) => await cartService.removeProduct(id));
            await Promise.all(deletePromises);

            // Calculate quantity, total discount and total price of all products in cart
            let totalPrice = 0;
            let totalDiscount = 0;
            let totalQuantity = 0;

            products.forEach((product) => {
                const quantity = cart[[product["id"]]];
                const discount = product["discount_price"] * quantity;
                const price = product["unit_price"] * quantity;
                totalQuantity += quantity;
                totalPrice += price;
                totalDiscount += discount;
            });

            // Set states
            setState({
                products: products,
                totalPrice: totalPrice,
                totalDiscount: totalDiscount,
                totalQuantity: totalQuantity,
            });
        } catch (err) {
            store.dispatch(buildErrorModal());
        }
    };

    const redirectToPayment = () => {
        const url = getCookie("access_token") ? "/payment" : "/auth/login";
        props.history.push(url);
        window.scroll(0, 0);
    };

    const SummaryBlock = () => {
        const SummaryInfo = ({ title, value, suffix }) => (
            <span>
                <b>{title}:</b>
                &nbsp;&nbsp;
                {value}
                {suffix ? <sup>{suffix}</sup> : null}
            </span>
        );
        return (
            <div className={styles.summary}>
                <SummaryInfo
                    title="Số lượng"
                    value={totalQuantity.toLocaleString()}
                />
                <SummaryInfo
                    title="Tổng giảm giá"
                    value={totalDiscount.toLocaleString()}
                    suffix="đ"
                />
                <SummaryInfo
                    title="Tạm tính"
                    value={totalPrice.toLocaleString()}
                    suffix="đ"
                />
            </div>
        );
    };

    return (
        <Fragment>
            <div className={styles.title}>
                <Label className={styles.pageTitle}>Giỏ hàng của tôi</Label>
                <Button
                    onClick={redirectToPayment}
                    className={styles.btn}
                    color="success"
                    disabled={products?.length === 0 || loading}
                >
                    <FaShoppingCart className={styles.icon} /> Tiến hành đặt
                    hàng
                </Button>
            </div>

            <Loader show={loading} message={<Spinner />}>
                <div className={styles.list}>
                    {products === null || products.length === 0 ? (
                        <EmptyBlock
                            loading={loading}
                            backToHome={!loading}
                            icon={<FaBoxOpen />}
                            loadingText="Đang tải giỏ hàng..."
                            emptyText="Giỏ hàng trống"
                        />
                    ) : (
                        <Fragment>
                            <SummaryBlock />
                            {products.map((product) => (
                                <ItemBlock
                                    key={product["id"]}
                                    product={product}
                                />
                            ))}
                        </Fragment>
                    )}
                </div>
            </Loader>
        </Fragment>
    );
};

export default withRouter(CartPage);
