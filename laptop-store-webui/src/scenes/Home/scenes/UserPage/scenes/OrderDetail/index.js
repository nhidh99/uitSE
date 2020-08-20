/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useState, useEffect } from "react";
import { Spinner } from "reactstrap";
import { FaBoxes } from "react-icons/fa";
import styles from "./styles.module.scss";
import "react-step-progress-bar/styles.css";
import OrderProgress from "./components/OrderProgress";
import Loader from "react-loader-advanced";
import OrderCancel from "./components/OrderCancel";
import { useParams } from "react-router-dom";
import orderApi from "../../../../../../services/api/orderApi";
import store from "../../../../../../services/redux/store";
import {
    setOrderDetail,
    buildErrorModal,
} from "../../../../../../services/redux/actions";
import OrderInfo from "./components/OrderInfo";
import OrderItems from "./components/OrderItems";

const OrderDetail = () => {
    const [loading, setLoading] = useState(true);
    const { orderId } = useParams();

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const response = await orderApi.getById(orderId);
            store.dispatch(setOrderDetail(response.data));
            setLoading(false);
        } catch (err) {
            store.dispatch(buildErrorModal());
        }
    };

    const OrderHeader = () => {
        return (
            <div>
                <label className={styles.header}>
                    <FaBoxes />
                    &nbsp;&nbsp;CHI TIẾT ĐƠN HÀNG {loading ? "" : `#${orderId}`}
                </label>
                {loading ? null : <OrderCancel />}
            </div>
        );
    };

    const OrderBodyContent = ({ title, component }) => (
        <div className={styles.block}>
            <header className={styles.title}>{title}</header>
            {component}
        </div>
    );

    const OrderBody = () => {
        return loading ? (
            <Loader
                show={loading}
                message={<Spinner color="primary" />}
                className={styles.loader}
                backgroundStyle={{ backgroundColor: "transparent" }}
            />
        ) : (
            <Fragment>
                <OrderProgress />
                <OrderBodyContent
                    title="A. THÔNG TIN ĐƠN HÀNG"
                    component={<OrderInfo />}
                />
                <OrderBodyContent
                    title="B. DANH SÁCH SẢN PHẨM"
                    component={<OrderItems type="LAPTOP" />}
                />
                <OrderBodyContent
                    title="C. DANH SÁCH KHUYẾN MÃI"
                    component={<OrderItems type="PROMOTION" />}
                />
            </Fragment>
        );
    };

    return (
        <Fragment>
            <OrderHeader />
            <OrderBody />
        </Fragment>
    );
};

export default OrderDetail;
