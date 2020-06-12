import React, { Component, Fragment } from "react";
import { Input, Button } from "reactstrap";
import styles from "./styles.module.scss";
class RatingForm extends Component {
    state = {
        submitted: false,
    };

    submit = () => {
        this.setState({ submitted: true });
        this.postApprove();
    }


    postApprove = async () => {
        const rating = this.props.rating;
        const response = await fetch(`/cxf/api/ratings/${rating["id"]}`, {
            method: "PUT",
        });
        if (response.ok) {
            window.location.reload();
        }
    };

    render() {
        const { submitted } = this.state;
        const { rating } = this.props;

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
                                    defaultValue={rating?.laptop.name ?? null}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td className={styles.labelCol}>Đánh giá:</td>
                            <td>
                                <Input
                                    type="text"
                                    className={"form-control"}
                                    id="rating"
                                    disabled
                                    defaultValue={rating?.rating ?? null}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td className={styles.labelCol}>Tiêu đề:</td>
                            <td>
                                <Input
                                    type="text"
                                    className={"form-control"}
                                    id="title"
                                    disabled
                                    defaultValue={rating?.comment_title ?? null}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td className={styles.imageLabel}>Nội dung:</td>
                            <td>
                                <Input
                                    type="textarea"
                                    rows="5"
                                    className={"form-control"}
                                    id="title"
                                    disabled
                                    defaultValue={rating?.comment_detail ?? null}
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>

                <div className={styles.buttons}>
                    <Button
                        color={rating?.approve_status ? "danger" : "success"}
                        onClick={this.submit}
                        className={styles.button}
                        disabled={submitted}
                    >
                        {rating?.approve_status ? "Bỏ duyệt" : "Duyệt"}
                    </Button>

                    <Button color="secondary" onClick={this.props.toggle} className={styles.button}>
                        Đóng
                    </Button>
                </div>
            </Fragment>
        );
    }
}

export default RatingForm;
