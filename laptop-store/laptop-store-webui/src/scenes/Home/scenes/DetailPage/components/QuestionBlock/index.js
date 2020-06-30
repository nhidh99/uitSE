import React from "react";
import { Input, Button } from "reactstrap";
import styles from "./styles.module.scss";
import { getCookie } from "../../../../../../services/helper/cookie";
import { FaPaperPlane } from "react-icons/fa";
import store from "../../../../../../services/redux/store";
import { buildModal } from "../../../../../../services/redux/actions";
const QuestionBlock = (props) => {
    const postQuestion = async () => {
        const url = "/cxf/api/comments?product-id=" + props.product["id"];
        const input = document.getElementById("question");
        const question = input.value;
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getCookie("access_token")}`,
            },
            body: JSON.stringify({
                question: question,
            }),
        });

        if (response.ok) {
            input.value = "";
            const modal = {
                title: "Đã gửi câu hỏi",
                message:
                    "Cảm ơn bạn đã gửi câu hỏi về sản phẩm, Laptop Store sẽ xem xét duyệt và phản hồi bạn trong thời gian sớm nhất.",
                confirm: () => null,
            };
            store.dispatch(buildModal(modal));
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
