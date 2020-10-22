import React, { useState } from "react";
import { Button, Label } from "reactstrap";
import { FaPaperPlane, FaStar } from "react-icons/fa";
import Rating from "react-rating";
import styles from "./styles.module.scss";
import store from "../../../../../../../../services/redux/store";
import { buildModal, buildErrorModal } from "../../../../../../../../services/redux/actions";
import { useParams } from "react-router-dom";
import ratingApi from "../../../../../../../../services/api/ratingApi";

const RatingBox = () => {
    const [rating, setRating] = useState(0);
    const { productId } = useParams();

    const handleRatingChange = (value) => setRating(value);

    const postRating = async () => {
        const titleInput = document.getElementById("comment-title");
        const detailInput = document.getElementById("comment-detail");
        const refreshInputs = () => {
            titleInput.value = "";
            detailInput.value = "";
            const modal = {
                title: "Đã gửi đánh giá",
                message:
                    "Cảm ơn bạn đã gửi đánh giá về sản phẩm, " +
                    "Laptop Store sẽ xem xét duyệt nhận xét của bạn.",
                confirm: () => null,
            };
            store.dispatch(buildModal(modal));
        };

        try {
            const data = {
                title: titleInput.value.trim(),
                detail: detailInput.value.trim(),
                rating: rating,
            };
            await ratingApi.postRating(productId, data);
            refreshInputs();
        } catch (err) {
            store.dispatch(buildErrorModal());
        }
    };

    return (
        <div className={styles.blockRight}>
            <div>
                <Label>
                    <b>1. Đánh giá sản phẩm:</b>
                </Label>
                <br />

                <Rating
                    quiet
                    onChange={handleRatingChange}
                    initialRating={rating}
                    fullSymbol={<FaStar color="#ffc120" className={styles.ratingIcon} />}
                    emptySymbol={<FaStar color="#ddd" className={styles.ratingIcon} />}
                />
            </div>

            <div>
                <Label class="col-form-Label">
                    <b>2. Tiêu đề nhận xét:</b>
                </Label>

                <input
                    type="text"
                    id="comment-title"
                    class="form-control"
                    maxlength="100"
                    placeholder="(Không bắt buộc)"
                />
            </div>

            <div>
                <Label class="col-form-Label">
                    <b>3. Nội dung nhận xét:</b>
                </Label>

                <textarea
                    id="comment-detail"
                    class="form-control"
                    rows="4"
                    placeholder="(Không bắt buộc)"
                ></textarea>
            </div>
            <br />

            <Button className={styles.button} onClick={postRating} color="primary">
                <FaPaperPlane />
                &nbsp; Gửi đánh giá
            </Button>
        </div>
    );
};

export default RatingBox;
