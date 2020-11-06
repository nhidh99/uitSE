import React from "react";
import { SC } from "./styles";
import RatingItem from "./components/RatingItem";
import RatingModel from "../../../../../../values/models/RatingModel";

type RatingListProps = {
    ratings: RatingModel[];
};

const RatingList = ({ ratings }: RatingListProps) => (
    <SC.Container>
        {ratings.map((rating) => (
            <RatingItem rating={rating} key={rating.id} />
        ))}
    </SC.Container>
);

export default RatingList;
