import React, { Fragment, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import styles from "./styles.module.scss";
import { getCookie } from "../../../../../../services/helper/cookie";

const CommentDelete = ({ comment }) => {
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    const externalCloseBtn = (
        <button
            className="close"
            style={{
                position: "absolute",
                right: "15px",
                fontSize: "65px",
                color: "white",
            }}
            onClick={toggle}
        >
            &times;
        </button>
    );

    const submit = async () => {
        const response = await fetch(`/cxf/api/comments/${comment["id"]}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${getCookie("access_token")}`,
            },
        });
        if (response.ok) {
            window.location.reload();
        }
    };

    return (
        <Fragment>
            <Button color="danger" onClick={toggle}>
                <FaTrash />
            </Button>

            <Modal isOpen={modal} external={externalCloseBtn} className={styles.modal}>
                <ModalHeader>
                    <FaTrash />
                    &nbsp;&nbsp;Xóa câu hỏi
                </ModalHeader>

                <ModalBody>
                    Xác nhận xóa câu hỏi{" "}
                    <b>
                        {comment["id"]} - {comment["question"]}?
                    </b>
                </ModalBody>

                <ModalFooter>
                    <Button color="danger" onClick={submit}>
                        Xác nhận
                    </Button>
                    <Button color="secondary" onClick={toggle}>
                        Đóng
                    </Button>
                </ModalFooter>
            </Modal>
        </Fragment>
    );
};

export default CommentDelete;
