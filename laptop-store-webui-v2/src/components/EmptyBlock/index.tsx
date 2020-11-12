import React, { ReactNode } from "react";
import { SC } from "./styles";

type EmptyBlockProps = {
    icon: ReactNode;
    title: string;
    paddingless?: boolean;
};

const EmptyBlock = ({ icon, title, paddingless }: EmptyBlockProps) => (
    <SC.OuterContainer style={{ padding: paddingless ? "0" : undefined }}>
        <SC.InnerContainer>
            <SC.IconContainer>{icon}</SC.IconContainer>
            <div>{title}</div>
        </SC.InnerContainer>
    </SC.OuterContainer>
);

export default EmptyBlock;
