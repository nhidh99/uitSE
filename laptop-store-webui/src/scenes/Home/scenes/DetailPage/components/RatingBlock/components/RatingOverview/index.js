import React from "react";
import { Label, Table } from "reactstrap";
import styles from "./styles.module.scss";
import { useSelector } from "react-redux";
import { FaStar } from "react-icons/fa";

const RatingOverview = () => {
    const { ratings, ratingAvg } = useSelector((state) => {
        return {
            ratings: state.productDetail.ratings,
            ratingAvg: state.productDetail.product.avg_rating,
        };
    });

    return (
        <div className={styles.blockLeft}>
            <Label className={styles.ratingLabel}>Đánh giá trung bình</Label>
            <Label className={styles.ratingPoint}>{ratingAvg.toFixed(1)}/5.0</Label>
            <Label className={styles.commentCount}>({ratings.length} đánh giá)</Label>

            <Table borderless size="sm" className={styles.table}>
                <tbody>
                    {[5, 4, 3, 2, 1].map((star) => {
                        const count = ratings.filter((r) => r["rating"] === star).length;
                        const percent = ratings.length === 0 ? 0 : (count / ratings.length) * 100;
                        return (
                            <tr>
                                <td>
                                    {star} <FaStar />
                                </td>
                                <td>
                                    <progress value={percent} max="100" />
                                </td>
                                <td>({count} đánh giá)</td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        </div>
    );
};

export default RatingOverview;
