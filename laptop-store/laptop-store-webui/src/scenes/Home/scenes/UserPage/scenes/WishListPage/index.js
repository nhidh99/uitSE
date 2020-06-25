/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, Fragment } from "react";
import { withRouter } from "react-router-dom";
import styles from "./styles.module.scss";
import { FaBook, FaBoxOpen } from "react-icons/fa";
import ItemBlock from "./components/ItemBlock";
import { getWishList } from "../../../../../../services/helper/wish-list";
import EmptyBlock from "../../../../../../components/EmptyBlock";

const WishListPage = () => {
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

            {products.length === 0 ? (
                <EmptyBlock
                    loading={loading}
                    backToHome={!loading}
                    icon={<FaBoxOpen />}
                    loadingText="Đang tải danh sách"
                    emptyText="Danh sách trống"
                />
            ) : (
                <div className={styles.list}>
                    {products.map((product) => (
                        <ItemBlock product={product} toggleLoading={toggleLoading} />
                    ))}
                </div>
            )}
        </Fragment>
    );
};

export default withRouter(WishListPage);
