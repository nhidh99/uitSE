/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useCallback, useMemo, useEffect } from "react";
import { useForm } from "react-hook-form";
import { FaPaperPlane } from "react-icons/fa";
import Rating from "react-rating";
import { SC } from "./styles";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import RatingFormValues from "../../../../../../../../values/forms/RatingFormValues";
import { getCookie } from "../../../../../../../../services/helper/cookie";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../../../../../../../../services/redux/slices/modalSlice";
import ratingApi from "../../../../../../../../services/api/ratingApi";
import { RootState } from "../../../../../../../../services/redux/rootReducer";

const RatingBox = () => {
    const [rating, setRating] = useState<number>(0);
    const dispatch = useDispatch();
    const productId = useSelector((state: RootState) => state.product?.spec.id);

    const schema = useMemo(
        () =>
            Yup.object({
                point: Yup.number().min(1).max(5).integer(),
                detail: Yup.string().trim().required("Nội dung không được để trống").max(500),
                productId: Yup.number().integer(),
            }),
        []
    );

    const { setValue, register, handleSubmit, reset, formState } = useForm({
        defaultValues: {
            point: 0,
            detail: "",
            product_id: productId,
        },
        resolver: yupResolver(schema),
    });

    useEffect(() => {
        register({ name: "point" });
        register({ name: "product_id" });
    }, [register]);

    const handleRatingChange = useCallback((value: number) => {
        setRating(value);
        setValue("point", value);
    }, []);

    const submit = useCallback(async (data: RatingFormValues) => {
        if (getCookie("access_token") === null) {
            dispatch(openModal("Vui lòng đăng nhập để gửi câu hỏi"));
        } else {
            const response = await ratingApi.postRating(data);
            dispatch(openModal(response.data));
            reset({ point: 0, detail: "", product_id: productId });
            setRating(0);
        }
    }, []);

    return (
        <SC.Form onSubmit={handleSubmit(submit)}>
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
                <SC.Label>2. Nội dung nhận xét:</SC.Label>
                <SC.RatingDetail
                    ref={register}
                    name="detail"
                    id="comment-detail"
                    placeholder="Nội dung nhận xét (tối đa 500 kí tự)"
                    rows={5}
                    maxLength={500}
                />
            </SC.InputContainer>

            <SC.RatingSubmit type="submit" disabled={formState.isSubmitting}>
                <FaPaperPlane />
                &nbsp; Gửi đánh giá
            </SC.RatingSubmit>
        </SC.Form>
    );
};

export default RatingBox;
