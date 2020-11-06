import React, { ReactNode } from "react";
import { SC } from "./styles";

type ContentBlockProps = {
    title: ReactNode | string;
    component?: ReactNode;
    hide?: boolean;
};

const ContentBlock = ({ title, component, hide }: ContentBlockProps) => {
    if (!component || hide) return null;
    return (
        <SC.Section>
            <SC.Header>{title}</SC.Header>
            {component}
        </SC.Section>
    );
};

export default ContentBlock;
