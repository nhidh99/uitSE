/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import CartButton from "./components/CartButton";
import QuantityInput from "./components/QuantityInput";
import WishListButton from "./components/WishListButton";
import { SC } from "./styles";

const ActionInputs = () => (
    <SC.Container>
        <SC.QuantityLabel>Số lượng:</SC.QuantityLabel>
        <QuantityInput />
        <CartButton />
        <WishListButton />
    </SC.Container>
);

export default ActionInputs;
