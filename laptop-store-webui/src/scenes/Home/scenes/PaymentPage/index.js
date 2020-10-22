/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import styles from "./styles.module.scss";
import AddressBlock from "./components/AddressBlock";
import { FaBoxOpen, FaAddressBook } from "react-icons/fa";
import { withRouter } from "react-router-dom";
import store from "../../../../services/redux/store";
import userApi from "../../../../services/api/userApi";
import EmptyBlock from "../../../../components/EmptyBlock";
import { MAXIMUM_QUANTITY_IN_CART } from "../../../../constants";
import { buildErrorModal } from "../../../../services/redux/actions";
import ProductBlock from "./components/ProductBlock";
import PromotionBlock from "./components/PromotionBlock";
import SummaryBlock from "./components/SummaryBlock";

const PaymentPage = () => {
    const INITIAL_STATE = {
        addresses: null,
        promotionsData: null,
        productsData: null,
        loading: true,
    };

    const defaultAddressId = store.getState()["user"]["address_id"];
    const [state, setState] = useState(INITIAL_STATE);
    const { addresses, promotionsData, productsData, loading } = state;

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const [payment, addresses] = await Promise.all([
                loadPayment(),
                loadAddresses(),
            ]);
            
            if (payment === null) {
                window.location.href = "/cart";
                return;
            }

            setState({
                addresses: addresses,
                promotionsData: {
                    promotions: payment["promotions"],
                    promotionCount: payment["promotion_count"],
                    promotionPrice: payment["promotion_price"],
                },
                productsData: {
                    products: payment["laptops"],
                    productCount: payment["laptop_count"],
                    productPrice: payment["laptop_price"],
                },
                loading: false,
            });
        } catch (err) {
            store.dispatch(buildErrorModal());
        }
    };

    const loadPayment = async () => {
        try {
            const response = await userApi.getCurrentUserPayment();
            return response.data;
        } catch (err) {
            throw err;
        }
    };

    const loadAddresses = async () => {
        try {
            const response = await userApi.getCurrentUserAddresses();
            const data = response.data;
            const defaultAddress = data.find((a) => a.id === defaultAddressId);
            if (defaultAddress) {
                const addresses = data.filter((a) => a !== defaultAddress);
                addresses.unshift(defaultAddress);
                return addresses;
            }
            return data;
        } catch (err) {
            throw err;
        }
    };

    const PaymentDetail = () => {
        return productsData["productCount"] <= MAXIMUM_QUANTITY_IN_CART ? (
            <div className={styles.container}>
                <AddressBlock addresses={addresses} />
                <ProductBlock productsData={productsData} />
                <PromotionBlock promotionsData={promotionsData} />
                <SummaryBlock productsPrice={productsData["productPrice"]} />
            </div>
        ) : (
            <EmptyBlock
                loading={false}
                icon={<FaBoxOpen />}
                backToHome={true}
                emptyText={`Tối đa ${MAXIMUM_QUANTITY_IN_CART} sản phẩm trong giỏ hàng`}
            />
        );
    };

    return loading ? (
        <EmptyBlock
            loading={loading}
            backToHome={!loading}
            icon={<FaBoxOpen />}
            loadingText="Đang tải giỏ hàng..."
            emptyText="Giỏ hàng trống"
            noDelay
        />
    ) : addresses.length === 0 ? (
        <EmptyBlock
            loading={false}
            backToHome={false}
            icon={<FaAddressBook />}
            emptyText="Sổ địa chỉ trống"
        />
    ) : (
        <PaymentDetail />
    );
};

export default withRouter(PaymentPage);
