/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo, useState } from "react";
import { FaHeart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { getCookie } from "../../../../../../../../../../../../services/helper/cookie";
import { wishListService } from "../../../../../../../../../../../../services/helper/wishListService";
import { RootState } from "../../../../../../../../../../../../services/redux/rootReducer";
import { setMessage } from "../../../../../../../../../../../../services/redux/slices/messageSlice";
import store from "../../../../../../../../../../../../services/redux/store";
import ProductSpecModel from "../../../../../../../../../../../../values/models/ProductSpecModel";
import { SC } from "./styles";

type WishListButtonState = {
    loading: boolean;
    isInWishList: boolean;
};

const WishListButton = () => {
    // @ts-ignore
    const item: ProductSpecModel = useSelector(
        (state: RootState) => state.product?.spec
    );

    const initialState = useMemo<WishListButtonState>(
        () => ({
            loading: false,
            isInWishList: wishListService.getWishList().includes(item.id),
        }),
        [item.id]
    );

    useEffect(() => {
        setState(initialState);
    }, [item.id]);

    const [state, setState] = useState<WishListButtonState>(initialState);
    const { loading, isInWishList } = state;

    const addToWishList = async () => {
        if (!getCookie("access_token")) {
            store.dispatch(
                setMessage("Vui lòng đăng nhập để sử dụng chức năng")
            );
            return;
        }

        setState((prev) => ({ ...prev, loading: true }));
        try {
            if (isInWishList) {
                await wishListService.removeFromWishList(item.id);
            } else {
                await wishListService.addToWishList(item.id);
            }
            setState({ loading: false, isInWishList: !isInWishList });
        } catch (err) {
            console.log(err.response);
            store.dispatch(
                setMessage("Lỗi: Không thể cập nhật danh sách xem sau")
            );
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
