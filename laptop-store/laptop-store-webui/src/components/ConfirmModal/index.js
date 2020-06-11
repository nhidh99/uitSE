import React, { useState, useEffect } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import store from "../../services/redux/store";
import { toggleModal } from "../../services/redux/actions";
import styles from "./styles.module.scss";

const ConfirmModal = () => {
    const toggle = () => store.dispatch(toggleModal());

    const [isOpen, setIsOpen] = useState(false);
    const [title, setTitle] = useState("");
    const [message, setMessage] = useState("");
    const [confirm, setConfirm] = useState(null);

    useEffect(() => {
        store.subscribe(() => {
            const state = store.getState();
            const modal = state["modal"];
            setIsOpen(modal["open"]);
            setTitle(modal["title"]);
            setMessage(modal["message"]);
            setConfirm(modal["confirm"]);
        });
    }, []);

    const confirmAction = () => {
        toggle();
        confirm();
    };

    return (
        <Modal isOpen={isOpen} toggle={toggle}>
            <ModalHeader toggle={toggle}>{title}</ModalHeader>
            <ModalBody className={styles.body}>{message}</ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={confirmAction}>
                    Xác nhận
                </Button>
                <Button color="secondary" onClick={toggle}>
                    Đóng
                </Button>
            </ModalFooter>
        </Modal>
    );
};

export default ConfirmModal;
