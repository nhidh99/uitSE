import { FieldAttributes } from "formik";
import React, { createElement } from "react";
import { IconType } from "react-icons";
import { SC } from "./styles";

type IconInputProps = {
    icon: IconType;
    validate?: boolean;
};

const IconInput = ({
    icon,
    validate,
    ...props
}: IconInputProps & FieldAttributes<any>) => {
    const iconElement = createElement(icon);
    return (
        <>
            <SC.Container>
                <SC.IconContainer>{iconElement}</SC.IconContainer>
                <SC.Input {...props} />
            </SC.Container>

            {validate ? <SC.Error name={props.name} component="div" /> : null}
        </>
    );
};

export default IconInput;
