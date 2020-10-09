import React, { ReactNode } from "react";
import { SC } from "./styles";

type EmptyBlockProps = {
    icon: ReactNode;
    title: string;
};

const EmptyBlock = ({ icon, title }: EmptyBlockProps) => (
    <SC.OuterContainer>
        <SC.InnerContainer>
            <SC.IconContainer>{icon}</SC.IconContainer>
            <SC.Title>{title}</SC.Title>
        </SC.InnerContainer>
    </SC.OuterContainer>
);

export default EmptyBlock;
