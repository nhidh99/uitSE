import React, { Component, Fragment } from "react";
import { Input, Button } from "reactstrap";
import styles from "./styles.module.scss";
import { getCookie } from "../../../../../../services/helper/cookie";
class CommentForm extends Component {
    state = {
        submitted: false,
    };

    submit = () => {
        this.setState({ submitted: true });
        this.postApprove();
    }

    postApprove = async () => {
        const comment = this.props.comment;
        const reply = comment.approve_status ? '' : document.getElementById(`reply`).value;
        const body =  { reply: reply };

        const response = await fetch(`/cxf/api/comments/${comment["id"]}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getCookie("access_token")}`,
            },
            body: JSON.stringify(body),
        });
        if (response.ok) {
            window.location.reload();
        }
    };

    render() {
        const { submitted } = this.state;
        const { comment } = this.props;

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
                        {comment?.approve_status ? null :
                            <tr>
                                <td className={styles.imageLabel}>Trả lời:</td>
                                <td>
                                    <Input
                                        type="textarea"
                                        rows="5"
                                        className={"form-control"}
                                        id="reply"
                                    // disabled
                                    // defaultValue={comment.replies[0]?.reply ?? null}
                                    />
                                </td>
                            </tr>
                        }
                    </tbody>
                </table>

                <div className={styles.buttons}>
                    <Button
                        color={comment?.approve_status ? "danger" : "success"}
                        onClick={this.submit}
                        className={styles.button}
                        disabled={submitted}
                    >
                        {comment?.approve_status ? "Bỏ duyệt" : "Duyệt"}
                    </Button>

                    <Button color="secondary" onClick={this.props.toggle} className={styles.button}>
                        Đóng
                    </Button>
                </div>
            </Fragment>
        );
    }
}

export default CommentForm;
