import React from "react";
import Rating from "react-rating";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../../../../../../services/redux/rootReducer";
import { SC } from "./styles";

const OverviewInfo = () => {
    const spec = useSelector(
        // @ts-ignore
        (state: RootState) => state.product.spec
    );

    return (
        <>
            <SC.NameContainer>
                <SC.NameLabel>Laptop {spec["name"]}</SC.NameLabel>
                <Rating
                    initialRating={spec["avg_rating"]}
                    readonly
                    fullSymbol={<SC.RatingStar color="darkorange" />}
                    emptySymbol={<SC.RatingStar color="gray" />}
                />
            </SC.NameContainer>

            <SC.PriceContainer>
                <SC.UnitPrice>
                    {spec["unit_price"].toLocaleString()}đ
                </SC.UnitPrice>

                <SC.OriginPrice>
                    {(
                        spec["unit_price"] + spec["discount_price"]
                    ).toLocaleString()}
                    đ
                </SC.OriginPrice>

                <SC.DiscountPrice>
                    (Giảm {spec["discount_price"].toLocaleString()}đ)
                </SC.DiscountPrice>
            </SC.PriceContainer>
        </>
    );
};

export default OverviewInfo;
