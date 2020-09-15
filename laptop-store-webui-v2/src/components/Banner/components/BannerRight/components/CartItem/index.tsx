import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import { SC } from "./styles";

const CartItem = () => {
    return (
        <li>
            <SC.IconContainer>
                <FaShoppingCart size={20} />
                <SC.Counter>
                    {100}
                </SC.Counter>
            </SC.IconContainer>
            Giỏ hàng
        </li>
    );
};

export default CartItem;
