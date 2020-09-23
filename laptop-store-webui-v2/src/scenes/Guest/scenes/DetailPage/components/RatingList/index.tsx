import React from "react";
import { SC } from "./styles";
import { RootState } from "../../../../../../services/redux/rootReducer";
import { useSelector } from "react-redux";
import RatingItem from "./components/RatingItem";
import RatingModel from "../../../../../../values/models/RatingModel";

const RatingList = () => {
    const ratings: RatingModel[] = useSelector(
        // @ts-ignore
        (state: RootState) => state.product.ratings
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
