import React, { ReactNode } from "react";
import { SC } from "./styles";

type IconInputProps = {
    icon: ReactNode;
    component: ReactNode;
    noValidate?: boolean;
    errorMessage?: string;
};

const IconInput = ({ icon, component, noValidate, errorMessage }: IconInputProps) => {
    return (
        <>
            <SC.Container>
                <SC.IconContainer>{icon}</SC.IconContainer>
                {component}
            </SC.Container>

            {!noValidate && errorMessage ? <SC.Error>{errorMessage}</SC.Error> : null}
        </>
    );
};

export default IconInput;
