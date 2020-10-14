/* eslint-disable react-hooks/exhaustive-deps */
import React, { memo, useCallback } from "react";
import { FaStar } from "react-icons/fa";
import { useDispatch, useStore } from "react-redux";
import { Link } from "react-router-dom";
import userApi from "../../../../../../services/api/userApi";
import { fireLoading } from "../../../../../../services/redux/slices/loaderStatusSlice";
import { setMessage } from "../../../../../../services/redux/slices/messageSlice";
import {
    removeWishListItem,
    setWishList,
} from "../../../../../../services/redux/slices/wishListSlice";
import ProductOverviewModel from "../../../../../../values/models/ProductSummaryModel";
import { SC } from "./styles";

type WishListItemProps = {
    item: ProductOverviewModel;
};

const WishListItem = ({ item }: WishListItemProps) => {
    const store = useStore();
    const dispatch = useDispatch();

    const removeItem = useCallback(async () => {
        const tempWishList = store.getState().wishList;
        try {
            dispatch(fireLoading());
            dispatch(removeWishListItem(item.id));
            const wishList = store.getState().wishList;
            const listJSON = JSON.stringify(wishList);
            await userApi.putCurrentUserWishList(listJSON);
            dispatch(setWishList(wishList));
        } catch (err) {
            dispatch(setWishList(tempWishList));
            const message = `Lỗi: Không thể xoá Laptop ${item.name} khỏi danh sách`;
            dispatch(setMessage(message));
        }
    }, []);

    return (
        <SC.Container>
            <SC.Button onClick={removeItem} />
            <SC.InfoContainer>
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
                </SC.ItemInfo>
            </SC.InfoContainer>
        </SC.Container>
    );
};

export default memo(WishListItem);
