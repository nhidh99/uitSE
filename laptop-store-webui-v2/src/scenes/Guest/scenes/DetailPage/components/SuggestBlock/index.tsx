import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../../services/redux/rootReducer";
import LaptopItem from "../../../../../../components/LaptopItem";
import { SC } from "./styles";
import { useParams } from "react-router";
import ProductOverviewModel from "../../../../../../values/models/ProductOverviewModel";

const SuggestBlock = () => {
    // @ts-ignore
    const { productAlt, productId } = useParams();
    const suggestions: ProductOverviewModel[] = useSelector(
        (state: RootState) => state.product?.suggestions ?? []
    );
    return (
        <SC.Container>
            {suggestions.map((product) => (
                <LaptopItem
                    product={product}
                    compareLink={`/compare/${productAlt}-vs-${product["alt"]}/${productId}/${product["id"]}`}
                />
            ))}
        </SC.Container>
    );
};

export default SuggestBlock;
