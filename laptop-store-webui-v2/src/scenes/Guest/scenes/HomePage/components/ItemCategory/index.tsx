import React from "react";
import ItemList from "./components/ItemList";
import { SC } from "./styles";

type ItemCategoryProps = {
    title: string;
    category: string;
};

const ItemCategory = ({ title, category }: ItemCategoryProps) => (
    <SC.CategoryContainer>
        <SC.CategoryHeader>{title}</SC.CategoryHeader>
        <SC.ItemContainer>
            <ItemList category={category} />
        </SC.ItemContainer>
    </SC.CategoryContainer>
);

export default ItemCategory;
