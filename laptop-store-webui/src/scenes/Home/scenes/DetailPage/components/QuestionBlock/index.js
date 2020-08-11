import React from "react";
import { Input, Button } from "reactstrap";
import styles from "./styles.module.scss";
import { FaPaperPlane } from "react-icons/fa";
import store from "../../../../../../services/redux/store";
import { buildModal, buildErrorModal } from "../../../../../../services/redux/actions";
import commentApi from "../../../../../../services/api/commentApi";
import { useParams } from "react-router-dom";

const QuestionBlock = () => {
    const { productId } = useParams();
    const postQuestion = async () => {
        try {
            const input = document.getElementById("question");
            const data = { question: input.value };
            await commentApi.postComment(productId, data);
            input.value = "";
            const modal = {
                title: "Đã gửi câu hỏi",
                message:
                    "Cảm ơn bạn đã gửi câu hỏi về sản phẩm, " +
                    "Laptop Store sẽ xem xét duyệt và phản hồi bạn trong thời gian sớm nhất.",
                confirm: () => null,
            };
            store.dispatch(buildModal(modal));
        } catch (err) {
            store.dispatch(buildErrorModal());
        }
    };

    return (
        <div className={styles.block}>
            <Input
                className={styles.input}
                id="question"
                type="text"
                placeholder="Hãy đặt câu hỏi liên quan đến sản phẩm"
            />

            <Button color="success" className={styles.btn} onClick={postQuestion}>
                <FaPaperPlane />
                &nbsp;&nbsp;Gửi câu hỏi
            </Button>
        </div>
    );
};
export default QuestionBlock;
