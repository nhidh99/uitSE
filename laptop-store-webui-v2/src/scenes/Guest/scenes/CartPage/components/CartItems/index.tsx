import React from "react";
import { useSelector } from "react-redux";
import Loader from "../../../../../../components/Loader";
import { RootState } from "../../../../../../services/redux/rootReducer";
import ProductOverviewModel from "../../../../../../values/models/ProductSummaryModel";
import CartItem from "./components/CartItem";
import { SC } from "./style";

type ItemListProps = {
    items: ProductOverviewModel[] | null;
};

const CartItems = ({ items }: ItemListProps) => {
    const loading = useSelector((state: RootState) => state.loaderStatus.isLoading || !items);

    return (
        <SC.OuterContainer>
            <Loader loading={loading} loadOnce={!items} />
            {items ? (
                <SC.Container>
                    {items.map((item) => (
                        <CartItem key={item.id} item={item} />
                    ))}
                </SC.Container>
            ) : null}
        </SC.OuterContainer>
    );
};

export default CartItems;
