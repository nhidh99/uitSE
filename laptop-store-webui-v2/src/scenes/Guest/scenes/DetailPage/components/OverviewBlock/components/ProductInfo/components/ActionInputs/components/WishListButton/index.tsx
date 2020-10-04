/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import userApi from "../../../../../../../../../../../../services/api/userApi";
import { getCookie } from "../../../../../../../../../../../../services/helper/cookie";
import { RootState } from "../../../../../../../../../../../../services/redux/rootReducer";
import { setMessage } from "../../../../../../../../../../../../services/redux/slices/messageSlice";
import {
    addWishListItem,
    removeWishListItem,
    setWishList,
} from "../../../../../../../../../../../../services/redux/slices/wishListSlice";
import store from "../../../../../../../../../../../../services/redux/store";
import ProductSpecModel from "../../../../../../../../../../../../values/models/ProductSpecModel";
import { SC } from "./styles";

type WishListButtonState = {
    loading: boolean;
    isInWishList: boolean;
};

const WishListButton = () => {
    // @ts-ignore
    const item: ProductSpecModel = useSelector((state: RootState) => state.product.spec);
    const wishList: number[] = useSelector((state: RootState) => state.wishList);
    const isFirstLoad = useRef<boolean>(true);
    const location = useLocation();
    const [state, setState] = useState<WishListButtonState>({
        loading: false,
        isInWishList: wishList.includes(item.id),
    });
    const { loading, isInWishList } = state;

    useEffect(() => {
        isFirstLoad.current = true;
        setState({
            loading: false,
            isInWishList: wishList.includes(item.id),
        });
    }, [location]);

    useEffect(() => {
        const syncWishList = async () => {
            if (isFirstLoad.current) {
                isFirstLoad.current = false;
                return;
            }
            const listJSON = JSON.stringify(wishList);
            await userApi.putCurrentUserWishList(listJSON);
            setState({
                loading: false,
                isInWishList: wishList.includes(item.id),
            });
        };
 
        syncWishList();
    }, [wishList]);

    const addToWishList = async () => {
        if (!getCookie("access_token")) {
            store.dispatch(setMessage("Vui lòng đăng nhập để sử dụng chức năng"));
            return;
        }

        setState((prev) => ({ ...prev, loading: true }));
        const tempWishList = wishList;
        try {
            if (isInWishList) {
                store.dispatch(removeWishListItem(item.id));
            } else {
                store.dispatch(addWishListItem(item.id));
            }
        } catch (err) {
            store.dispatch(setWishList(tempWishList));
            store.dispatch(setMessage("Lỗi: Không thể cập nhật danh sách xem sau"));
        }
    };

    return (
        <SC.Button onClick={addToWishList} disabled={loading}>
            <FaHeart />
            &nbsp;&nbsp;
            {isInWishList ? "Bỏ xem sau" : "Xem sau"}
        </SC.Button>
    );
};

export default WishListButton;
