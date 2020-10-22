import React, { useState, useCallback } from "react";
import { FaPaperPlane } from "react-icons/fa";
import Rating from "react-rating";
import { SC } from "./styles";

const RatingBox = () => {
    const [rating, setRating] = useState<number>(0);
    // const { productId } = useParams();

    const handleRatingChange = useCallback(
        (value: number) => setRating(value),
        []
    );

    // const postRating = async () => {
    //     const titleInput = document.getElementById("comment-title");
    //     const detailInput = document.getElementById("comment-detail");
    //     const refreshInputs = () => {
    //         titleInput.value = "";
    //         detailInput.value = "";
    //         const modal = {
    //             title: "Đã gửi đánh giá",
    //             message:
    //                 "Cảm ơn bạn đã gửi đánh giá về sản phẩm, " +
    //                 "Laptop Store sẽ xem xét duyệt nhận xét của bạn.",
    //             confirm: () => null,
    //         };
    //         store.dispatch(buildModal(modal));
    //     };

    //     try {
    //         const data = {
    //             title: titleInput.value.trim(),
    //             detail: detailInput.value.trim(),
    //             rating: rating,
    //         };
    //         await ratingApi.postRating(productId, data);
    //         refreshInputs();
    //     } catch (err) {
    //         store.dispatch(buildErrorModal());
    //     }
    // };

    return (
        <SC.OuterContainer>
            <SC.InputContainer>
                <SC.Label>1. Đánh giá sản phẩm:</SC.Label>
                <Rating
                    quiet
                    onChange={handleRatingChange}
                    initialRating={rating}
                    fullSymbol={<SC.RatingStar color="#ffc120" />}
                    emptySymbol={<SC.RatingStar color="#ddd" />}
                />
            </SC.InputContainer>

            <SC.InputContainer>
                <SC.Label>2. Tiêu đề nhận xét:</SC.Label>
                <SC.RatingTitle
                    type="text"
                    id="comment-title"
                    maxLength={100}
                    placeholder="Nhận xét tổng quan về sản phẩm"
                />
            </SC.InputContainer>

            <SC.InputContainer>
                <SC.Label>3. Nội dung nhận xét:</SC.Label>
                <SC.RatingDetail
                    id="comment-detail"
                    placeholder="Nhận xét chi tiết (không bắt buộc)"
                    rows={3}
                />
            </SC.InputContainer>

            <SC.RatingSubmit>
                <FaPaperPlane />
                &nbsp; Gửi đánh giá
            </SC.RatingSubmit>
        </SC.OuterContainer>
    );
};

export default RatingBox;
