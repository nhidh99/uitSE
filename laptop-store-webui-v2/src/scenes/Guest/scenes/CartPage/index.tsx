import React, { useEffect, useState } from "react";
import laptopApi from "../../../../services/api/laptopApi";
import cartService from "../../../../services/helper/cartService";
import ProductOverviewModel from "../../../../values/models/ProductSummaryModel";
import CartItems from "./components/CartItems";
import { SC } from "./styles";

type CartPageState = {
    loading: boolean;
    items: ProductOverviewModel[];
};

const CartPage = () => {
    const initialState: CartPageState = {
        loading: true,
        items: [],
    };

    const [state, setState] = useState<CartPageState>(initialState);
    const { loading, items } = state;

    useEffect(() => {
        const loadData = async () => {
            const cart = cartService.getCart();
            const laptopIds = Object.keys(cart).map((k) => parseInt(k));
            const response = await laptopApi.getByIds(laptopIds);
            setState({ loading: false, items: response.data });
        };

        loadData();
    }, []);

    return (
        <SC.Container>
            <SC.LeftContainer>
                <SC.Header>Giỏ hàng của tôi</SC.Header>
                <CartItems loading={loading} items={items}/>
            </SC.LeftContainer>

            <SC.RightContainer>
                <SC.Header>Chi tiết thanh toán</SC.Header>
                Right
            </SC.RightContainer>
        </SC.Container>
    );
};

export default CartPage;
