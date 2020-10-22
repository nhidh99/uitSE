import React from "react";
import { SC } from "./styles";
import { FaStar } from "react-icons/fa";
import RatingReply from "../RatingReply";
import RatingModel from "../../../../../../../../values/models/RatingModel";

type RatingItemProps = {
    rating: RatingModel;
};

const RatingItem = ({ rating }: RatingItemProps) => (
    <SC.OuterContainer>
        <SC.LeftContainer>
            <SC.RatingStar>
                {rating.rating}<FaStar />
            </SC.RatingStar>
            <SC.UserFullName>{rating.user}</SC.UserFullName>
            <SC.RatingDate>{rating.rating_date}</SC.RatingDate>
        </SC.LeftContainer>

        <SC.RightContainer>
            <SC.RatingTitle>{rating.comment_title}</SC.RatingTitle>
            <SC.RatingDetail>{rating.comment_detail}</SC.RatingDetail>
            <RatingReply ratingId={rating.id} />
        </SC.RightContainer>
    </SC.OuterContainer>
);

export default RatingItem;
