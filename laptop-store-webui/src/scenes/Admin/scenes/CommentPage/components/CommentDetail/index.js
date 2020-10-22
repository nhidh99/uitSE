import React, { Fragment, useState } from "react";
import { FaStar, FaPen } from "react-icons/fa";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import styles from "./styles.module.scss";
import CommentForm from "../CommentForm";

const CommentDetail = ({ comment }) => {
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

    return (
        <Fragment>
            <Button className={styles.button} color="primary" onClick={toggle}>
                <FaPen />
            </Button>

            <Modal isOpen={modal} external={externalCloseBtn} className={styles.modal}>
                <ModalHeader>
                    <FaStar />
                    &nbsp;&nbsp;Chi tiết câu hỏi (Mã câu hỏi: {comment["id"]})
                </ModalHeader>

                <ModalBody>
                    <CommentForm comment={comment} toggle={toggle} />
                </ModalBody>
            </Modal>
        </Fragment>
    );
};

export default CommentDetail;
