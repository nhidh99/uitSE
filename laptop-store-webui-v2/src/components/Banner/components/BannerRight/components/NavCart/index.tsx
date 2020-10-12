/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useEffect, useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import cartService from "../../../../../../services/helper/cartService";
import { RootState } from "../../../../../../services/redux/rootReducer";
import { SC } from "./styles";

const NavCart = () => {
    const history = useHistory();

    const loading = useSelector((state: RootState) => state.loaderStatus.isLoading);

    const getCounter = useCallback(() => {
        return Object.values(cartService.getCart()).reduce((a, b) => a + b, 0);
    }, []);

    const [counter, setCounter] = useState<number>(getCounter());

    useEffect(() => {
        if (loading) return;
        setCounter(getCounter());
    }, [loading]);

    return (
        <li onClick={() => history.push("/cart")}>
            <SC.IconContainer>
                <FaShoppingCart size={20} />
                <SC.Counter>{counter}</SC.Counter>
            </SC.IconContainer>
            Giỏ hàng
        </li>
    );
};

export default NavCart;
