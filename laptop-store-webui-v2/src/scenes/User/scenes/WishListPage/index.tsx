/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Loader from "../../../../components/Loader";
import userApi from "../../../../services/api/userApi";
import { RootState } from "../../../../services/redux/rootReducer";
import { skipFetching } from "../../../../services/redux/slices/loaderStatusSlice";
import store from "../../../../services/redux/store";
import ProductOverviewModel from "../../../../values/models/ProductSummaryModel";
import WishListItem from "./components/WishListItem";
import { SC } from "./styles";

const WishListPage = () => {
    const [items, setItems] = useState<ProductOverviewModel[] | null>(null);
    const { status, loading } = useSelector((state: RootState) => ({
        status: state.loaderStatus,
        loading: state.loaderStatus.isLoading || !items,
    }));

    useEffect(() => {
        const loadData = async () => {
            if (status.isFetching || !items) {
                const response = await userApi.getCurrentUserWishList();
                setItems(response.data);
                store.dispatch(skipFetching());
            }
        };

        loadData();
    }, [status]);

    return (
        <SC.Container>
            <Loader loading={loading} loadOnce={!items} />
            {items ? (
                <>
                    {items.map((item) => (
                        <WishListItem item={item} key={item.id} />
                    ))}
                </>
            ) : null}
        </SC.Container>
    );
};

export default WishListPage;
