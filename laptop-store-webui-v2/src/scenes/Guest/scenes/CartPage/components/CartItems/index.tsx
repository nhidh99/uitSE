import React from "react";
import { useSelector } from "react-redux";
import Loader from "../../../../../../components/Loader";
import { RootState } from "../../../../../../services/redux/rootReducer";
import CartConstants from "../../../../../../values/constants/CartConstants";
import ProductOverviewModel from "../../../../../../values/models/ProductSummaryModel";
import CartItem from "./components/CartItem";
import { SC } from "./style";

type ItemListProps = {
    items: ProductOverviewModel[];
};

const CartItems = ({ items }: ItemListProps) => {
    const loading = useSelector((state: RootState) =>
        [CartConstants.LOADING, CartConstants.FETCHING].includes(
            state.loaderStatus
        )
    );

    return (
        <SC.OuterContainer>
            <Loader loading={loading} />
            <SC.Container>
                {items.map((item) => (
                    <CartItem key={item.id} item={item} />
                ))}
            </SC.Container>
        </SC.OuterContainer>
    );
};

export default CartItems;
