import React, { Fragment } from "react";
import { Table, Label, Button, UncontrolledCollapse } from "reactstrap";
import { FaPaperPlane } from "react-icons/fa";
import styles from "./styles.module.scss";
import { getCookie } from "../../../../../../../../services/helper/cookie";

const ReplyBlock = (props) => {
    const postReply = async () => {
        const url = `/cxf/api/comments/${props.comment["id"]}/replies`;
        const reply = document.getElementById(`reply-${props.comment["id"]}`).value;
        const body = { reply: reply };

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getCookie("access_token")}`,
            },
            body: JSON.stringify(body),
        });

        if (response.ok) {
            window.location.reload();
        } else {
            // handle error here
        }
    };

    return (
        <Fragment>
            <Table hover borderless striped className={styles.replyTable}>
                <tbody>
                    {props.replies.map((reply) => {
                        const replyDate = reply
                            ? new Date(
                                reply["reply_date"]["year"],
                                reply["reply_date"]["monthValue"] - 1,
                                reply["reply_date"]["dayOfMonth"]
                            )
                            : null;
                        return (
                            <tr>
                                <td>
                                    <p className={styles.reply}>{reply["reply"]}</p>
                                    <Label className={styles.replyAuthor}>
                                        {reply["user"]["name"]} đã trả lời vào {replyDate.toLocaleDateString()}
                                    </Label>

                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
            <UncontrolledCollapse toggler={"#toggler-" + props.comment["id"]}>
                <textarea
                    className={styles.replyInput}
                    id={"reply-" + props.comment["id"]}
                    rows="5"
                    maxLength="500"
                    placeholder="Gửi trả lời của bạn (tối đa 500 từ)"
                ></textarea>
                <br />
                <Button className={styles.submitButton} color="primary" onClick={postReply}>
                    <FaPaperPlane />
                    &nbsp; Gửi trả lời
                </Button>
                <br />
                <br />
            </UncontrolledCollapse>
        </Fragment>
    );
};

export default ReplyBlock;
