import React from "react";
import { SC } from "./styles";

type MoreButtonProps = {
    show: boolean;
    disabled: boolean;
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

const MoreButton = ({ show, disabled, onClick }: MoreButtonProps) =>
    show ? (
        <SC.Button disabled={disabled} onClick={onClick}>
            Xem thêm
        </SC.Button>
    ) : null;

export default MoreButton;
