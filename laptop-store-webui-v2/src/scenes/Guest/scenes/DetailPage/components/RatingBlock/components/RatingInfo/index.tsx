import React from "react";
import { RootState } from "../../../../../../../../services/redux/rootReducer";
import { useSelector } from "react-redux";
import { SC } from "./styles";
import { FaStar } from "react-icons/fa";

const RatingInfo = () => {
    const { ratingAvg, ratingInfo } = useSelector((state: RootState) => ({
        ratingAvg: state.product?.spec.avg_rating,
        ratingInfo: state.product?.rating_info,
    }));

    const ratingCount = ratingInfo?.reduce((a, b) => a + b, 0) ?? 0;

    return ratingAvg ? (
        <SC.Container>
            <SC.RatingTitle>Đánh giá trung bình</SC.RatingTitle>
            <SC.RatingAvg>{ratingAvg.toFixed(1)}/5.0</SC.RatingAvg>
            <SC.RatingCount>({ratingCount} đánh giá)</SC.RatingCount>
            <SC.RatingInfo>
                {[5, 4, 3, 2, 1].map((star) => {
                    const count = ratingInfo?.[5 - star] ?? 0;
                    const percent = ratingCount === 0 ? 0 : (count / ratingCount) * 100;
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
