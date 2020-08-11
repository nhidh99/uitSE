import React, { Fragment, useState } from "react";
import { Input, Button } from "reactstrap";
import styles from "./styles.module.scss";
import commentApi from "../../../../../../services/api/commentApi";
import store from "../../../../../../services/redux/store";
import { buildErrorModal } from "../../../../../../services/redux/actions";

const CommentForm = ({ comment, toggle }) => {
    const [isSubmitted, setIsSubmitted] = useState(false);

    const submit = () => {
        setIsSubmitted(false);
        comment["approve_status"] ? postDeny() : postApprove();
    };

    const postApprove = async () => {
        try {
            const reply = document.getElementById(`reply`).value;
            await commentApi.postApprove(comment["id"], reply);
            window.location.reload();
        } catch (err) {
            store.dispatch(buildErrorModal());
        }
    };

    const postDeny = async () => {
        try {
            await commentApi.postDeny(comment["id"]);
            window.location.reload();
        } catch (err) {
            store.dispatch(buildErrorModal());
        }
    };

    return (
        <Fragment>
            <table borderless className={styles.table}>
                <tbody>
                    <tr>
                        <td className={styles.labelCol}>Tên sản phẩm:</td>
                        <td>
                            <Input
                                type="text"
                                id="name"
                                placeholder="Tên sản phẩm"
                                maxLength={80}
                                defaultValue={comment?.laptop.name ?? null}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td className={styles.labelCol}>Câu hỏi:</td>
                        <td>
                            <Input
                                type="text"
                                className={"form-control"}
                                id="question"
                                disabled
                                defaultValue={comment?.question ?? null}
                            />
                        </td>
                    </tr>
                    {comment?.approve_status ? null : (
                        <tr>
                            <td className={styles.imageLabel}>Trả lời:</td>
                            <td>
                                <Input
                                    type="textarea"
                                    rows="5"
                                    className={"form-control"}
                                    id="reply"
                                />
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            <div className={styles.buttons}>
                <Button
                    color={comment?.approve_status ? "danger" : "success"}
                    onClick={submit}
                    className={styles.button}
                    disabled={isSubmitted}
                >
                    {comment?.approve_status ? "Bỏ duyệt" : "Duyệt"}
                </Button>

                <Button color="secondary" onClick={toggle} className={styles.button}>
                    Đóng
                </Button>
            </div>
        </Fragment>
    );
};

export default CommentForm;
