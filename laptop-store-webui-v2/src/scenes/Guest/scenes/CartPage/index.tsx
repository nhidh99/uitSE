/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";
import laptopApi from "../../../../services/api/laptopApi";
import cartService from "../../../../services/helper/cartService";
import { RootState } from "../../../../services/redux/rootReducer";
import { setLoaderStatus } from "../../../../services/redux/slices/loaderStatusSlice";
import store from "../../../../services/redux/store";
import CartConstants from "../../../../values/constants/CartConstants";
import ProductOverviewModel from "../../../../values/models/ProductSummaryModel";
import CartPaymentProps from "../../../../values/props/CartPaymentProps";
import CartItems from "./components/CartItems";
import CartPayment from "./components/CartPayment";
import { SC } from "./styles";

type CartPageState = {
    items: ProductOverviewModel[];
    payment: CartPaymentProps;
};

const CartPage = () => {
    const initialState: CartPageState = useMemo(
        () => ({
            items: [],
            payment: {
                totalCount: 0,
                totalDiscount: 0,
                totalPrice: 0,
            },
        }),
        []
    );

    const [state, setState] = useState<CartPageState>(initialState);

    const isFirstLoad = useRef<boolean>(true);

    const loaderStatus = useSelector((state: RootState) => state.loaderStatus);

    let { items, payment } = state;

    useEffect(() => {
        const loadData = async () => {
            // While loading -> cart is syncing -> wait till next status
            if (loaderStatus === CartConstants.LOADING) {
                return;
            }

            if (cartService.isEmptyCart()) {
                if (!isFirstLoad.current) {
                    setState(initialState);
                }
            } else {
                const cart = cartService.getCart();
                if (
                    loaderStatus === CartConstants.FETCHING ||
                    isFirstLoad.current
                ) {
                    isFirstLoad.current = false;
                    const laptopIds = Object.keys(cart).map((k) => parseInt(k));
                    const response = await laptopApi.getByIds(laptopIds);
                    items = response.data;
                }

                let totalCount = 0;
                let totalDiscount = 0;
                let totalPrice = 0;

                for (const item of items) {
                    totalCount += cart[item.id];
                    totalDiscount += cart[item.id] * item.discount_price;
                    totalPrice += cart[item.id] * item.unit_price;
                }

                setState({
                    items: items,
                    payment: {
                        totalCount: totalCount,
                        totalDiscount: totalDiscount,
                        totalPrice: totalPrice,
                    },
                });
            }
            store.dispatch(setLoaderStatus(CartConstants.IDLE));
        };

        loadData();
    }, [loaderStatus]);

    return (
        <SC.Container>
            <SC.LeftContainer>
                <SC.Header>Giỏ hàng của tôi</SC.Header>
                <CartItems items={items} />
            </SC.LeftContainer>

            <SC.RightContainer>
                <SC.Header>Chi tiết thanh toán</SC.Header>
                <CartPayment payment={payment} />
            </SC.RightContainer>
        </SC.Container>
    );
};

export default CartPage;
