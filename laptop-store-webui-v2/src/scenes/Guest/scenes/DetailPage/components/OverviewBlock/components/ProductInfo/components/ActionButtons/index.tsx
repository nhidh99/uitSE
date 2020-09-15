import React from "react";
import { FaShoppingCart, FaHeart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../../../../../../services/redux/rootReducer";
import { MAXIMUM_QUANTITY_PER_PRODUCT } from "../../../../../../../../../../global/constants";
import { SC } from "./styles";

const ActionButtons = () => {
    const product = useSelector(
        // @ts-ignore
        (state: RootState) => state.productInfo.details
    );

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

    // const addToCart = async () => {
    //     const quantity = parseInt(document.getElementById("quantity").value);
    //     const error = document.getElementById("error");
    //     const success = await cartService.addProduct(product["id"], quantity);
    //     error.style.display = success === false ? "inline-block" : "none";
    // };

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

                <SC.CartButton
                // onClick={addToCart}
                >
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

            <SC.ErrorLabel id="error">
                Tối đa {MAXIMUM_QUANTITY_PER_PRODUCT} sản phẩm {product["name"]}{" "}
                trong giỏ hàng
            </SC.ErrorLabel>
        </>
    );
};

export default ActionButtons;
