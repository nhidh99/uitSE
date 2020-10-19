/* eslint-disable react-hooks/exhaustive-deps */
import React, { memo } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";
import cartService from "../../../../../../../../../../../../services/helper/cartService";
import { RootState } from "../../../../../../../../../../../../services/redux/rootReducer";
import { setMessage } from "../../../../../../../../../../../../services/redux/slices/messageSlice";
import store from "../../../../../../../../../../../../services/redux/store";
import CartConstants from "../../../../../../../../../../../../values/constants/CartConstants";
import { SC } from "./styles";

const CartButton = () => {
    const { spec, loading } = useSelector((state: RootState) => ({
        // @ts-ignore
        spec: state.product.spec,
        loading: state.loaderStatus.isLoading,
    }));

    const addToCart = async () => {
        // @ts-ignore
        const value = parseInt(document.getElementById("quantity").value);
        const curItemQuantity = cartService.getCart()?.[spec.id] ?? 0;
        const curCartQuantity = cartService.getTotalQuantity();
        let message: string | null = null;

        if (curItemQuantity + value > CartConstants.MAX_QUANTITY_PER_ITEM) {
            message = `Tối đa ${CartConstants.MAX_QUANTITY_PER_ITEM} 
            Laptop ${spec.name} trong giỏ hàng (hiện có: ${curItemQuantity})`;
        } else if (curCartQuantity + value > CartConstants.MAX_TOTAL_QUANTITY) {
            message = `Tổng số lượng sản phẩm trong giỏ hàng không được vượt quá 
            ${CartConstants.MAX_TOTAL_QUANTITY} sản phẩm (hiện có: ${curCartQuantity})`;
        } else {
            await cartService.addItem(spec.id, value);
            message = `Đã thêm Laptop ${spec.name} vào giỏ hàng (hiện có: ${
                curItemQuantity + value
            })`;
        }

        store.dispatch(setMessage(message));
    };

    return (
        <SC.Button onClick={addToCart} disabled={loading}>
            <FaShoppingCart />
            &nbsp;&nbsp;Thêm vào giỏ hàng
        </SC.Button>
    );
};

export default memo(CartButton);
