/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Loader from "../../../../components/Loader";
import userApi from "../../../../services/api/userApi";
import { RootState } from "../../../../services/redux/rootReducer";
import { setLoaderStatus } from "../../../../services/redux/slices/loaderStatusSlice";
import store from "../../../../services/redux/store";
import CartConstants from "../../../../values/constants/CartConstants";
import ProductOverviewModel from "../../../../values/models/ProductSummaryModel";
import WishListItem from "./components/WishListItem";
import { SC } from "./styles";

const WishListPage = () => {
    const [items, setItems] = useState<ProductOverviewModel[] | null>(null);
    const { status, loading } = useSelector((state: RootState) => ({
        status: state.loaderStatus,
        loading: state.loaderStatus !== CartConstants.IDLE || !items,
    }));

    useEffect(() => {
        const loadData = async () => {
            if (status === CartConstants.FETCHING || !items) {
                const response = await userApi.getCurrentUserWishList();
                setItems(response.data);
                store.dispatch(setLoaderStatus(CartConstants.IDLE));
            }
        };

        loadData();
    }, [status]);

    return (
        <SC.OuterContainer>
            <Loader loading={loading} />
            <SC.Container>
                {items ? (
                    <>
                        {items.map((item) => (
                            <WishListItem item={item} key={item.id} />
                        ))}
                    </>
                ) : null}
            </SC.Container>
        </SC.OuterContainer>
    );
};

export default WishListPage;
