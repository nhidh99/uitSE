import React, { Fragment } from "react";
import { Table, Label, Button, UncontrolledCollapse } from "reactstrap";
import { FaPaperPlane } from "react-icons/fa";
import styles from "./styles.module.scss";
import commentApi from "../../../../../../../../services/api/commentApi";
import store from "../../../../../../../../services/redux/store";
import { buildErrorModal } from "../../../../../../../../services/redux/actions";

const ReplyBlock = ({ comment, replies }) => {
    const postReply = async () => {
        try {
            const reply = document.getElementById(`reply-${comment["id"]}`).value;
            await commentApi.postReply(comment["id"], reply);
            window.location.reload();
        } catch (err) {
            store.dispatch(buildErrorModal());
        }
    };

    return (
        <Fragment>
            <Table hover borderless striped className={styles.replyTable}>
                <tbody>
                    {replies.map((reply) => {
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
                                        {reply["user"]["name"]} đã trả lời vào{" "}
                                        {replyDate.toLocaleDateString()}
                                    </Label>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>

            <UncontrolledCollapse toggler={"#toggler-" + comment["id"]}>
                <textarea
                    className={styles.replyInput}
                    id={"reply-" + comment["id"]}
                    rows="5"
                    maxLength="500"
                    placeholder="Gửi trả lời của bạn (tối đa 500 từ)"
                ></textarea>
                <br />
                <Button className={styles.submitButton} color="primary" onClick={postReply}>
                    <FaPaperPlane />
                    &nbsp; Gửi trả lời
                </Button>
            </UncontrolledCollapse>
        </Fragment>
    );
};

export default ReplyBlock;
