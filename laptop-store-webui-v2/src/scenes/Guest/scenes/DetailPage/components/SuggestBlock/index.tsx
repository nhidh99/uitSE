import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../../services/redux/rootReducer";
import LaptopItem from "../../../../../../components/LaptopItem";
import { SC } from "./styles";
import { useParams } from "react-router";

const SuggestBlock = () => {
    const { productAlt, productId } = useParams();
    const suggestions = useSelector(
        // @ts-ignore
        (state: RootState) => state.productInfo.suggestions
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
