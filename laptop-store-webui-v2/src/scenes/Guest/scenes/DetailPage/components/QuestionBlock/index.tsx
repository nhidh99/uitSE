import React from "react";
import { FaPaperPlane } from "react-icons/fa";
import { SC } from "./styles";

const QuestionBlock = () => {
    // const { productId } = useParams();
    // const postQuestion = async () => {
    //     try {
    //         const input = document.getElementById("question");
    //         const data = { question: input.value };
    //         await commentApi.postComment(productId, data);
    //         input.value = "";
    //         const modal = {
    //             title: "Đã gửi câu hỏi",
    //             message:
    //                 "Cảm ơn bạn đã gửi câu hỏi về sản phẩm, " +
    //                 "Laptop Store sẽ xem xét duyệt và phản hồi bạn trong thời gian sớm nhất.",
    //             confirm: () => null,
    //         };
    //         store.dispatch(buildModal(modal));
    //     } catch (err) {
    //         store.dispatch(buildErrorModal());
    //     }
    // };

    return (
        <SC.Container>
            <SC.Input
                id="question"
                type="text"
                placeholder="Hãy đặt câu hỏi liên quan đến sản phẩm"
            />

            <SC.Button>
                <FaPaperPlane />
                &nbsp;&nbsp;Gửi câu hỏi
            </SC.Button>
        </SC.Container>
    );
};
export default QuestionBlock;
