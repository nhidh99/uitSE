import React from "react";
import { FaShoppingBasket } from "react-icons/fa";
import { useSelector } from "react-redux";
import EmptyBlock from "../../../../../../components/EmptyBlock";
import Loader from "../../../../../../components/Loader";
import { RootState } from "../../../../../../services/redux/rootReducer";
import ProductOverviewModel from "../../../../../../values/models/ProductOverviewModel";
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
                    {items.length > 0 ? (
                        items.map((item) => <CartItem key={item.id} item={item} />)
                    ) : (
                        <EmptyBlock icon={<FaShoppingBasket />} title="Giỏ hàng trống" borderless />
                    )}
                </SC.Container>
            ) : null}
        </SC.OuterContainer>
    );
};

export default CartItems;
