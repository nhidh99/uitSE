/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useState } from "react";
import { FaShoppingCart, FaHeart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import cartService from "../../../../../../../../../../services/helper/cartService";
import { RootState } from "../../../../../../../../../../services/redux/rootReducer";
import CartConstants from "../../../../../../../../../../values/constants/CartConstants";
import { SC } from "./styles";

const ActionButtons = () => {
    // @ts-ignore
    const spec = useSelector((state: RootState) => state.product.spec);

    // @ts-ignore
    const { productId } = useParams();

    const [showError, setShowError] = useState<boolean>(false);

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
        const success = await cartService.increaseItemQuantity(productId, value);
        setShowError(!success);
        alert(JSON.stringify(cartService.getCart()));
    }, []);

    return (
        <>
            <SC.Container>
                <SC.QuantityLabel>Số lượng:</SC.QuantityLabel>
                <SC.QuantityInput
                    id="quantity"
                    type="number"
                    min={1}
                    max={100}
                    defaultValue={1}
                />

                <SC.CartButton onClick={addToCart}>
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

            {showError ? (
                <SC.ErrorLabel>
                    Tối đa {CartConstants.MAX_QUANTITY_PER_ITEM} sản phẩm{" "}
                    {spec["name"]} trong giỏ hàng
                </SC.ErrorLabel>
            ) : null}
        </>
    );
};

export default ActionButtons;
