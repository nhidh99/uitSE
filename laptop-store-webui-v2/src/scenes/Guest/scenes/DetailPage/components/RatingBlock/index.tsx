import React from "react";
import { SC } from "./styles";
import RatingInfo from "./components/RatingInfo";
import RatingBox from "./components/RatingBox";

const RatingBlock = () => (
    <SC.Container>
        <RatingInfo />
        <RatingBox />
    </SC.Container>
);

export default RatingBlock;
