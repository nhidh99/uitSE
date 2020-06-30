/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useState, useEffect } from "react";
import { Label, Button, Spinner } from "reactstrap";
import ItemBlock from "./components/ItemBlock";
import { FaShoppingCart, FaBoxOpen, FaGift, FaMoneyBillWave } from "react-icons/fa";
import styles from "./styles.module.scss";
import { getCart, removeFromCart } from "../../../../services/helper/cart";
import { withRouter } from "react-router-dom";
import { getCookie } from "../../../../services/helper/cookie";
import EmptyBlock from "../../../../components/EmptyBlock";
import Loader from "react-loader-advanced";

const CartPage = (props) => {
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalDiscount, setTotalDiscount] = useState(0);
    const cart = getCart();

    useEffect(() => {
        loadData();
    }, [loading]);

    const toggleLoading = () => setLoading(true);

    const loadData = async () => {
        if (!loading) return;

        if (Object.keys(cart).length === 0) {
            setProducts([]);
            setTotalPrice(0);
            setTotalDiscount(0);
            setLoading(false);
            return;
        }

        const params = new URLSearchParams();
        Object.keys(cart).forEach((id) => params.append("ids", id));
        const response = await fetch("/cxf/api/laptops?" + params.toString());

        if (response.ok) {
            const products = await response.json();
            loadCart(products);
        }
    };

    const loadCart = (products) => {
        let totalPrice = 0;
        let totalDiscount = 0;

        products.forEach((product) => {
            const quantity = cart[[product["id"]]];
            const discount = product["discount_price"] * quantity;
            const price = (product["unit_price"] - product["discount_price"]) * quantity;
            totalPrice += price;
            totalDiscount += discount;
        });

        const productIds = products.map((product) => product["id"].toString());
        Object.keys(cart)
            .filter((id) => !productIds.includes(id))
            .forEach((id) => removeFromCart(id));

        setProducts(products);
        setTotalPrice(totalPrice);
        setTotalDiscount(totalDiscount);
        setLoading(false);
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
                {Object.values(cart).reduce((a, b) => a + b, 0)}
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

            <div className={styles.list}>
                <SummaryBlock />
                {products.length === 0 ? (
                    <EmptyBlock
                        loading={loading}
                        backToHome={!loading}
                        icon={<FaBoxOpen />}
                        loadingText="Đang tải giỏ hàng..."
                        emptyText="Giỏ hàng trống"
                        borderless
                    />
                ) : (
                    <Loader show={loading} message={<Spinner />}>
                        {products.map((product) => (
                            <ItemBlock
                                product={product}
                                quantity={cart[product["id"]]}
                                toggleLoading={toggleLoading}
                            />
                        ))}
                    </Loader>
                )}
            </div>
        </Fragment>
    );
};

export default withRouter(CartPage);
