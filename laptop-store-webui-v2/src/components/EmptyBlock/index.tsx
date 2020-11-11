import React, { ReactNode } from "react";
import { SC } from "./styles";

type EmptyBlockProps = {
    icon: ReactNode;
    title: string;
    borderless?: boolean;
};

const EmptyBlock = ({ icon, title }: EmptyBlockProps) => (
    <SC.OuterContainer>
        <SC.InnerContainer>
            <SC.IconContainer>{icon}</SC.IconContainer>
            <div>{title}</div>
        </SC.InnerContainer>
    </SC.OuterContainer>
);

export default EmptyBlock;
