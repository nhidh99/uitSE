import React from "react";
import { RootState } from "../../../../../../../../services/redux/rootReducer";
import { useSelector } from "react-redux";
import { SC } from "./styles";
import { FaStar } from "react-icons/fa";

const RatingInfo = () => {
    const { ratings, ratingAvg } = useSelector((state: RootState) => ({
        // @ts-ignore
        ratings: state.productInfo.ratings,
        // @ts-ignore
        ratingAvg: state.productInfo.details.avg_rating,
    }));

    const InfoRows = () => (
        <>
            {[5, 4, 3, 2, 1].map((star) => {
                const count = ratings.filter((r) => r["rating"] === star)
                    .length;
                const percent =
                    ratings.length === 0 ? 0 : (count / ratings.length) * 100;
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
        </>
    );

    return (
        <SC.Container>
            <SC.RatingTitle>Đánh giá trung bình</SC.RatingTitle>
            <SC.RatingAvg>{ratingAvg.toFixed(1)}/5.0</SC.RatingAvg>
            <SC.RatingCount>({ratings.length} đánh giá)</SC.RatingCount>
            <SC.RatingInfo>
                <InfoRows />
            </SC.RatingInfo>
        </SC.Container>
    );
};

export default RatingInfo;
