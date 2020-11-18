import React from "react";
import { SC } from "./styles";
import { FaStar } from "react-icons/fa";
import RatingModel from "../../../../../../../../values/models/RatingModel";
import RatingReply from "../RatingReply";

type RatingItemProps = {
    rating: RatingModel;
};

const RatingItem = ({ rating }: RatingItemProps) => (
    <SC.OuterContainer>
        <SC.LeftContainer>
            <SC.RatingStar>
                {rating.point}
                <FaStar />
            </SC.RatingStar>
            <SC.UserFullName>{rating.author_name}</SC.UserFullName>
            <SC.RatingDate>{rating.created_at}</SC.RatingDate>
        </SC.LeftContainer>

        <SC.RightContainer>
            <SC.RatingDetail>{rating.detail}</SC.RatingDetail>
            <RatingReply ratingId={rating.id} key={rating.id} />
        </SC.RightContainer>
    </SC.OuterContainer>
);

export default RatingItem;
