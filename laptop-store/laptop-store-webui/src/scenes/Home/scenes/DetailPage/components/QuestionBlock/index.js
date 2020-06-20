import React, { Fragment } from 'react';
import { Input, Button } from 'reactstrap';
import styles from "./styles.module.scss";
import { FaPaperPlane } from 'react-icons/fa';
import { getCookie } from '../../../../../../services/helper/cookie';
const QuestionBlock = (props) => {

    const postQuestion = async () => {
        const url = "/cxf/api/comments?product-id=" + props.product["id"];
        const question = document.getElementById("question").value;
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getCookie("access_token")}`,
            },
            body: JSON.stringify({
                question: question,
            })
        });
        if (response.ok) {
            window.location.reload();
        }
    };


    return (
        <Fragment className={styles.block}>
                <Input
                    className={styles.inputCol}
                    id="question"
                    type="text"
                    placeholder="Hãy đặt câu hỏi liên quan đến sản phẩm"
                />
                <Button color="primary" className={styles.btnCol} onClick={postQuestion}><FaPaperPlane />  Gửi câu hỏi</Button>

                <ul className={styles.hint}>
                    <li>Các câu hỏi thường gặp về sản phẩm</li>
                    <li>- Chế độ bảo hành cùng cách thức vận chuyển sản phẩm này thế nào?</li>
                    <li>- Có được kiểm hàng khi nhận không?</li>
                    <li>- Sản phẩm này có dễ dùng không?</li>
                </ul>
        </Fragment>
    );
}
export default QuestionBlock;