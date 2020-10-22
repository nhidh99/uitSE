/* eslint-disable react-hooks/exhaustive-deps */
import React, { memo, useEffect, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import userApi from "../../../../../../../../../../../../services/api/userApi";
import { getCookie } from "../../../../../../../../../../../../services/helper/cookie";
import { RootState } from "../../../../../../../../../../../../services/redux/rootReducer";
import { setMessage } from "../../../../../../../../../../../../services/redux/slices/messageSlice";
import {
    addWishListItem,
    removeWishListItem,
} from "../../../../../../../../../../../../services/redux/slices/wishListSlice";
import ProductSpecModel from "../../../../../../../../../../../../values/models/ProductSpecModel";
import { SC } from "./styles";

type WishListButtonState = {
    loading: boolean;
    isInWishList: boolean;
};

const WishListButton = () => {
    const { item, wishList, isInWishList } = useSelector((state: RootState) => {
        // @ts-ignore
        const item: ProductSpecModel = state.product.spec;
        return {
            item: item,
            wishList: state.wishList,
            isInWishList: state.wishList.includes(item.id),
        };
    });

    const [loading, setLoading] = useState<boolean>(false);
    const dispatch = useDispatch();

    const addToWishList = async () => {
        if (!getCookie("access_token")) {
            dispatch(setMessage("Vui lòng đăng nhập để sử dụng chức năng"));
            return;
        }
        setLoading(true);
        dispatch(isInWishList ? removeWishListItem(item.id) : addWishListItem(item.id));
    };

    useEffect(() => {
        const syncWishList = async () => {
            try {
                const listJSON = JSON.stringify(wishList);
                await userApi.putCurrentUserWishList(listJSON);
                setLoading(false);
            } catch (err) {
                dispatch(setMessage("Lỗi: Không thể cập nhật danh sách xem sau"));
            }
        };

        if (getCookie("access_token")) {
            syncWishList();
        }
    }, [isInWishList]);

    return (
        <SC.Button onClick={addToWishList} disabled={loading}>
            <FaHeart />
            &nbsp;&nbsp;
            {isInWishList ? "Bỏ xem sau" : "Xem sau"}
        </SC.Button>
    );
};

export default memo(WishListButton);
