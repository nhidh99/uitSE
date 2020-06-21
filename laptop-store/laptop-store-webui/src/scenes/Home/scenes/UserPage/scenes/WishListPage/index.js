/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, Fragment } from "react";
import { withRouter } from "react-router-dom";
import styles from "./styles.module.scss";
import { FaBook, FaBoxOpen } from "react-icons/fa";
import ItemBlock from "./components/ItemBlock";
import Loader from "react-loader-advanced";
import { Spinner, Button } from "reactstrap";
import { getWishList } from "../../../../../../services/helper/wish-list";

const WishListPage = (props) => {
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const wishList = getWishList();

    useEffect(() => {
        loadData();
    }, [loading]);

    const toggleLoading = () => setLoading(true);

    const loadData = async () => {
        if (wishList.length === 0) {
            setProducts([]);
            setLoading(false);
            return;
        }

        const params = new URLSearchParams();
        wishList.forEach((id) => params.append("ids", id));
        const response = await fetch("/cxf/api/laptops?" + params.toString());

        if (response.ok) {
            const products = await response.json();
            setProducts(products);
            setLoading(false);
        }
    };

    return (
        <Fragment>
            <div className={styles.title}>
                <label className={styles.header}>
                    <FaBook />
                    &nbsp;&nbsp;DANH SÁCH XEM SAU {`(${wishList.length})`}
                </label>
            </div>

            <Loader show={loading} message={<Spinner />}>
                <div className={styles.list}>
                    {products.length === 0 ? (
                        <div className={styles.emptyWishList}>
                            <FaBoxOpen size={80} />
                            <br />
                            {loading ? (
                                <h5>Đang tải danh sách xem sau...</h5>
                            ) : (
                                <Fragment>
                                    <h4>Danh sách trống</h4>
                                    <Button size="lg" color="warning" type="a" href="/">
                                        Quay lại trang mua sắm
                                    </Button>
                                </Fragment>
                            )}
                        </div>
                    ) : (
                        products.map((product) => (
                            <ItemBlock product={product} toggleLoading={toggleLoading} />
                        ))
                    )}
                </div>
            </Loader>
        </Fragment>
    );
};

export default withRouter(WishListPage);
