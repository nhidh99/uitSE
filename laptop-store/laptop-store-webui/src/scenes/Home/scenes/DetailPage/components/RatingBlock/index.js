import React, { Fragment } from "react";
import RatingOverview from "./components/RatingOverview";
import RatingBox from "./components/RatingBox";

const RatingBlock = () => (
    <Fragment>
        <RatingOverview />
        <RatingBox />
    </Fragment>
);

export default RatingBlock;
