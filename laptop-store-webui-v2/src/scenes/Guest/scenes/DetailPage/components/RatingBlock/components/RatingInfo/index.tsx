import React from "react";
import { RootState } from "../../../../../../../../services/redux/rootReducer";
import { useSelector } from "react-redux";
import { SC } from "./styles";
import { FaStar } from "react-icons/fa";
import RatingModel from "../../../../../../../../values/models/RatingModel";

type RatingInfoProps = {
    ratings: RatingModel[];
};

const RatingInfo = ({ ratings }: RatingInfoProps) => {
    const ratingAvg = useSelector((state: RootState) => state.product?.spec.avg_rating);

    return ratingAvg ? (
        <SC.Container>
            <SC.RatingTitle>Đánh giá trung bình</SC.RatingTitle>
            <SC.RatingAvg>{ratingAvg.toFixed(1)}/5.0</SC.RatingAvg>
            <SC.RatingCount>({ratings.length} đánh giá)</SC.RatingCount>
            <SC.RatingInfo>
                {[5, 4, 3, 2, 1].map((star) => {
                    const count = ratings.filter((r) => r["rating"] === star).length;
                    const percent = ratings.length === 0 ? 0 : (count / ratings.length) * 100;
                    return (
                        <tr>
                            <td>
                                <SC.RatingStar>
                                    {star} <FaStar />
                                </SC.RatingStar>
                            </td>
                            <td>
                                <progress value={percent} max="100" />
                            </td>
                            <td>({count} đánh giá)</td>
                        </tr>
                    );
                })}
            </SC.RatingInfo>
        </SC.Container>
    ) : null;
};

export default RatingInfo;
