import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../../../../../../services/redux/rootReducer";
import { SC } from "./styles";

const PromotionInfo = () => {
    const promotions = useSelector(
        // @ts-ignore
        (state: RootState) => state.product.promotions
    );

    return promotions.length > 0 ? (
        <>
            <SC.Header>Quà khuyến mãi</SC.Header>
            {promotions.map((promotion) => (
                <SC.Container>
                    <SC.Image
                        src={`/api/images/200/promotions/${promotion["id"]}/${promotion["alt"]}.jpg`}
                        alt="promotions"
                        title={promotion["name"]}
                    />

                    <SC.Label>
                        {promotion["name"]}{" "}
                        <i>({promotion["price"].toLocaleString()}đ)</i>
                    </SC.Label>
                </SC.Container>
            ))}
        </>
    ) : null;
};

export default PromotionInfo;
