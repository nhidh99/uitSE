/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo, useState } from "react";
import { FaShoppingBag, FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";
import SectionHeader from "../../../../components/SectionHeader";
import laptopApi from "../../../../services/api/laptopApi";
import cartService from "../../../../services/helper/cartService";
import { RootState } from "../../../../services/redux/rootReducer";
import { skipFetching } from "../../../../services/redux/slices/loaderStatusSlice";
import store from "../../../../services/redux/store";
import ProductOverviewModel from "../../../../values/models/ProductSummaryModel";
import CartPaymentProps from "../../../../values/props/CartPaymentProps";
import CartItems from "./components/CartItems";
import CartPayment from "./components/CartPayment";
import { SC } from "./styles";

type CartPageState = {
    items: ProductOverviewModel[] | null;
    payment: CartPaymentProps;
};

const CartPage = () => {
    const initialState: CartPageState = useMemo(
        () => ({
            items: null,
            payment: {
                totalCount: 0,
                totalDiscount: 0,
                totalPrice: 0,
            },
        }),
        []
    );

    const [state, setState] = useState<CartPageState>(initialState);

    const loaderStatus = useSelector((state: RootState) => state.loaderStatus);

    let { items, payment } = state;

    useEffect(() => {
        const loadData = async () => {
            if (items && !loaderStatus.isFetching) {
                return;
            }

            if (cartService.isEmptyCart()) {
                const emptyCartState = { ...initialState, loading: false, items: [] };
                setState(emptyCartState);
            } else {
                const cart = cartService.getCart();
                const laptopIds = Object.keys(cart).map((k) => parseInt(k));
                const response = await laptopApi.getByIds(laptopIds);
                const items = response.data;

                let totalCount = 0;
                let totalDiscount = 0;
                let totalPrice = 0;

                // @ts-ignore
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
            store.dispatch(skipFetching());
        };

        loadData();
    }, [loaderStatus]);

    return (
        <SC.Container>
            <SC.LeftContainer>
                <SectionHeader
                    left={
                        <>
                            <FaShoppingCart />
                            Giỏ hàng của tôi
                        </>
                    }
                />
                <CartItems items={items} />
            </SC.LeftContainer>

            <SC.RightContainer>
                <SectionHeader
                    left={
                        <>
                            <FaShoppingBag />
                            Chi tiết thanh toán
                        </>
                    }
                />
                <CartPayment payment={payment} />
            </SC.RightContainer>
        </SC.Container>
    );
};

export default CartPage;
