/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, Fragment } from "react";
import { withRouter } from "react-router-dom";
import styles from "./styles.module.scss";
import { FaBook, FaBoxOpen } from "react-icons/fa";
import ItemBlock from "./components/ItemBlock";
import EmptyBlock from "../../../../../../components/EmptyBlock";
import userApi from "../../../../../../services/api/userApi";

const WishListPage = () => {
    const INITIAL_STATE = { loading: true, products: [] };
    const [state, setState] = useState(INITIAL_STATE);
    const { loading, products } = state;

    useEffect(() => {
        if (loading) {
            loadData();
        }
    }, [loading]);

    const toggleLoading = () => {
        setState((prev) => ({ ...prev, loading: true }));
    };

    const loadData = async () => {
        try {
            const response = await userApi.getCurrentUserWishList();
            setState({
                products: response.data,
                loading: false,
            });
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
