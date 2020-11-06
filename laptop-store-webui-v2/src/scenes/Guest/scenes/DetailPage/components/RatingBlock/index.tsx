import React from "react";
import { SC } from "./styles";
import RatingInfo from "./components/RatingInfo";
import RatingBox from "./components/RatingBox";
import RatingModel from "../../../../../../values/models/RatingModel";

type RatingInfoProps = {
    ratings: RatingModel[];
    ratingAvg: number;
};

const RatingBlock = () => (
    <SC.Container>
        <RatingInfo ratings={[]} />
        <RatingBox />
    </SC.Container>
);

export default RatingBlock;
