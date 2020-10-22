/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useState, useEffect } from "react";
import { Label, Button, Spinner } from "reactstrap";
import ItemBlock from "./components/ItemBlock";
import { FaShoppingCart, FaBoxOpen, FaGift, FaMoneyBillWave } from "react-icons/fa";
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
import { setCartStatus, buildErrorModal } from "../../../../services/redux/actions";
import cartService from "../../../../services/helper/cartService";

const CartPage = (props) => {
    const [isFirstLoad, setIsFirstLoad] = useState(true);
    const [products, setProducts] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalDiscount, setTotalDiscount] = useState(0);

    const status = useSelector((state) => state.cartStatus);
    const loading = [CartStatus.SYNCING, CartStatus.LOADING].includes(status) || isFirstLoad;

    useEffect(() => {
        if (status === CartStatus.SYNCING) {
            loadData();
        }
    }, [status]);

    useEffect(() => {
        const nextStatus = isFirstLoad ? CartStatus.SYNCING : CartStatus.IDLE;
        store.dispatch(setCartStatus(nextStatus));
    }, [products]);

    const loadData = async () => {
        const ids = Object.keys(getCart());
        if (ids.length === 0) {
            setIsFirstLoad(false);
            setProducts([]);
        } else {
            try {
                const response = await laptopApi.getByIds(ids);
                const products = response.data;
                loadCart(products);
            } catch (err) {
                store.dispatch(buildErrorModal());
            }
        }
    };

    const loadCart = async (products) => {
        let totalPrice = 0;
        let totalDiscount = 0;

        products.forEach((product) => {
            const quantity = getCart()[[product["id"]]];
            const discount = product["discount_price"] * quantity;
            const price = (product["unit_price"] - product["discount_price"]) * quantity;
            totalPrice += price;
            totalDiscount += discount;
        });

        const productIds = products.map((product) => product["id"].toString());
        const deletePromises = Object.keys(getCart())
            .filter((id) => !productIds.includes(id))
            .map(async (id) => await cartService.removeProduct(id));
        await Promise.all(deletePromises);

        setTotalPrice(totalPrice);
        setTotalDiscount(totalDiscount);
        setIsFirstLoad(false);
        setProducts(products);
    };

    const redirectToPayment = () => {
        const url = getCookie("access_token") ? "/payment" : "/auth/login";
        props.history.push(url);
        window.scroll(0, 0);
    };

    const SummaryBlock = () => (
        <div className={styles.summary}>
            <span>
                <b>
                    <FaBoxOpen />
                    &nbsp; Số lượng:&nbsp;&nbsp;
                </b>
                {Object.values(getCart()).reduce((a, b) => a + b, 0)}
            </span>

            <span>
                <b>
                    <FaGift />
                    &nbsp; Tổng giảm giá:&nbsp;&nbsp;
                </b>
                {totalDiscount.toLocaleString()}
                <sup>đ</sup>
            </span>

            <span>
                <b>
                    <FaMoneyBillWave />
                    &nbsp; Tạm tính:&nbsp;&nbsp;
                </b>
                {totalPrice.toLocaleString()}
                <sup>đ</sup>
            </span>
        </div>
    );

    return (
        <Fragment>
            <div className={styles.title}>
                <Label className={styles.pageTitle}>Giỏ hàng của tôi</Label>
                <Button
                    onClick={redirectToPayment}
                    className={styles.btn}
                    color="success"
                    disabled={products.length === 0 || loading}
                >
                    <FaShoppingCart className={styles.icon} /> Tiến hành đặt hàng
                </Button>
            </div>

            <Loader show={loading && !isFirstLoad} message={<Spinner />}>
                <div className={styles.list}>
                    {products.length === 0 ? (
                        <EmptyBlock
                            loading={loading}
                            backToHome={!loading}
                            icon={<FaBoxOpen />}
                            loadingText="Đang tải giỏ hàng..."
                            emptyText="Giỏ hàng trống"
                            noDelay
                        />
                    ) : (
                        <Fragment>
                            <SummaryBlock />
                            {products.map((product) => (
                                <ItemBlock product={product} quantity={getCart()[product["id"]]} />
                            ))}
                        </Fragment>
                    )}
                </div>
            </Loader>
        </Fragment>
    );
};

export default withRouter(CartPage);
