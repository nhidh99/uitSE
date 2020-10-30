/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback } from "react";
import { FaPaperPlane } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import questionApi from "../../../../../../services/api/questionApi";
import { getCookie } from "../../../../../../services/helper/cookie";
import { RootState } from "../../../../../../services/redux/rootReducer";
import { setMessage } from "../../../../../../services/redux/slices/messageSlice";
import { openModal } from "../../../../../../services/redux/slices/modalSlice";
import { SC } from "./styles";

const QuestionBlock = () => {
    const dispatch = useDispatch();
    const productId = useSelector((state: RootState) => state.product?.spec.id);

    const postQuestion = useCallback(
        async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
            if (getCookie("access_token") === null) {
                dispatch(openModal("Vui lòng đăng nhập để gửi câu hỏi"));
                return;
            }

            const input = document.getElementById("question") as HTMLInputElement;
            const question = input.value.trim();
            if (question.length === 0) {
                dispatch(setMessage("Câu hỏi không được để trống"));
            } else {
                const button = e.currentTarget;
                button.disabled = true;
                const response = await questionApi.postQuestion({
                    product_id: productId || 0,
                    question: question,
                });
                dispatch(openModal(response.data));
                input.value = "";
                button.disabled = false;
            }
            input.focus();
        },
        [productId]
    );

    return (
        <SC.Container>
            <SC.Input
                id="question"
                type="text"
                placeholder="Hãy đặt câu hỏi liên quan đến sản phẩm"
            />

            <SC.Button onClick={postQuestion}>
                <FaPaperPlane />
                &nbsp;&nbsp;Gửi câu hỏi
            </SC.Button>
        </SC.Container>
    );
};
export default QuestionBlock;
