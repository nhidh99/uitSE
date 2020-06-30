import React, { Fragment, useState } from "react";
import { Col, Label, Table, Button, Form, FormGroup } from "reactstrap";
import styles from "./styles.module.scss";
import { FaStar, FaPaperPlane } from "react-icons/fa";
import Rating from "react-rating";
import { getCookie } from "../../../../../../services/helper/cookie";
import { buildModal } from "../../../../../../services/redux/actions";
import store from "../../../../../../services/redux/store";

const RatingBlock = (props) => {
    const [rating, setRating] = useState(0);

    const buildRatingBody = () => {
        const title = document.getElementById("comment-title").value;
        const detail = document.getElementById("comment-detail").value;
        return {
            title: title,
            detail: detail,
            rating: rating,
        };
    };

    const postRating = async () => {
        const url = "/cxf/api/ratings?product-id=" + props.product["id"];
        const body = buildRatingBody();
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getCookie("access_token")}`,
            },
            body: JSON.stringify(body),
        });
        if (response.ok) {
            document.getElementById("comment-title").value = "";
            document.getElementById("comment-detail").value = "";
            setRating(0);
            const modal = {
                title: "Đã gửi đánh giá",
                message:
                    "Cảm ơn bạn đã gửi đánh giá về sản phẩm, Laptop Store sẽ xem xét duyệt nhận xét của bạn.",
                confirm: () => null,
            };
            store.dispatch(buildModal(modal));
        }
    };

    const handleRatingChange = (value) => setRating(value);

    return (
        <Fragment>
            <Col xs="4" className={styles.blockLeft}>
                <Label className={styles.ratingLabel}>Đánh giá trung bình</Label>
                <Label className={styles.ratingPoint}>
                    {props.product["avg_rating"].toFixed(1)}/5.0
                </Label>
                <Label className={styles.commentCount}>
                    ({props.ratings?.["length"]} đánh giá)
                </Label>
                <Table borderless size="sm" className={styles.table}>
                    <tbody>
                        {[5, 4, 3, 2, 1].map((star) => (
                            <tr>
                                <td>
                                    <Label className={styles.starLabel}>
                                        {star} <FaStar />
                                    </Label>
                                    <progress
                                        value={
                                            (props.ratings.filter(
                                                (rating) => rating["rating"] === star
                                            ).length /
                                                props.ratings.length) *
                                            100
                                        }
                                        max="100"
                                    ></progress>
                                    (
                                    {
                                        props.ratings.filter((rating) => rating["rating"] === star)
                                            .length
                                    }{" "}
                                    đánh giá)
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Col>

            <Col xs="8" className={styles.blockRight}>
                <Form>
                    <FormGroup>
                        <Label>
                            <b>1. Đánh giá sản phẩm:</b>
                        </Label>
                        <Button
                            className={styles.submitButton}
                            onClick={postRating}
                            color="primary"
                        >
                            <FaPaperPlane />
                            &nbsp; Gửi đánh giá
                        </Button>
                        <br />
                        <Rating
                            onChange={handleRatingChange}
                            initialRating={rating}
                            fullSymbol={<FaStar color="#ffc120" className={styles.ratingIcon} />}
                            emptySymbol={<FaStar color="lightgray" className={styles.ratingIcon} />}
                        />
                    </FormGroup>

                    <FormGroup>
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
                    </FormGroup>

                    <FormGroup>
                        <Label class="col-form-Label">
                            <b>3. Nội dung nhận xét:</b>
                        </Label>
                        <textarea
                            id="comment-detail"
                            class="form-control"
                            rows="4"
                            placeholder="(Không bắt buộc)"
                        ></textarea>
                    </FormGroup>
                </Form>
            </Col>
        </Fragment>
    );
};

export default RatingBlock;
