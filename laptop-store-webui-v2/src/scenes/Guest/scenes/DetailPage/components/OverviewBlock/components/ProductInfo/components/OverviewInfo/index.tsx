import React from "react";
import Rating from "react-rating";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../../../../../../services/redux/rootReducer";
import { SC } from "./styles";

const OverviewInfo = () => {
    const product = useSelector(
        // @ts-ignore
        (state: RootState) => state.product.details
    );

    return (
        <>
            <SC.NameContainer>
                <SC.NameLabel>Laptop {product["name"]}</SC.NameLabel>
                <Rating
                    initialRating={product["avg_rating"]}
                    readonly
                    fullSymbol={<SC.RatingStar color="darkorange" />}
                    emptySymbol={<SC.RatingStar color="gray" />}
                />
            </SC.NameContainer>

            <SC.PriceContainer>
                <SC.UnitPrice>
                    {product["unit_price"].toLocaleString()}đ
                </SC.UnitPrice>

                <SC.OriginPrice>
                    {(
                        product["unit_price"] + product["discount_price"]
                    ).toLocaleString()}
                    đ
                </SC.OriginPrice>

                <SC.DiscountPrice>
                    (Giảm {product["discount_price"].toLocaleString()}đ)
                </SC.DiscountPrice>
            </SC.PriceContainer>
        </>
    );
};

export default OverviewInfo;
