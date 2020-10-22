/* eslint-disable react-hooks/exhaustive-deps */
import React, { memo, useCallback } from "react";
import { FaHeart, FaStar, FaTrash } from "react-icons/fa";
import QuantityInput from "../QuantityInput";
import cartService from "../../../../../../../../services/helper/cartService";
import ProductOverviewModel from "../../../../../../../../values/models/ProductSummaryModel";
import { SC } from "./styles";
import { Link } from "react-router-dom";
import { getCookie } from "../../../../../../../../services/helper/cookie";
import store from "../../../../../../../../services/redux/store";
import { setMessage } from "../../../../../../../../services/redux/slices/messageSlice";

type CartItemProps = {
    item: ProductOverviewModel;
};

const CartItem = ({ item }: CartItemProps) => {
    const removeItem = useCallback(() => {
        cartService.removeItem(item.id);
    }, []);

    const moveItemToWishList = useCallback(() => {
        if (getCookie("access_token")) {
            cartService.moveItemToWishList(item.id);
        } else {
            store.dispatch(setMessage("Vui lòng đăng nhập để sử dụng chức năng"));
        }
    }, []);

    return (
        <SC.Container>
            <Link
                to={{
                    pathname: `/products/${item["alt"]}/${item["id"]}`,
                    state: { loading: true },
                }}
            >
                <SC.ItemImage src={`/api/images/150/laptops/${item.id}/${item.alt}.jpg`} />
            </Link>

            <SC.ItemInfo>
                <Link
                    to={{
                        pathname: `/products/${item["alt"]}/${item["id"]}`,
                        state: { loading: true },
                    }}
                >
                    <SC.ItemName>{item.name}</SC.ItemName>
                </Link>

                <SC.ItemSpec>
                    <SC.ItemRating>
                        {item["avg_rating"].toFixed(1)} <FaStar size={10} />
                    </SC.ItemRating>{" "}
                    - RAM {item["ram"]} - {item["hard_drive"]}
                </SC.ItemSpec>

                <div>
                    <SC.UnitPrice>
                        {item["unit_price"].toLocaleString()}
                        <sup>đ</sup>
                    </SC.UnitPrice>

                    <SC.OriginPrice>
                        {(item["unit_price"] + item["discount_price"]).toLocaleString()}
                        <sup>đ</sup>
                    </SC.OriginPrice>
                </div>

                <SC.Button onClick={removeItem}>
                    <FaTrash size={12} />
                    Xoá
                </SC.Button>

                <SC.Button onClick={moveItemToWishList}>
                    <FaHeart size={12} />
                    Để dành mua sau
                </SC.Button>
            </SC.ItemInfo>

            <SC.InputContainer>
                <QuantityInput item={item} />
            </SC.InputContainer>
        </SC.Container>
    );
};

export default memo(CartItem);
