import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import { useHistory } from "react-router";
import { SC } from "./styles";

const NavCart = () => {
    const history = useHistory();
    return (
        <li onClick={() => history.push("/cart")}>
            <SC.IconContainer>
                <FaShoppingCart size={20} />
                <SC.Counter>{100}</SC.Counter>
            </SC.IconContainer>
            Giỏ hàng
        </li>
    );
};

export default NavCart;
