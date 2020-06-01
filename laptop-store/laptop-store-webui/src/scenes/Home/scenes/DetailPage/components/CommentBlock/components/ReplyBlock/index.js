import React, { Fragment } from "react";
import { Table, Label, Button, UncontrolledCollapse } from "reactstrap";
import { FaPaperPlane } from "react-icons/fa";
import styles from "./styles.module.scss";
import { getCookie } from "../../../../../../../../services/helper/cookie";

const ReplyBlock = (props) => {
    const postReply = async () => {
        const url = "/cxf/api/replies?rating-id=" + props.rating["id"];
        const reply = document.getElementById(`reply-${props.rating["id"]}`).value;
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
            // handle here
        } else {
            // handle error here
        }
    };

    return (
        <Fragment>
            <UncontrolledCollapse toggler={"#toggler-" + props.rating["id"]}>
                <textarea
                    class={styles.replyInput}
                    id={"reply-" + props.rating["id"]}
                    rows="5"
                    maxlength="500"
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
                                    <Label className={styles.replyAuthor}>
                                        {reply["user"]["name"]}
                                    </Label>
                                    <Label className={styles.replyDate}>
                                        {replyDate.toLocaleDateString()}
                                    </Label>
                                    <p className={styles.reply}>{reply["reply"]}</p>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
        </Fragment>
    );
};

export default ReplyBlock;
