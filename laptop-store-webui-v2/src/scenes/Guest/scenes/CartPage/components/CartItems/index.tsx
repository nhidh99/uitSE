import React from "react";
import Spinner from "../../../../../../components/Spinner";
import ProductOverviewModel from "../../../../../../values/models/ProductSummaryModel";
import CartItem from "./components/CartItem";
import { SC } from "./style";

type ItemListProps = {
    loading: boolean;
    items: ProductOverviewModel[];
};

const CartItems = ({ loading, items }: ItemListProps) => (
    <SC.Container>
        {loading ? <Spinner /> : items.map((item) => <CartItem item={item} />)}
    </SC.Container>
);

export default CartItems;
