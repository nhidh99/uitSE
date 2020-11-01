import React, { ReactNode } from "react";
import { SC } from "./styles";

type FieldInputProps = {
    label: string;
    component: ReactNode;
    noValidate?: boolean;
    errorMessage?: string;
};

const FieldInput = ({ label, component, noValidate, errorMessage }: FieldInputProps) => (
    <>
        <SC.Container>
            <SC.Label>{label}</SC.Label>
            <SC.InputContainer>
                {component}
                {!noValidate && errorMessage ? <SC.Error>{errorMessage}</SC.Error> : null}
            </SC.InputContainer>
        </SC.Container>
    </>
);

export default FieldInput;
