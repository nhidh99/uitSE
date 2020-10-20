import React, { ReactNode } from "react";
import { SC } from "./styles";

type EmptyBlockProps = {
    icon: ReactNode;
    title: string;
    borderless?: boolean;
};

const EmptyBlock = ({ icon, title, borderless }: EmptyBlockProps) => (
    <SC.OuterContainer className={borderless ? "" : "border"}>
        <SC.InnerContainer>
            <SC.IconContainer>{icon}</SC.IconContainer>
            <div>{title}</div>
        </SC.InnerContainer>
    </SC.OuterContainer>
);

export default EmptyBlock;
