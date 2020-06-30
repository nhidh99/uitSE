/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useState, useEffect } from "react";
import styles from "./styles.module.scss";
import AddressBlock from "./components/AddressBlock";
import ProductsBlock from "./components/ProductsBlock";
import PromotionsBlock from "./components/PromotionsBlock";
import SummaryBlock from "./components/SummaryBlock";
import { Button, Spinner } from "reactstrap";
import { removeFromCart } from "../../../../services/helper/cart";
import { getCookie } from "../../../../services/helper/cookie";
import { FaBoxOpen } from "react-icons/fa";
import Loader from "react-loader-advanced";
import { withRouter } from "react-router-dom";
import store from "../../../../services/redux/store";

const PaymentPage = (props) => {
    const defaultAddressId = store.getState()["address"]["default-id"];
    const [addresses, setAddresses] = useState([]);
    const [promotions, setPromotions] = useState([]);
    const [products, setProducts] = useState([]);
    const [productPrice, setProductPrice] = useState(0);
    const [promotionQties, setPromotionQties] = useState(0);
    const [cart, setCart] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadData();
    }, []);

    useEffect(() => {
        if (!cart) return;
        loadDetail();
    }, [cart]);

    useEffect(() => {
        const productPrice = products
            .map((p) => cart[p["id"]] * (p["unit_price"] - p["discount_price"]))
            .reduce((a, b) => a + b, 0);
        setProductPrice(productPrice);
    }, [products]);

    const loadData = async () => {
        const response = await fetch("/cxf/api/users/me", {
            method: "GET",
            headers: { Authorization: `Bearer ${getCookie("access_token")}` },
        });

        if (response.ok) {
            const user = await response.json();
            setCart(JSON.parse(user["cart"]));
        }
    };

    const loadDetail = async () => {
        await Promise.all([loadProducts(), loadAddresses(), loadPromotions()]);
        setLoading(false);
    };

    const loadProducts = async () => {
        if (Object.keys(cart).length === 0) {
            setProducts([]);
        }

        const params = new URLSearchParams();
        Object.keys(cart).forEach((id) => params.append("ids", id));

        const response = await fetch("/cxf/api/laptops?" + params.toString());
        if (response.ok) {
            const products = await response.json();
            const productIds = products.map((product) => product["id"].toString());
            Object.keys(cart)
                .filter((id) => !productIds.includes(id))
                .forEach((id) => removeFromCart(id));
            setProducts(products);
        }
    };

    const loadAddresses = async () => {
        const response = await fetch("/cxf/api/users/me/addresses", {
            method: "GET",
            headers: { Authorization: `Bearer ${getCookie("access_token")}` },
        });

        if (response.ok) {
            const data = await response.json();
            const defaultAddress = data.find((address) => address.id === defaultAddressId);
            const addresses = data.filter((address) => address !== defaultAddress);
            addresses.unshift(defaultAddress);
            setAddresses(addresses);
        }
    };

    const loadPromotions = async () => {
        const quantities = {};
        const promotions = [];
        const length = Object.keys(cart).length;
        let count = 0;

        Object.keys(cart).map(async (id) => {
            const response = await fetch(`/cxf/api/laptops/${id}/promotions`);
            if (response.ok) {
                const data = await response.json();
                data.forEach((promotion) => {
                    const key = promotion["id"];
                    if (key in quantities) {
                        quantities[key] = cart[id] + quantities[key];
                    } else {
                        quantities[key] = cart[id];
                        promotions.push(promotion);
                    }
                });
            }

            if (++count === length) {
                setPromotionQties(quantities);
                setPromotions(promotions);
            }
        });
    };

    const toggleSubmit = () => {
        setIsSubmitted(!isSubmitted);
    };

    const redirectToCreateAddress = () => {
        props.history.push("/user/address/create");
    };

    return (
        <Loader show={loading || isSubmitted} message={<Spinner />}>
            {products.length === 0 ? (
                <div className={styles.emptyCart}>
                    <FaBoxOpen size={80} />
                    <br />
                    {loading ? (
                        <h5>Đang tải giỏ hàng...</h5>
                    ) : (
                        <Fragment>
                            <h4>Giỏ hàng trống</h4>
                            <Button size="lg" color="warning" type="a" href="/">
                                Quay lại trang mua sắm
                            </Button>
                        </Fragment>
                    )}
                </div>
            ) : (
                <div className={styles.container}>
                    <div className={styles.address}>
                        <header className={styles.header}>A. ĐỊA CHỈ GIAO HÀNG</header>
                        <Button onClick={redirectToCreateAddress} color="primary">
                            Tạo địa chỉ mới
                        </Button>
                    </div>
                    <AddressBlock addresses={addresses} />

                    <header className={styles.header}>B. DANH SÁCH SẢN PHẨM</header>
                    <ProductsBlock products={products} cart={cart} />

                    <header className={styles.header}>C. DANH SÁCH KHUYẾN MÃI</header>
                    <PromotionsBlock promotions={promotions} quantities={promotionQties} />

                    <SummaryBlock
                        productsPrice={productPrice}
                        toggleSubmit={toggleSubmit}
                        cart={cart}
                    />
                </div>
            )}
        </Loader>
    );
};

export default withRouter(PaymentPage);
