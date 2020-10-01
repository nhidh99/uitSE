/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback } from "react";
import { FaShoppingCart, FaHeart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import cartService from "../../../../../../../../../../services/helper/cartService";
import { RootState } from "../../../../../../../../../../services/redux/rootReducer";
import { setMessage } from "../../../../../../../../../../services/redux/slices/messageSlice";
import store from "../../../../../../../../../../services/redux/store";
import CartConstants from "../../../../../../../../../../values/constants/CartConstants";
import QuantityInput from "../QuantityInput";
import { SC } from "./styles";

const ActionButtons = () => {
    const { spec, loading } = useSelector((state: RootState) => ({
        // @ts-ignore
        spec: state.product.spec,
        loading: state.cartStatus === CartConstants.LOADING,
    }));

    // @ts-ignore
    const { productId } = useParams();

    // const [wishList, setWishList] = useState(getWishList());
    // const [isInWishList, setIsInWishList] = useState(false);

    // useEffect(() => {
    //     if (!product) return;
    //     const isInWishList = wishList.includes(product["id"]);
    //     setIsInWishList(isInWishList);
    // }, [wishList]);

    // const postWishlist = () => {
    //     isInWishList
    //         ? removeFromWishList(product["id"])
    //         : addToWishList(product["id"]);
    //     setWishList(getWishList());
    // };

    const addToCart = useCallback(async () => {
        // @ts-ignore
        const value = parseInt(document.getElementById("quantity").value);
        const curItemQuantity = cartService.getCart()?.[productId] ?? 0;
        const curCartQuantity = cartService.getTotalQuantity();
        let message: string | null = null;

        if (curItemQuantity + value > CartConstants.MAX_QUANTITY_PER_ITEM) {
            message = `Tối đa ${CartConstants.MAX_QUANTITY_PER_ITEM} 
            Laptop ${spec.name} trong giỏ hàng (hiện có: ${curItemQuantity})`;
        } else if (curCartQuantity + value > CartConstants.MAX_TOTAL_QUANTITY) {
            message = `Tổng số lượng sản phẩm trong giỏ hàng không được vượt quá 
            ${CartConstants.MAX_TOTAL_QUANTITY} sản phẩm (hiện có: ${curCartQuantity})`;
        } else {
            await cartService.addItem(productId, value);
            message = `Đã thêm Laptop ${spec.name} vào giỏ hàng (hiện có: ${
                curItemQuantity + value
            })`;
        }

        store.dispatch(setMessage(message));
    }, []);

    return (
        <>
            <SC.Container>
                <SC.QuantityLabel>Số lượng:</SC.QuantityLabel>
                <QuantityInput item={spec} />

                <SC.CartButton onClick={addToCart} disabled={loading}>
                    <FaShoppingCart />
                    &nbsp;&nbsp;Thêm vào giỏ hàng
                </SC.CartButton>

                <SC.WishListButton
                // onClick={postWishlist}
                >
                    <FaHeart />
                    &nbsp;&nbsp;Xem sau
                    {/* {isInWishList ? "Bỏ xem sau" : "Xem sau"} */}
                </SC.WishListButton>
            </SC.Container>
        </>
    );
};

export default ActionButtons;
