/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, Fragment } from "react";
import { withRouter } from "react-router-dom";
import styles from "./styles.module.scss";
import { FaBook, FaBoxOpen } from "react-icons/fa";
import ItemBlock from "./components/ItemBlock";
import { getWishList } from "../../../../../../services/helper/wish-list";
import EmptyBlock from "../../../../../../components/EmptyBlock";
import userApi from "../../../../../../services/api/userApi";

const WishListPage = () => {
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        if (loading) {
            loadData();
        }
    }, [loading]);

    const toggleLoading = () => setLoading(true);

    const loadData = async () => {
        const ids = getWishList();
        if (ids.length === 0) {
            setProducts([]);
            setLoading(false);
            return;
        }

        try {
            const response = await userApi.getCurrentUserWishList();
            const products = response.data;
            setProducts(products);
            setLoading(false);
        } catch (err) {
            console.log("fail");
        }
    };

    return (
        <Fragment>
            <div className={styles.title}>
                <label className={styles.header}>
                    <FaBook />
                    &nbsp;&nbsp;DANH SÁCH XEM SAU
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
                        <ItemBlock
                            product={product}
                            toggleLoading={toggleLoading}
                        />
                    ))}
                </div>
            )}
        </Fragment>
    );
};

export default withRouter(WishListPage);
