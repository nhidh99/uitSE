import React, { ComponentType, createElement } from "react";
import { SC } from "./styles";

type ContentBlockProps = {
    title: string;
    component?: ComponentType;
    show: boolean;
};

const ContentBlock = ({ title, component, show = true }: ContentBlockProps) => {
    if (!component || !show) return null;
    const block = createElement(component);
    return (
        <SC.Section>
            <SC.Header>{title}</SC.Header>
            {block}
        </SC.Section>
    );
};

export default ContentBlock;
