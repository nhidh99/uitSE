import React, { memo } from "react";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { RootState } from "../../services/redux/rootReducer";
import { closeModal } from "../../services/redux/slices/modalSlice";

type GlobalModalProps = {
    className?: string;
};

const ModalAdapter = ({ className, ...props }: GlobalModalProps) => {
    const contentClassName = `${className}__content`;
    const overlayClassName = `${className}__overlay`;
    const dispatch = useDispatch();

    const { isOpen, body } = useSelector((state: RootState) => state.modal);

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={() => dispatch(closeModal())}
            className={contentClassName}
            overlayClassName={overlayClassName}
        >
            {body}
        </Modal>
    );
};

const GlobalModal = styled(ModalAdapter)`
    &__content {
        top: 10%;
        left: 50%;
        right: auto;
        bottom: auto;
        margin-right: -50%;
        transform: translate(-50%, -50%);
        padding: 15px;
        background-color: white;
        position: fixed;
        opacity: 1;
        border-radius: 3px;
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.4);

        :focus {
            outline: 0;
        }
    }

    &__overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.25);
    }
`;

export default memo(GlobalModal);
