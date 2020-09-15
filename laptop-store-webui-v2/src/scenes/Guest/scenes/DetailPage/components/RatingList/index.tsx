import React from "react";
import { SC } from "./styles";
import { RootState } from "../../../../../../services/redux/rootReducer";
import { useSelector } from "react-redux";
import RatingItem from "./components/RatingItem";

const RatingList = () => {
    const ratings = useSelector(
        // @ts-ignore
        (state: RootState) => state.productInfo.ratings
    );

    return (
        <SC.Container>
            {ratings.map((rating) => (
                <RatingItem rating={rating} key={rating.id} />
            ))}
        </SC.Container>
    );
};

export default RatingList;
