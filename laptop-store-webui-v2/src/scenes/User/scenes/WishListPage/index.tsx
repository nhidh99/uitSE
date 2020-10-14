/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import userApi from "../../../../services/api/userApi";
import { RootState } from "../../../../services/redux/rootReducer";
import { fireFetching, skipFetching } from "../../../../services/redux/slices/loaderStatusSlice";
import ProductOverviewModel from "../../../../values/models/ProductSummaryModel";
import WishListItem from "./components/WishListItem";
import { SC } from "./styles";

const WishListPage = () => {
    const [items, setItems] = useState<ProductOverviewModel[] | null>(null);
    const wishList = useSelector((state: RootState) => state.wishList);
    const dispatch = useDispatch();

    useEffect(() => {
        const loadData = async () => {
            if (!items) {
                dispatch(fireFetching());
            }
            const response = await userApi.getCurrentUserWishList();
            setItems(response.data);
            dispatch(skipFetching());
        };
        
        loadData();
    }, [wishList]);

    return (
        <SC.Container>
            {items ? items.map((item) => <WishListItem item={item} key={item.id} />) : null}
        </SC.Container>
    );
};

export default WishListPage;
