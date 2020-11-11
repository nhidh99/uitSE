import React from "react";
import { FaShoppingBasket, FaTruckLoading } from "react-icons/fa";
import { useSelector } from "react-redux";
import EmptyBlock from "../../../../../../components/EmptyBlock";
import { RootState } from "../../../../../../services/redux/rootReducer";
import ProductOverviewModel from "../../../../../../values/models/ProductOverviewModel";
import CartItem from "./components/CartItem";
import { SC } from "./style";

type ItemListProps = {
    items: ProductOverviewModel[] | null;
};

const CartItems = ({ items }: ItemListProps) => {
    const loading = useSelector((state: RootState) => state.loaderStatus.isLoading);

    return (
        <SC.Container className={loading ? "loading" : undefined}>
            {items ? (
                items.length > 0 ? (
                    items.map((item) => <CartItem key={item.id} item={item} />)
                ) : (
                    <EmptyBlock icon={<FaShoppingBasket />} title="Giỏ hàng trống" />
                )
            ) : (
                <EmptyBlock icon={<FaTruckLoading />} title="Đang tải thông tin giỏ hàng" />
            )}
        </SC.Container>
    );
};

export default CartItems;
